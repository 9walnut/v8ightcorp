import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { User } from '../auth/user.entity';

config();

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [User],
  migrations: [__dirname + '/../migration/**/*.ts'],
  synchronize: false,
});
