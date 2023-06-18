import { Injectable, NotFoundException, Param } from '@nestjs/common';
import { BoardStatus } from './boards-status.enum';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board-dto';
import { BoardRepository } from './board.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';

@Injectable()
export class BoardsService {
    constructor(
      @InjectRepository(BoardRepository)
      private boardRepository: BoardRepository,
    ) {}

  async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
      const { title, description } = createBoardDto;
      const board = this.boardRepository.create({
        title,
        description,
        status: BoardStatus.PUBLIC,
      });
      await this.boardRepository.save(board);
      return board;
    }

    async getBoardById(id: number):Promise<Board> {
      const found = await this.boardRepository.findOne({where :{ id } })
      if (!found) {
        throw new NotFoundException(`Board with ID "${id}" not found`);
      }
      return found;
    }

    /*
    private boards:Boards[] = [];

    getAllBoards():Boards[] {
        return this.boards;
    }

    createBoard(createdBoardDto:CreateBoardDto):Boards {
        const { title, description } = createdBoardDto;
        const board:Boards = {
            id: uuid(),
            title,
            description,
            status: BoardStatus.PUBLIC
        };
        this.boards.push(board);
        return board;
    }

    getBoardById(@Param('id')id:string):Boards {
        const found = this.boards.find(board => board.id === id);
        if(!found){
            throw new NotFoundException(`Board with ID ${id} not found`);
        }
        return found;

    }
    deleteBoard(id:string):void{
        const found = this.getBoardById(id);
        this.boards = this.boards.filter(board => board.id !== id);
    }

    updateBoardStatus(id:string, status:BoardStatus):Boards {
        const board = this.getBoardById(id);
        board.status = status;
        return board;
    }
    */
}
