import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardStatus } from './boards-status.enum';
import { CreateBoardDto } from './dto/create-board-dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
import { Board } from './board.entity';

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Get('/:id')
  getBoardById(@Param('id') id: number):Promise<Board> {
    const found = this.boardsService.getBoardById(id);
    if (!found) {
      throw new NotFoundException(`Board with ID "${id}" not found`);
    }
    return found;
  }

  @Post()
  @UsePipes(ValidationPipe)
  createBoard(@Body() createBoardDto: CreateBoardDto):Promise<Board> {
    return this.boardsService.createBoard(createBoardDto);
  }
  /*
  @Get()
  getAllBoards():Boards[] {
    return this.boardsService.getAllBoards();
  }
  @Post()
  @UsePipes(ValidationPipe)
  createBoard(@Body() createBoardDto:CreateBoardDto):Boards {
    return this.boardsService.createBoard(createBoardDto);
  }

  @Get('/:id')
  getBoardById(id:string):Boards {
    return this.boardsService.getBoardById(id);
  }

  @Delete('/:id')
  deleteBoard(id:string):void {
    this.boardsService.deleteBoard(id);
  }

  @Patch('/:id/status')
  updateBoardStatus(@Param('id') id:string, @Body('status',BoardStatusValidationPipe) status:BoardStatus):Boards {
    return this.boardsService.updateBoardStatus(id, status);
  }
 */
}
