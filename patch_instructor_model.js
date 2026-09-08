const fs = require('fs');
let file = fs.readFileSync('backend/src/modules/instructors/instructor-profile.model.ts', 'utf8');

file = file.replace('isApproved: boolean;', 'isApproved: boolean;\n  rating?: number;\n  totalStudents?: number;\n  coursesCount?: number;\n  classesCount?: number;');
file = file.replace('isApproved: { type: Boolean, default: false },', 'isApproved: { type: Boolean, default: false },\n    rating: { type: Number, default: 0 },\n    totalStudents: { type: Number, default: 0 },\n    coursesCount: { type: Number, default: 0 },\n    classesCount: { type: Number, default: 0 },');

fs.writeFileSync('backend/src/modules/instructors/instructor-profile.model.ts', file);
