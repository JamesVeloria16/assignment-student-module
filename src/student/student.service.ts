import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './student.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StudentsService {
    constructor(
        @InjectRepository(Student)
        private readonly studentRepository: Repository<Student>,
    ) {}

    async createStudent(data: Partial<Student>): Promise<Student> {
        const student = this.studentRepository.create(data);
        return this.studentRepository.save(student);
    }

    async getStudents(): Promise<Student[]> {
        return this.studentRepository.find();
      }
      
      async getStudentById(id: number): Promise<Student> {
        const student = await this.studentRepository.findOneBy({ id });
        if (!student) {
          throw new NotFoundException(`Opps! Student with ID ${id} cannot be found`);
        }
        return student;
      }
      
      async updateStudent(id: number, data: Partial<Student>): Promise<Student> {
        const student = await this.getStudentById(id);
        Object.assign(student, data);
        return this.studentRepository.save(student);
      }

      async deleteStudent(id: number): Promise<string> {
        const result = await this.studentRepository.delete(id);
        if (result.affected === 0) {
          throw new NotFoundException(`Student with ID ${id} not found`);
        } else if (result.affected > 0) {
            return `Student with ID ${id} has been deleted successfully`;
        } else {
            return `An error occurred while deleting student with ID ${id}`;
        }
      }
      
      
}