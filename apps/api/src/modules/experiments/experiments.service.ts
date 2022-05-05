import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateExperimentInput } from './dto/create-experiment.input';
import { UpdateExperimentInput } from './dto/update-experiment.input';
import { Experiment, ExperimentDocument } from './entities/experiment.entity';
import { Model, FilterQuery } from 'mongoose';
import { plainToClass } from 'class-transformer';
import { User } from '../users/entities/user.entity';

@Injectable()
export class ExperimentsService {
  constructor(
    @InjectModel(Experiment.name)
    private experimentModel: Model<ExperimentDocument>,
  ) {}

  async create(createExperimentInput: CreateExperimentInput) {
    return this.experimentModel
      .create(createExperimentInput)
      .then((experiment) => plainToClass(Experiment, experiment.toJSON()));
  }

  async tipExperiment(experimentId: string, user: User, amount: number) {
    if (user.user_metadata.tokens - amount < 0)
      return new BadRequestException('Insufficient funds');
    return this.experimentModel
      .findByIdAndUpdate(experimentId, {
        $push: { tips: { userId: user.user_id, amount } },
      })
      .orFail()
      .exec()
      .then(() => ({
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
    console.log('selector', selector);
    return this.experimentModel
      .find({ communities: selector?.community })
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
