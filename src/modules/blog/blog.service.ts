import { Article } from './article.model.js';
import { AppError } from '../../common/errors/AppError.js';

export class BlogService {
  static async createArticle(authorId: string, data: any) {
    const article = await Article.create({
      ...data,
      authorId,
      status: data.status || 'draft',
      publishedAt: data.status === 'published' ? new Date() : undefined
    });
    return article;
  }

  static async getPublishedArticles() {
    return await Article.find({ status: 'published' })
      .populate('authorId', 'firstName lastName avatar')
      .sort({ publishedAt: -1 });
  }

  static async getArticleBySlug(slug: string) {
    const article = await Article.findOne({ slug, status: 'published' })
      .populate('authorId', 'firstName lastName avatar');
    if (!article) throw new AppError('Article not found', 404, 'NOT_FOUND');
    return article;
  }
}
