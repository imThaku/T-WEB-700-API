import {getManager, Repository} from 'typeorm';
import {ILogger, Logger} from '../utils/logger';
import {Crypto} from "../entities/Crypto";

export class CryptoService {

    cryptoRepository: Repository<Crypto>;
    logger: ILogger;

    constructor() {
        this.logger = new Logger(__filename);
        this.cryptoRepository = getManager().getRepository(Crypto);
    }

    /**
     * Creates an instance of Crypto.
     */
    instantiate(data: Object): Crypto | undefined {
        return this.cryptoRepository.create(data);
    }

    /**
     * Inserts a new crypto into the database.
     */
    async insert(data: Crypto): Promise<Crypto> {
        this.logger.info('Create a new crypto', data);
        const newCrypto = this.cryptoRepository.create(data);
        return await this.cryptoRepository.save(newCrypto);
    }

    /**
     * Returns array of all crypto from db
     */
    async getAll(): Promise<Crypto[]> {
        return await this.cryptoRepository.find();
    }

    /**
     * Returns a crypto by given id
     */
    async getById(id: string | number): Promise<Crypto> {
        this.logger.info('Fetching crypto by id: ', id);
        if (id) {
            return await this.cryptoRepository.findOne(id);
        }
        return Promise.reject(false);
    }

    /**
     * Returns a crypto by given ids
     */
    async getByIds(IDs: string | number): Promise<Crypto> {
        this.logger.info('Fetching crypto by ids: ',);
        const cryptos = await this.cryptoRepository.find({
            where: {
                IDs: IDs
            }
        });
        if (cryptos && cryptos.length > 0) {
            return cryptos[0];  // typeorm find() returns array even if response is single object
        } else {
            return undefined;
        }
    }

    /**
     * Returns a crypto by name
     */
    async getByName(name: string): Promise<Crypto | undefined> {
        const cryptos = await this.cryptoRepository.find({
            where: {
                name: name
            }
        });
        if (cryptos && cryptos.length > 0) {
            return cryptos[0];  // typeorm find() returns array even if response is single object
        } else {
            return undefined;
        }
    }

    /**
     * Updates a Crypto
     */
    async update(crypto: Crypto): Promise<Crypto | undefined> {
        try {
            return await this.cryptoRepository.save(crypto);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    /**
     * Updates a Crypto
     */
    async remove(crypto: Crypto): Promise<Crypto | undefined> {
        try {
            return await this.cryptoRepository.remove(crypto);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    pad(n: any) {
        return n < 10 ? '0' + n : n
    }

    ISODateString(date: Date) {
        return date.getUTCFullYear() + '-'
            + this.pad(date.getUTCMonth() + 1) + '-'
            + this.pad(date.getUTCDate()) + 'T'
            + this.pad(date.getUTCHours()) + ':'
            + this.pad(date.getUTCMinutes()) + ':'
            + this.pad(date.getUTCSeconds()) + 'Z'
    }

}
