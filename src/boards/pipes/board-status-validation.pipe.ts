import { ArgumentMetadata, BadRequestException, PipeTransform } from '@nestjs/common';
import { BoardStatus } from '../boards-status.enum';

export class BoardStatusValidationPipe implements PipeTransform{

  readonly StatusOption = [
    BoardStatus.PRIVATE,
    BoardStatus.PUBLIC
  ];
  transform(value: any): any {
    value = value.toUpperCase();
    if(!this.isStatusValid(value)){
      throw new BadRequestException(`${value} is an invalid status`);
    }
    return value;
  }
  private isStatusValid(status:any){
    const idx = this.StatusOption.indexOf(status);
    return idx !== -1;
  }

}