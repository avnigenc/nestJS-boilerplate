import { Test, TestingModule } from '@nestjs/testing';
import { HttpModule } from '@nestjs/common';
import ExampleController from '../src/domains/example/example.controller';
import ExampleService from '../src/domains/example/example.service';
import { GetExampleByExampleIdDto } from '../src/domains/example/dto/request';
import { GetExampleByIdResponseDto } from '../src/domains/example/dto/response';

class MockExampleService {
  // eslint-disable-next-line
  getExampleByIdService() { return null; }
}

describe('ExampleController', () => {
  let testingModule: TestingModule;
  let exampleController: ExampleController;
  let exampleService: ExampleService;

  beforeEach(async () => {
    testingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [ExampleController],
      providers: [
        { provide: ExampleService, useClass: MockExampleService },
      ],
    }).compile();

    exampleService = testingModule.get<ExampleService>(ExampleService);
    exampleController = testingModule.get<ExampleController>(ExampleController);
  });

  describe('/examples/:exampleId (GET) by exampleId', () => {
    it('should get example by id', async () => {
      jest
        .spyOn(exampleService, 'getExampleByIdService')
        .mockImplementation(() => new Promise((resolve) => resolve({
          userId: 1,
          jsonId: 1,
          title: 'test',
          completed: true,
        })));

      const getExampleByExampleIdDto = new GetExampleByExampleIdDto();
      getExampleByExampleIdDto.exampleId = 1;

      const response: GetExampleByIdResponseDto = await exampleController.getExampleByIdController(getExampleByExampleIdDto);
      expect(response.data.jsonId).toBe(getExampleByExampleIdDto.exampleId);
      expect(response.message).toBe('OK');
    });
  });
});
