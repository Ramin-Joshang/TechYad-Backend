import { Category } from './category.model.js';
import { Subject, Field, Level } from './simple-catalog.model.js';
import { AppError } from '../../common/errors/AppError.js';

export class CatalogService {
  // --- Category ---
  static async createCategory(data: any) {
    return await Category.create(data);
  }

  static async getCategories() {
    return await Category.find().populate('parentId');
  }

  static async updateCategory(id: string, data: any) {
    const category = await Category.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    if (!category) throw new AppError('Category not found', 404, 'NOT_FOUND');
    return category;
  }

  static async deleteCategory(id: string) {
    const category = await Category.findByIdAndDelete(id);
    if (!category) throw new AppError('Category not found', 404, 'NOT_FOUND');
    return null;
  }

  // --- Generic Generic Method for Simple Catalogs (Subject, Field, Level) ---
  static getModel(type: 'subject' | 'field' | 'level') {
    switch (type) {
      case 'subject': return Subject;
      case 'field': return Field;
      case 'level': return Level;
      default: throw new AppError('Invalid catalog type', 400, 'INVALID_TYPE');
    }
  }

  static async createSimpleCatalog(type: 'subject' | 'field' | 'level', data: any) {
    const Model = this.getModel(type);
    return await Model.create(data);
  }

  static async getSimpleCatalogs(type: 'subject' | 'field' | 'level') {
    const Model = this.getModel(type);
    return await Model.find();
  }

  static async updateSimpleCatalog(type: 'subject' | 'field' | 'level', id: string, data: any) {
    const Model = this.getModel(type);
    const doc = await Model.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    if (!doc) throw new AppError(`${type} not found`, 404, 'NOT_FOUND');
    return doc;
  }

  static async deleteSimpleCatalog(type: 'subject' | 'field' | 'level', id: string) {
    const Model = this.getModel(type);
    const doc = await Model.findByIdAndDelete(id);
    if (!doc) throw new AppError(`${type} not found`, 404, 'NOT_FOUND');
    return null;
  }
}
