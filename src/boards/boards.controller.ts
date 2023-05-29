import { Body, Controller, Get, Post } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Boards } from './boards.model';
import { CreateBoardDto } from './dto/create-board-dto';

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Get()
  getAllBoards():Boards[] {
    return this.boardsService.getAllBoards();
  }
  @Post()
  createBoard(@Body() createBoardDto:CreateBoardDto):Boards {
    return this.boardsService.createBoard(createBoardDto);
  }

  @Get('/:id')
  getBoardById(id:string):Boards {
    return this.boardsService.getBoardById(id);
  }
}
