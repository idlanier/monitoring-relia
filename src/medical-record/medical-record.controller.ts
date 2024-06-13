import { Controller, Get, Param, Query } from '@nestjs/common';
import { MedicalRecordService } from './medical-record.service';
import { AuthJwtGuard } from 'src/auth/auth.decorator';

@AuthJwtGuard()
@Controller('medical-record')
export class MedicalRecordController {
  constructor(private readonly medicalRecordService: MedicalRecordService) {}

  @Get('list')
  getPatientList(@Query() queryParam: any) {
    return this.medicalRecordService.getMedicalRecordListByPatientId(
      queryParam.patient_id,
      queryParam.limit,
      queryParam.offset,
    );
  }

  @Get('detail/:id')
  findPatientById(@Param('id') id: number) {
    return this.medicalRecordService.findMedicalRecordDetailById(id);
  }
}
