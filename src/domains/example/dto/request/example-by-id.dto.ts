import { IsNumberString } from 'class-validator';

export default class ExampleByIdDto {
  @IsNumberString()
  exampleId: number;
}
