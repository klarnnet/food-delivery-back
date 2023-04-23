import type { MulterStorageCallback } from '@models/dto/user/callbacks';
import type { JwtModuleOptions } from '@nestjs/jwt/dist';
import type { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import type { DataSourceOptions } from 'typeorm/data-source';
import { config } from 'dotenv';
import { diskStorage } from 'multer';
import type { IMap } from '@models/interfaces';
import { MIGRATIONS } from '../../../migrations';
import { ENTITIES } from '../../entities';

export class Config {
  private readonly _path: string = 'environments/.env';
  private readonly _env: IMap<string> = process.env;
  private static _instance: Config;

  private constructor() {
    config({ path: this._path });
  }

  static get get(): Config {
    if (!this._instance) {
      this._instance = new Config();
    }

    return this._instance;
  }

  // # Env
  get environment(): string {
    return this._env.NODE_ENV;
  }

  // # Server config
  get port(): number {
    return +(this._env.PORT || 4000);
  }

  get client(): string {
    return this._env.APP_CLIENT_URL;
  }
 // # Stripe

  get stripe(): string {
    return this._env.STRIPE_SECRET_KEY;
  }

  // # Typeorm config

  get ormConfig() {
    return (type: 'base' | 'init'): DataSourceOptions => {
      const config: DataSourceOptions = {
        type: 'postgres',
        host: this._env.POSTGRES_HOST,
        port: Number(this._env.POSTGRES_PORT),
        username: this._env.POSTGRES_USER,
        password: this._env.POSTGRES_PASSWORD,
        database: this._env.POSTGRES_DB_NAME,
        entities: ENTITIES,
        migrations: MIGRATIONS,
      };

      const initConfig: DataSourceOptions = {
        ...config,
        database: this._env.POSTGRES_INIT_DB_NAME,
        entities: null,
        // migrations: [dbInit1679660711346],
        migrationsTransactionMode: 'none',
      };

      if (type === 'base') return config;

      if (type === 'init') return initConfig;
    };
  }

  get hashSalt(): number {
    return Number(this._env.ENCODE_SALT);
  }

  // # JWT

  get AccessTokenOptions(): JwtModuleOptions {
    return {
      signOptions: {
        expiresIn: this._env.JWT_ACCESS_EXPIRES_IN,
      },
      secret: this._env.JWT_SECRET,
    };
  }

  get RefreshTokenOptions(): JwtModuleOptions {
    return { signOptions: { expiresIn: this._env.JWT_REFRESH_EXPIRES_IN }, secret: this._env.JWT_REFRESH_SECRET };
  }

    // # Multer

    get MulterConfig(): any {
      return (): MulterOptions => ({
        storage: diskStorage({
          destination: `./public/image`,
          filename: (_: any, file: Express.Multer.File, cb: MulterStorageCallback) => {
            const filename = file.originalname.replace(/\s/gi, '_');
  
            cb(null, `${Date.now()}-${filename}`);
          },
        }),
      });
    }

  // # Socket
  get GatewayOptions(): any {
    return { cors: { origin: this._env.APP_CLIENT_URL } };
  }
}
