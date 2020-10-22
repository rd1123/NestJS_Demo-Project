import { TypeOrmModule } from "@nestjs/typeorm";


export const typeOrmConfig: TypeOrmModule = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'password',
  database: 'taskmanagement',
  entities: [__dirname + '/../**/*.entity.{js,ts}', __dirname + '/../**/user.entity.{ts,js}'],
  synchronize: true,
};