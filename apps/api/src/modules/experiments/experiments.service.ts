import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateExperimentInput } from './dto/create-experiment.input';
import { UpdateExperimentInput } from './dto/update-experiment.input';
import { Experiment, ExperimentDocument } from './entities/experiment.entity';
import { Model, FilterQuery } from 'mongoose';
import { plainToClass } from 'class-transformer';
import { ITip, IUser } from '@reputable/types';

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

  async tipExperiment(experimentId: string, user: IUser, tip: ITip) {
    return this.experimentModel
      .findByIdAndUpdate(experimentId, {
        $push: { tips: tip },
      })
      .orFail()
      .exec()
      .then((experiment: ExperimentDocument) =>
        plainToClass(Experiment, experiment.toJSON()),
      );
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
    return this.experimentModel
      .find(selector)
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
