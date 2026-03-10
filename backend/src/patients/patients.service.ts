import { Injectable } from '@nestjs/common';

@Injectable()
export class PatientsService {

  async findAll(tenantId: string) {
    // Aqui você pode implementar a lógica para buscar os pacientes do banco de dados
  }
}
