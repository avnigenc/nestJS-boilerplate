import { IsNumberString } from 'class-validator';

export default class GetExampleByExampleIdDto {
  @IsNumberString()
  readonly exampleId: number;
}
