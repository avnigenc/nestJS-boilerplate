import { ApiProperty } from '@nestjs/swagger';
import { BaseResponseDto } from '../../../../common/dto/base-response.dto';
import { IExample } from '../example.interface';

export default class GetExampleByIdResponseDto extends BaseResponseDto {
  @ApiProperty({
    example: {
      userId: 666,
      jsonId: 666,
      title: 'super secret document title',
      completed: true,
    },
  })
  data: IExample;

  constructor(example: IExample, _message?: string) {
    super(_message);
    this.data = this.format(example);
  }

  // eslint-disable-next-line
  format(example: IExample): IExample {
    return example;
  }
}
