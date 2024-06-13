import { Controller, Get, Param, Query } from '@nestjs/common';
import { PatientService } from './patient.service';
import { AuthJwtGuard } from 'src/auth/auth.decorator';

@AuthJwtGuard()
@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Get('list')
  getPatientList(@Query() queryParam: any) {
    return this.patientService.getPatientList(
      queryParam.patient_name,
      queryParam.patient_code,
      queryParam.limit,
      queryParam.offset,
    );
  }

  @Get('detail/:id')
  findPatientById(@Param('id') id: number) {
    return this.patientService.findPatientById(id);
  }
}
