import { Request, Response } from 'express';
import { sendSuccess } from '../../common/utils/response.js';
import { FAQ } from './models/faq.model.js';
import { ContactMessage } from './models/contact.model.js';
import { CareerApplication } from './models/career.model.js';

export const getFaqs = async (req: Request, res: Response) => {
  const faqs = await FAQ.find({ isActive: true }).sort({ order: 1, createdAt: -1 });
  sendSuccess(res, faqs, 'FAQs retrieved successfully');
};

export const submitContact = async (req: Request, res: Response) => {
  const message = await ContactMessage.create(req.body);
  sendSuccess(res, message, 'Message sent successfully', 201);
};

export const submitCareer = async (req: Request, res: Response) => {
  const application = await CareerApplication.create(req.body);
  sendSuccess(res, application, 'Application submitted successfully', 201);
};
