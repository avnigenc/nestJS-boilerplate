import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { Public } from '../../common/decorators/public.decorator';

import ExampleService from './example.service';
import { GetExampleByExampleIdDto } from './dto/request';
import { GetAllExamplesResponseDto, GetExampleByIdResponseDto } from './dto/response';

@ApiTags('examples')
@Controller()
export default class ExampleController {
  constructor(private readonly exampleService: ExampleService) {}

  @Public(true)
  @Get(':exampleId')
  @ApiOperation({ summary: 'Get Example by exampleId' })
  async getExampleByIdController(
    @Param() getExampleByExampleIdDto: GetExampleByExampleIdDto,
  ): Promise<GetExampleByIdResponseDto> {
    const { exampleId } = getExampleByExampleIdDto;
    const example = await this.exampleService.getExampleByIdService(exampleId);
    return new GetExampleByIdResponseDto(example);
  }

  @Public(true)
  @Get()
  @ApiOperation({ summary: 'Get All Examples' })
  async getAllExamplesController(): Promise<GetAllExamplesResponseDto> {
    const examples = await this.exampleService.getAllExamplesService();
    return new GetAllExamplesResponseDto(examples);
  }
}
