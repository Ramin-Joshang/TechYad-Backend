import { Request, Response } from 'express';
import { CatalogService } from './catalog.service.js';
import { sendSuccess } from '../../common/utils/response.js';

// --- Category ---
export const createCategory = async (req: Request, res: Response) => {
  const result = await CatalogService.createCategory(req.body);
  sendSuccess(res, result, 'Category created successfully', 201);
};

export const getCategories = async (req: Request, res: Response) => {
  const result = await CatalogService.getCategories();
  sendSuccess(res, result, 'Categories retrieved successfully');
};

export const updateCategory = async (req: Request, res: Response) => {
  const result = await CatalogService.updateCategory(req.params.id as string, req.body);
  sendSuccess(res, result, 'Category updated successfully');
};

export const deleteCategory = async (req: Request, res: Response) => {
  await CatalogService.deleteCategory(req.params.id as string);
  sendSuccess(res, null, 'Category deleted successfully');
};

// --- Simple Catalogs (Subject, Field, Level) ---
type CatalogType = 'subject' | 'field' | 'level';

export const createSimpleCatalog = (type: CatalogType) => async (req: Request, res: Response) => {
  const result = await CatalogService.createSimpleCatalog(type, req.body);
  sendSuccess(res, result, `${type} created successfully`, 201);
};

export const getSimpleCatalogs = (type: CatalogType) => async (req: Request, res: Response) => {
  const result = await CatalogService.getSimpleCatalogs(type);
  sendSuccess(res, result, `${type}s retrieved successfully`);
};

export const updateSimpleCatalog = (type: CatalogType) => async (req: Request, res: Response) => {
  const result = await CatalogService.updateSimpleCatalog(type, req.params.id as string, req.body);
  sendSuccess(res, result, `${type} updated successfully`);
};

export const deleteSimpleCatalog = (type: CatalogType) => async (req: Request, res: Response) => {
  await CatalogService.deleteSimpleCatalog(type, req.params.id as string);
  sendSuccess(res, null, `${type} deleted successfully`);
};
