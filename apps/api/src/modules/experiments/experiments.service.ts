import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateExperimentInput } from './dto/create-experiment.input';
import { UpdateExperimentInput } from './dto/update-experiment.input';
import { Experiment, ExperimentDocument } from './entities/experiment.entity';
import { Model } from 'mongoose';
import { plainToClass } from 'class-transformer';

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

  findAll() {
    return this.experimentModel
      .find({})
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
