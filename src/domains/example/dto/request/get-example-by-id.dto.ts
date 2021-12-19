import { IsNumberString } from 'class-validator';

export default class GetExampleByExampleIdDto {
  @IsNumberString()
  exampleId: number;
}
