import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guards/auth.guard';
import { StudentService } from './student.service';
import { User } from '../auth/auth.decorator';
import { UserInterface } from 'src/auth/interfaces/user.interface';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { StudentSuccessfulResponse } from './responses';

@ApiBearerAuth()
@ApiTags('Student')
@UseGuards(JwtGuard)
@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @ApiResponse(StudentSuccessfulResponse)
  @Get()
  async getStudent(@User() user: UserInterface) {
    return await this.studentService.getStudent(user.id);
  }

  @Get()
  async getStudentCleaningJobsHistory(@User() user: UserInterface) {
    return await this.studentService.getStudentCleaningJobsHistory(user.id);
  }
}
