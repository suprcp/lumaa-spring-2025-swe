import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly tasksRepository: Repository<Task>,
  ) {}

  async findAll(userId: number) {
    console.log(`Fetching tasks for specific userId: ${userId}`);

    const tasks = await this.tasksRepository.find({
      where: {
        userId: userId
      },
      order: { id: 'DESC' }
    });

    console.log(`Found ${tasks.length} tasks for user ${userId}`);
    return tasks;
  }

  async create(userId: number, newTask: { title: string; description: string }) {
    console.log('Creating task for userId:', userId);
    console.log('Task data:', newTask);

    const task = this.tasksRepository.create({
      ...newTask,
      userId,
      user: { id: userId },
      isComplete: false
    });

    console.log('Task before save:', task);

    try {
      const savedTask = await this.tasksRepository.save(task);
      console.log('Saved task:', savedTask);
      return savedTask;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error saving task:', error.message);
        throw new Error(`Failed to create task: ${error.message}`);
      } else {
        console.error('Unknown error:', error);
        throw new Error('Failed to create task');
      }
    }
  }

  async update(userId: number, id: number, update: { title?: string; description?: string; isComplete?: boolean }) {
    const task = await this.tasksRepository.findOne({
      where: {
        id,
        userId
      }
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    if (update.title !== undefined) {
      task.title = update.title;
    }
    if (update.description !== undefined) {
      task.description = update.description;
    }
    if (update.isComplete !== undefined) {
      task.isComplete = update.isComplete;
    }

    return this.tasksRepository.save(task);
  }

  async remove(userId: number, id: number) {
    const task = await this.tasksRepository.findOne({
      where: {
        id,
        userId
      }
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    await this.tasksRepository.remove(task);
    return { message: 'Task deleted' };
  }
}