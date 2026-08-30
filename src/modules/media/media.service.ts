import { File } from './file.model.js';
import { AppError } from '../../common/errors/AppError.js';

export class MediaService {
  static async uploadFile(userId: string, file: Express.Multer.File) {
    if (!file) throw new AppError('No file provided', 400, 'BAD_REQUEST');
    
    // Mocking Cloud Storage Upload (e.g., AWS S3, ArvanCloud, etc.)
    const fakeCloudUrl = `https://storage.techyad.mock/uploads/${Date.now()}-${file.originalname}`;
    
    const newFile = await File.create({
      originalName: file.originalname,
      filename: file.filename || `${Date.now()}-${file.originalname}`,
      mimeType: file.mimetype,
      size: file.size,
      url: fakeCloudUrl,
      uploadedBy: userId
    });
    
    return newFile;
  }
}
