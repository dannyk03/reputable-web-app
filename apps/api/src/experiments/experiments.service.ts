import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateExperimentInput } from './dto/create-experiment.input';
import { UpdateExperimentInput } from './dto/update-experiment.input';
import { Experiment, ExperimentDocument } from './entities/experiment.entity';
import { Model } from 'mongoose';

@Injectable()
export class ExperimentsService {
  constructor(
    @InjectModel(Experiment.name)
    private experimentModel: Model<ExperimentDocument>,
  ) {}
  create(createExperimentInput: CreateExperimentInput) {
    return 'This action adds a new experiment';
  }

  findAll() {
    return this.experimentModel.find({}).orFail().exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} experiment`;
  }

  update(id: number, updateExperimentInput: UpdateExperimentInput) {
    return `This action updates a #${id} experiment`;
  }

  remove(id: number) {
    return `This action removes a #${id} experiment`;
  }
}
