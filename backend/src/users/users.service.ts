import { Injectable } from '@nestjs/common';
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

  async findByEmail(email: string) {
    return this.userModel.findOne({ email });
  }

}