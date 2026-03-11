import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';

import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {

  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) { }

  async create(data: Partial<User>) {
    if (!data.password) {
      throw new Error('Password is required');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = new this.userModel({
      ...data,
      password: hashedPassword
    });

    return user.save();
  }

  async findAll(tenantId: string) {

    return this.userModel.find({
      tenantId
    });

  }

  async findByEmail(email: string) {
    return this.userModel.findOne({ email });
  }

  async findOne(id: string, tenantId: string) {

    const user = await this.userModel.findOne({
      _id: id,
      tenantId
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;

  }

  async update(id: string, tenantId: string, data: any) {

    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    const user = await this.userModel.findOneAndUpdate(
      { _id: id, tenantId },
      data,
      { new: true }
    );

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;

  }

  async remove(id: string, tenantId: string) {

    const user = await this.userModel.findOneAndDelete({
      _id: id,
      tenantId
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return { deleted: true };

  }

}