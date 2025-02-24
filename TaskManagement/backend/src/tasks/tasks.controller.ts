import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  // get task list
  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Request() req) {
    return this.tasksService.findAll(req.user.id);
  }

  // add tasks
  @Post()
  createTask(@Request() req, @Body() newTask: { title: string; description: string }) {
    return this.tasksService.create(req.user.id, newTask);
  }

  // update tasks
  @Put(':id')
  updateTask(
    @Request() req,
    @Param('id') id: number,
    @Body() update: { title?: string; description?: string; isComplete?: boolean }
  ) {
    return this.tasksService.update(req.user.id, Number(id), update);
  }

  // delete tasks
  @Delete(':id')
  deleteTask(@Request() req, @Param('id') id: number) {
    return this.tasksService.remove(req.user.id, Number(id));
  }
}
