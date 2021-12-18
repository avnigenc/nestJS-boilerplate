import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { BaseResponseDto } from './base-response.dto';

export class GenericResponseDto extends BaseResponseDto {
  @ApiProperty()
  @IsOptional()
  data: any;

  constructor(_data?: any, _message?: string) {
    super(_message);
    this.data = _data || null;
  }
}
