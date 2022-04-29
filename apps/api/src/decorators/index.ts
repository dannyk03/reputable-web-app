import { applyDecorators, SetMetadata } from '@nestjs/common';
import { pre, DocumentType, plugin, modelOptions } from '@typegoose/typegoose';
import { Query } from 'mongoose';
import { ClassConstructor, plainToClass } from 'class-transformer';
import { mongooseLeanGetters, mongooseLeanVirtuals } from '../plugins';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

export const TransformQueries = <T>(
  cls: ClassConstructor<T>,
  postTransformFn?: (doc: T) => T,
) =>
  applyDecorators(
    pre<T>(
      ['findOne', 'find'],
      function (this: Query<any, DocumentType<T>>, next) {
        this.transform((doc: DocumentType<T>) => {
          let transformedInstance: T = plainToClass(cls, doc);
          if (postTransformFn)
            transformedInstance = postTransformFn(transformedInstance);
          return transformedInstance;
        });
        next();
      },
    ),
    plugin(mongooseLeanGetters),
    plugin(mongooseLeanVirtuals),
    modelOptions({
      schemaOptions: {
        timestamps: true,
        autoIndex: true,
        toJSON: {
          virtuals: true,
          getters: true,
        },
        toObject: {
          virtuals: true,
          getters: true,
        },
      },
    }),
  );
