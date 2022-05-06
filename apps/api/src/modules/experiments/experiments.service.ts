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

@Injectable()
export class ExperimentsService {
  constructor(
    @InjectModel(Experiment.name)
    private experimentModel: Model<ExperimentDocument>,
    private usersService: UsersService,
  ) {}

  async create(createExperimentInput: CreateExperimentInput) {
    return this.experimentModel
      .create(createExperimentInput)
      .then((experiment) => plainToClass(Experiment, experiment.toJSON()));
  }

  async tipExperiment(experimentId: string, user: User, amount: number) {
    if (user.user_metadata.tokens - amount < 0)
      return new BadRequestException('Insufficient funds');
    return await Promise.all([
      this.experimentModel
        .findByIdAndUpdate(experimentId, {
          $push: { tips: { userId: user.user_id, amount } },
        })
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
      .limit(25)
      .orFail()
      .exec();
  }

  async query(selector: FilterQuery<ExperimentDocument>) {
    const selectorValidated = pickBy(selector, (val) => val);
    return this.experimentModel
      .find(selectorValidated)
      .sort({ _id: -1 })
      .lean({ virtuals: true, getters: true })
      .limit(25)
      .orFail()
      .exec();
  }

  findOne(_id: string) {
    return this.experimentModel.findById(_id).orFail().lean().exec();
  }

  update(_id: string, updateExperimentInput: UpdateExperimentInput) {
    return this.experimentModel
      .updateOne({ _id }, updateExperimentInput)
      .orFail()
      .lean()
      .exec();
  }

  remove(id: number) {
    return `This action removes a #${id} experiment`;
  }
}
