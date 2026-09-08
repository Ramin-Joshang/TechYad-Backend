import { Request, Response } from 'express';
import { Course } from '../courses/course.model.js';
import { Article } from '../blog/article.model.js';
import { sendSuccess } from '../../common/utils/response.js';

export const globalSearch = async (req: Request, res: Response) => {
  const { q } = req.query;
  const searchTerm = typeof q === 'string' ? q : '';

  if (!searchTerm) {
    return sendSuccess(res, { courses: [], classes: [], articles: [] }, 'Empty search');
  }

  // Define regex for case-insensitive partial search
  const regex = new (RegExp as any)(searchTerm, 'i');

  // Search Courses
  const courses = await Course.find({
    status: 'published',
    $or: [{ title: regex }, { description: regex }, { tags: regex }]
  })
    .select('title slug description price thumbnail instructors categoryId')
    .populate('instructors', 'firstName lastName')
    .limit(10);

  // Search Blog Articles
  const articles = await Article.find({
    status: 'published',
    $or: [{ title: regex }, { content: regex }, { tags: regex }]
  })
    .select('title slug excerpt thumbnail author createdAt')
    .populate('author', 'firstName lastName')
    .limit(10);

  // Classes (if available, currently just mock empty array to match requested structure)
  const classes: any[] = [];

  sendSuccess(res, { courses, classes, articles }, 'Search results retrieved');
};
