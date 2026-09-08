const fs = require('fs');
let file = fs.readFileSync('backend/src/modules/classes/class.model.ts', 'utf8');

file = file.replace('endDate: Date;', 'endDate: Date;\n  enrolledCount?: number;\n  rating?: number;\n  sessions?: number;\n  thumbnail?: string;');
file = file.replace('endDate: { type: Date, required: true },', 'endDate: { type: Date, required: true },\n    enrolledCount: { type: Number, default: 0 },\n    rating: { type: Number, default: 0 },\n    sessions: { type: Number, default: 0 },\n    thumbnail: { type: String },');

fs.writeFileSync('backend/src/modules/classes/class.model.ts', file);
