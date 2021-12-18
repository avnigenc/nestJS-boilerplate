import { ApiProperty } from '@nestjs/swagger';
import { BaseResponseDto } from '../../../../common/dto/base-response.dto';
import { IExample } from '../example.interface';

export default class GetAllExamplesResponseDto extends BaseResponseDto {
  @ApiProperty({
    example: [
      {
        userId: 666,
        jsonId: 666,
        title: 'super secret document title',
        completed: true,
      },
      {
        userId: 777,
        jsonId: 777,
        title: 'super secret another document title',
        completed: false,
      },
    ],
  })
  data: IExample[];

  constructor(exampleDocument: IExample[], _message?: string) {
    super(_message);
    this.data = this.format(exampleDocument);
  }

  // eslint-disable-next-line
  format(examples: IExample[]): IExample[] {
    return examples;
  }
}
