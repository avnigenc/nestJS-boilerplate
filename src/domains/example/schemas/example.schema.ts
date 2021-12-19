import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import * as mongoose from 'mongoose';

@Schema({
  timestamps: true,
  id: true,
  _id: true,
  toJSON: {
    virtuals: true,
    versionKey: false,
    transform: (doc, converted) => {
      // eslint-disable-next-line
      delete converted._id;
    },
  },
})
export class Example {
  @Prop({ type: mongoose.Schema.Types.ObjectId, auto: true })
  readonly _id: Types.ObjectId;

  @Prop()
  userId: number;

  @Prop()
  jsonId: number;

  @Prop()
  title: string;

  @Prop()
  completed: boolean;
}

export type ExampleDocument = Example & Document;
export const ExampleSchema = SchemaFactory.createForClass(Example);
