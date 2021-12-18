import { ApiProperty } from '@nestjs/swagger';

import {
  IsNotEmpty, IsOptional, IsString,
} from 'class-validator';

export class BaseResponseDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @IsOptional()
  message?: string;

  constructor(_message?: string) {
    this.message = _message || 'OK';
  }
}
