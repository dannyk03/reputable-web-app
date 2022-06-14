import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateExperimentInput } from './dto/create-experiment.input';
import { UpdateExperimentInput } from './dto/update-experiment.input';
import { Experiment, ExperimentDocument } from './entities/experiment.entity';
import { Model, FilterQuery } from 'mongoose';
import { plainToClass } from 'class-transformer';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { pickBy } from 'lodash';
import * as DataLoader from 'dataloader';
import { mapFromArray } from 'src/common/helpers';

@Injectable()
export class ExperimentsService {
  public loaderForUsers = new DataLoader<string, Experiment[]>(
    async (emails) => {
      const experiments = await this.query(
        { createdBy: { $in: emails } },
        { _id: 1, createdBy: 1 },
      );
      const experimentsMap = mapFromArray<Experiment>(
        experiments,
        (exp) => exp.createdBy,
      );
      return emails.map((e) => experimentsMap.get(e) as Experiment[]);
    },
  );
  constructor(
    @InjectModel(Experiment.name)
    private experimentModel: Model<ExperimentDocument>,
    private usersService: UsersService,
  ) {}

  async create(
    createExperimentInput: CreateExperimentInput & { createdBy: string },
  ) {
    return this.experimentModel
      .create(createExperimentInput)
      .then((experiment) => {
        this.loaderForUsers.clearAll();
        return plainToClass(Experiment, experiment.toJSON());
      });
  }

  async tipExperiment(experimentId: string, user: User, amount: number) {
    if (user.user_metadata.tokens - amount < 0)
      return new BadRequestException('Insufficient funds');
    return await Promise.all([
      this.experimentModel
        .findOneAndUpdate(
          {
            _id: experimentId,
            createdBy: { $ne: user.email },
          },
          {
            $push: { tips: { userId: user.user_id, amount } },
          },
        )
        .orFail()
        .exec(),
      this.usersService.updateOne(user.user_id, {
        user_metadata: {
          ...user.user_metadata,
          tokens: user.user_metadata.tokens - amount,
        },
      }),
    ]).then(() => ({
      message: 'Tipped experiment!',
    }));
  }

  async findAll() {
    return this.experimentModel
      .find({})
      .lean({ virtuals: true, getters: true })
      .orFail()
      .exec();
  }

  async query(
    selector: FilterQuery<ExperimentDocument>,
    projection?: Record<string, 1 | 0>,
  ) {
    const selectorValidated = pickBy(selector, (val) => val);
    const q = this.experimentModel.find(selectorValidated).sort({ _id: -1 });
    if (projection) q.select(projection);
    return q
      .lean({ virtuals: true, getters: true })
      .exec()
      .then((experiments) => {
        // Eventually this should be taken to database level and .find() query
        // should be converted to an aggregation function, but for now I'll
        // stick to sorting experiments here.
        // Sorts experiments by total tips, descending
        return experiments.sort((a, b) => {
          const first = (a.tips || []).reduce(
            (prev, curr) => (prev += curr.amount),
            0,
          );
          const second = (b.tips || []).reduce(
            (prev, curr) => (prev += curr.amount),
            0,
          );
          return second - first;
        });
      });
  }

  findOne(_id: string) {
    return this.experimentModel.findById(_id).orFail().lean().exec();
  }

  update(
    _id: string,
    user: string,
    updateExperimentInput: UpdateExperimentInput,
  ) {
    return this.experimentModel
      .updateOne({ _id, user }, updateExperimentInput)
      .orFail()
      .lean()
      .exec();
  }

  remove(_id: string, userEmail: string) {
    return this.experimentModel
      .findOneAndRemove({ _id, createdBy: userEmail })
      .orFail()
      .exec()
      .then((r) => {
        this.loaderForUsers.clearAll();
        return {
          message: 'Experiment deleted successfully!',
        };
      });
  }
}
