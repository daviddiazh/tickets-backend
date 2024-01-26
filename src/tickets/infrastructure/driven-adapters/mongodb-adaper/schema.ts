import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { IQueueTicket } from '@tickets/domain/interfaces/queue-tickets.interface';
import { Step } from '@tickets/domain/enums/status.enum';

@Schema({
  toJSON: {
    virtuals: true,
    transform: function (doc: any, ret: any) {
      delete ret.__v;
      return ret;
    },
  },
  timestamps: true,
  versionKey: false,
})
export class TicketSpec extends Document implements IQueueTicket {
  @Prop({
    type: Types.ObjectId,
    ref: 'Auth',
    default: null,
  })
  managementBy?: any;

  @Prop({
    type: String,
    required: true,
    trim: true,
  })
  ticket: string;

  @Prop({
    type: String,
    required: false,
    trim: true,
    default: Step.START,
  })
  step: Step;

  @Prop({
    type: Number,
    required: true,
    trim: true,
  })
  consecutive: number;
}

export const TicketSchema = SchemaFactory.createForClass(TicketSpec);
