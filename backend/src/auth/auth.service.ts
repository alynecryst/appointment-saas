import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { AppLogger } from 'src/common/logger/app.logger';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) { }

  private logger = new AppLogger('AuthService');

  async register(data: any) {

    const user = await this.usersService.create(data);

    const payload = {
      sub: user._id,
      email: user.email,
      tenantId: user.tenantId,
      role: user.role
    };

    return {
      access_token: this.jwtService.sign(payload)
    };

  }

  async login(email: string, password: string) {

    const user = await this.usersService.findByEmail(email);
    this.logger.debug(`User ${email} is trying to log in`);

    if (!user) {
      throw new UnauthorizedException();
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new UnauthorizedException();
    }

    return this.generateTokens(user);

  }

  private generateTokens(user: any) {

    const payload = {
      sub: user._id,
      email: user.email,
      tenantId: user.tenantId,
      role: user.role
    };

    const accessToken = this.jwtService.sign(payload);

    const refreshToken = this.jwtService.sign(
      payload,
      {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: parseInt(process.env.JWT_REFRESH_EXPIRES || '86400')
      }
    );

    return {
      access_token: accessToken,
      refresh_token: refreshToken
    };

  }

  async refreshToken(token: string) {

    const payload = this.jwtService.verify(
      token,
      { secret: process.env.JWT_REFRESH_SECRET }
    );

    const user = await this.usersService.findByEmail(payload.email);

    return this.generateTokens(user);

  }
}