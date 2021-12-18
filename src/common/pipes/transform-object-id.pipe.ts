import { PipeTransform, Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { InvalidMongoIdException } from '../errors';

@Injectable()
export class TransformObjectIdPipe implements PipeTransform<string, Types.ObjectId> {
  // eslint-disable-next-line
  transform(value: string): Types.ObjectId {
    const validObjectId = Types.ObjectId.isValid(value);
    if (!validObjectId) throw new InvalidMongoIdException();
    return Types.ObjectId.createFromHexString(value);
  }
}
