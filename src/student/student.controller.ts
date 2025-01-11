import { Controller, Post, Body } from '@nestjs/common';
import { StudentsService } from './student.service';
import { Student } from './student.entity';

@Controller('students')
export class StudentsController {
    constructor(private readonly studentService: StudentsService) {}

    @Post()
    async createStudent(@Body() data: Partial<Student>): Promise<Student> {
        return this.studentService.createStudent(data);
    }

}