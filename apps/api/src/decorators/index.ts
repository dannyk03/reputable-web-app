import { applyDecorators, SetMetadata } from '@nestjs/common';
import { pre, DocumentType, plugin, modelOptions } from '@typegoose/typegoose';
import { Query, Document } from 'mongoose';
import {
  ClassConstructor,
  plainToClass,
  Expose,
  Transform,
} from 'class-transformer';
import { mongooseLeanGetters, mongooseLeanVirtuals } from '../plugins';
import { createParamDecorator } from '@nestjs/common';

export const CurrentUser = createParamDecorator((data, req) => req.user);

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

export const DeserializedMongoId = () =>
  applyDecorators(
    Expose,
    Transform((value) => {
      if ('value' in value) {
        // HACK: this is changed because of https://github.com/typestack/class-transformer/issues/879
        // return value.value.toString(); // because "toString" is also a wrapper for "toHexString"
        try {
          return value.obj[value.key].toString();
        } catch (err) {
          return undefined;
        }
      }
      return null;
    }),
  );

export const TransformQueries = <T>(
  cls: ClassConstructor<T>,
  postTransformFn?: (docs: T[]) => T[],
) =>
  applyDecorators(
    pre<T>(
      ['findOne', 'find'],
      function (this: Query<any, DocumentType<T>>, next) {
        this.transform((docs: DocumentType<T> | DocumentType<T>[]) => {
          let docsAsArray = Array.isArray(docs) ? docs : [docs];
          let transformedInstances: T[] = docsAsArray.map((d) =>
            plainToClass(cls, d),
          );
          if (postTransformFn)
            transformedInstances = postTransformFn(transformedInstances);
          return Array.isArray(docs)
            ? transformedInstances
            : transformedInstances[0];
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
