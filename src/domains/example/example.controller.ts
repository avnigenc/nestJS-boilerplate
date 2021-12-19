import {
  Body,
  Controller,
  Param,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Logger,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { Public } from '../../common/decorators/public.decorator';

import ExampleService from './example.service';
import { CreateExampleDto, ExampleByIdDto } from './dto/request';
import { GetAllExamplesResponseDto, GetExampleByIdResponseDto } from './dto/response';
import { GenericResponseDto } from '../../common/dto/generic-response.dto';

@ApiTags('examples')
@Controller()
export default class ExampleController {
  logger: Logger = new Logger(ExampleController.name);

  constructor(private readonly exampleService: ExampleService) {}

  @Public(true)
  @Post()
  @ApiOperation({ summary: 'Create new Example' })
  async createExampleController(
    @Body() createExampleDto: CreateExampleDto,
  ): Promise<GenericResponseDto> {
    await this.exampleService.createExampleService(createExampleDto);
    return new GenericResponseDto(true);
  }

  @Public(true)
  @Get(':exampleId')
  @ApiOperation({ summary: 'Get Example by exampleId' })
  async getExampleByIdController(
    @Param() exampleByIdDto: ExampleByIdDto,
  ): Promise<GetExampleByIdResponseDto> {
    const { exampleId } = exampleByIdDto;
    const example = await this.exampleService.getExampleByIdService(exampleId);
    return new GetExampleByIdResponseDto(example);
  }

  @Public(true)
  @Put(':exampleId')
  @ApiOperation({ summary: 'Update Example' })
  async updateExampleController(
    @Param() exampleByIdDto: ExampleByIdDto,
  ): Promise<GenericResponseDto> {
    this.logger.log(exampleByIdDto);
    return new GenericResponseDto(true);
  }

  @Public(true)
  @Patch(':exampleId')
  @ApiOperation({ summary: 'Complete Example' })
  async completeExampleController(
    @Param() exampleByIdDto: ExampleByIdDto,
  ): Promise<GenericResponseDto> {
    this.logger.log(exampleByIdDto);
    return new GenericResponseDto(true);
  }

  @Public(true)
  @Delete(':exampleId')
  @ApiOperation({ summary: 'Delete Example' })
  async deleteExampleController(
    @Param() exampleByIdDto: ExampleByIdDto,
  ): Promise<GenericResponseDto> {
    this.logger.log(exampleByIdDto);
    return new GenericResponseDto(true);
  }

  @Public(true)
  @Get()
  @ApiOperation({ summary: 'Get All Examples' })
  async getAllExamplesController(): Promise<GetAllExamplesResponseDto> {
    const examples = await this.exampleService.getAllExamplesService();
    return new GetAllExamplesResponseDto(examples);
  }
}
