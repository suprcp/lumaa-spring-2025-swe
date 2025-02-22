import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { Task } from './entities/task.entity';
import { User } from './entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '127.0.0.1',
      port: 5432,
      username: 'postgres',
      password: '231224us',
      database: 'task_db',
      entities: [Task, User],
      synchronize: false,
      logging: true
    }),
    TasksModule,
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}