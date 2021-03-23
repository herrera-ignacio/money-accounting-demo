import { Response, Request, NextFunction } from 'express';
import { ClassConstructor, plainToClass } from 'class-transformer';
import { validateOrReject, ValidationError } from 'class-validator';
import { BadRequestException } from '../exceptions';

interface ValidationOptions {
  skipMissingProperties?: boolean;
  whitelist?: boolean;
  forbidNonWhitelisted?: boolean;
}

const defaultValidationOptions: ValidationOptions = {
  skipMissingProperties: false,
  whitelist: true,
  forbidNonWhitelisted: true,
};

export const validationMiddleware = (
  type: ClassConstructor<any>,
  options: ValidationOptions = defaultValidationOptions,
  reqKey: 'body' | 'params' = 'body',
) => async (
  req: Request,
  _res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    await validateOrReject(plainToClass(type, req[reqKey]), options);
    next();
  } catch (error) {
    const message = (error as ValidationError[]).map((e) => Object.values(e.constraints)).join(', ');
    next(new BadRequestException(message));
  }
};
