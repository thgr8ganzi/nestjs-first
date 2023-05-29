import { Injectable, Param } from '@nestjs/common';
import { Boards, BoardStatus } from './boards.model';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board-dto';

@Injectable()
export class BoardsService {
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
        return this.boards.find(board => board.id === id);
    }
}
