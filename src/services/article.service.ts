import {getManager, Repository} from 'typeorm';
import {ILogger, Logger} from '../utils/logger';
import {Crypto} from "../entities/Crypto";
import {Article} from "../entities/Article";

export class ArticleService {

    articleRepository: Repository<Article>;
    logger: ILogger;

    constructor() {
        this.logger = new Logger(__filename);
        this.articleRepository = getManager().getRepository(Article);
    }

    /**
     * Creates an instance of Crypto.
     */
    instantiate(data: Object): Article | undefined {
        return this.articleRepository.create(data);
    }

    /**
     * Inserts a new crypto into the database.
     */
    async insert(data: Article): Promise<Article> {
        this.logger.info('Create a new crypto', data);
        const newArticle = this.articleRepository.create(data);
        return await this.articleRepository.save(newArticle);
    }

    async delete(article: Article): Promise<Article | undefined> {
        try {
            return await this.articleRepository.remove(article);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    /**
     * Returns array of all crypto from db
     */
    async getAll(): Promise<Article[]> {
        return await this.articleRepository.find();
    }

    /**
     * Returns a crypto by given id
     */
    async getById(id: string | number): Promise<Article> {
        this.logger.info('Fetching Article by id: ', id);
        if (id) {
            return await this.articleRepository.findOne(id);
        }
        return Promise.reject(false);
    }

    /**
     * Returns a crypto by given ids
     */
    async getByTitle(title: string | number): Promise<Article> {
        this.logger.info('Fetching crypto by ids: ',);
        const articles = await this.articleRepository.find({
            where: {
                title: title
            }
        });
        if (articles && articles.length > 0) {
            return articles[0];  // typeorm find() returns array even if response is single object
        } else {
            return undefined;
        }
    }

    /**
     * Returns a crypto by name
     */
    async getByAuthor(author: string): Promise<Article | undefined> {
        const articles = await this.articleRepository.find({
            where: {
                author: author
            }
        });
        if (articles && articles.length > 0) {
            return articles[0];  // typeorm find() returns array even if response is single object
        } else {
            return undefined;
        }
    }

    /**
     * Updates a Crypto
     */
    async update(article: Article): Promise<Article | undefined> {
        try {
            return await this.articleRepository.save(article);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    /**
     * Updates a Crypto
     */
    async remove(article: Article): Promise<Article | undefined> {
        try {
            return await this.articleRepository.remove(article);
        } catch (error) {
            return Promise.reject(error);
        }
    }
}
