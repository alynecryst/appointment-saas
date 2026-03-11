import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { Patient, PatientDocument } from './schemas/patient.schema';

@Injectable()
export class PatientsService {

  constructor(
    @InjectModel(Patient.name)
    private patientModel: Model<PatientDocument>,
  ) { }

  async create(data: CreatePatientDto & { tenantId: string }) {
    return this.patientModel.create(data);
  }

  async findAll(tenantId: string) {
    return this.patientModel.find({ tenantId });
  }

  async findOne(id: string, tenantId: string) {
    const patient = await this.patientModel.findOne({
      _id: id,
      tenantId
    });
    if (!patient) {
      throw new NotFoundException('Patient not found');
    }
    return patient;
  }

  async update(
    id: string,
    tenantId: string,
    data: UpdatePatientDto
  ) {
    const patient = await this.patientModel.findOneAndUpdate(
      { _id: id, tenantId },
      data,
      { new: true }
    );
    if (!patient) {
      throw new NotFoundException('Patient not found');
    }
    return patient;
  }

  async remove(id: string, tenantId: string) {
    const patient = await this.patientModel.findOneAndDelete({
      _id: id,
      tenantId
    });
    if (!patient) {
      throw new NotFoundException('Patient not found');
    }
    return patient;
  }

}