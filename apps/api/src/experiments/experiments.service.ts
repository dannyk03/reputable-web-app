import { Injectable } from '@nestjs/common';
import { CreateExperimentInput } from './dto/create-experiment.input';
import { UpdateExperimentInput } from './dto/update-experiment.input';

@Injectable()
export class ExperimentsService {
  constructor();
  create(createExperimentInput: CreateExperimentInput) {
    return 'This action adds a new experiment';
  }

  findAll() {
    return [];
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
