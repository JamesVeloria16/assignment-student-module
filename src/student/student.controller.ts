import { Controller, Post, Body, Get, Param, Put } from '@nestjs/common';
import { StudentsService } from './student.service';
import { Student } from './student.entity';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentService: StudentsService) {}

  @Post()
  async createStudent(@Body() data: Partial<Student>): Promise<Student> {
    return this.studentService.createStudent(data);
  }

  @Get()
  async getStudents(): Promise<Student[]> {
    return this.studentService.getStudents();
  }

  @Get(':id')
  async getStudentById(@Param('id') id: number): Promise<Student> {
    return this.studentService.getStudentById(id);
  }

  @Put(':id')
  async updateStudent(
    @Param('id') id: number,
    @Body() data: Partial<Student>,
  ): Promise<Student> {
    return this.studentService.updateStudent(id, data);
  }
}
