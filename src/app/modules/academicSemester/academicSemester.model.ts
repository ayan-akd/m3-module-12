import { model, Schema } from 'mongoose';
import { TAcademicSemester } from './academicSemester.Interface';
import {
  AcademicSemesterCode,
  AcademicSemesterName,
  Month,
} from './academicSemester.constants';

const academicSemesterSchema = new Schema<TAcademicSemester>({
  name: {
    type: String,
    required: true,
    enum: AcademicSemesterName,
  },
  year: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
    enum: AcademicSemesterCode,
  },
  startMonth: {
    type: String,
    required: true,
    enum: Month,
  },
  endMonth: {
    type: String,
    required: true,
    enum: Month,
  },
},
{
  timestamps: true,
});

academicSemesterSchema.pre('save', async function (next) {
  const isSemesterExists = await AcademicSemester.findOne({
    name: this.name,
    year: this.year,
  });
  if (isSemesterExists) {
    throw new Error('Academic Semester already exists');
  }
  next();
});


export const AcademicSemester = model<TAcademicSemester>(
  'AcademicSemester',
  academicSemesterSchema,
);