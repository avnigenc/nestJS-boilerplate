import { Injectable } from '@nestjs/common';

@Injectable()
class ExampleLogic {
  // eslint-disable-next-line
  public async exampleLogic(arg: string) {
    return !!arg;
  }
}

export default ExampleLogic;
