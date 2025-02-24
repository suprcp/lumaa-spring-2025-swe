import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { Task } from './entities/task.entity';
import { User } from './entities/user.entity';
import * as dotenv from 'dotenv';

dotenv.config();

let database_port = Number(process.env.DATABASE_PORT);
console.log(database_port);

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [Task, User],
      synchronize: true,
      logging: true
      // type: 'postgres',
      // host: '127.0.0.1',
      // port: 5432,
      // username: 'postgres',
      // password: 'postgres',
      // database: 'task_management_db',
      // entities: [Task, User],
      // synchronize: true,
      // logging: true

    }),
    TasksModule,
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
