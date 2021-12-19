import {
  IsBoolean, IsNumberString, IsOptional, IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class CreateExampleDto {
  @IsNumberString()
  userId: number;

  @IsNumberString()
  jsonId: number;

  @IsString()
  title: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    default: false,
  })
  completed: boolean;
}
