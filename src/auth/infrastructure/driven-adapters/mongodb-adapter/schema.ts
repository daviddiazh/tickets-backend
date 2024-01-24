import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IEnrollment } from '@auth/domain/interfaces/enrollment.interface';
import { Role } from '@auth/domain/enums/role.enum';

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
export class AuthSpec extends Document implements IEnrollment {
  @Prop({
    type: String,
    required: true,
    trim: true,
  })
  fullName: string;

  @Prop({
    type: String,
    required: true,
    trim: true,
    unique: true,
  })
  email: string;

  @Prop({
    type: String,
    required: true,
    trim: true,
  })
  password: string;

  @Prop({
    type: String,
    required: true,
    trim: true,
    enum: {
      values: [Role.ADMIN, Role.AGENT],
    },
  })
  role: Role;

  @Prop({
    type: Boolean,
    required: false,
    default: true,
  })
  hasAccess: boolean;

  @Prop({
    type: Boolean,
    required: false,
    default: false,
  })
  online: boolean;
}

export const AuthSchema = SchemaFactory.createForClass(AuthSpec);
