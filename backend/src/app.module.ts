import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PatientsModule } from './patients/patients.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { TenantsModule } from './tenants/tenants.module';

@Module({
  imports: [AuthModule, UsersModule, PatientsModule, AppointmentsModule, TenantsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
