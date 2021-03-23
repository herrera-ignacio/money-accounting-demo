import * as core from 'express-serve-static-core';
import { Request } from 'express';
import { RepositoryQuery } from './repositoryQuery.interface';

interface QueryWithRepositoryQuery extends core.Query, RepositoryQuery {
  where?: Record<string, any>;
}

interface ParamsWithUUID extends core.ParamsDictionary {
  uuid: string;
}

interface BodyWithUUID {
  uuid: string;
}

export interface RequestWithIdParam extends Request {
  params: ParamsWithUUID;
}

export interface RequestWithCreateBody<T> extends Request {
  body: Partial<T>;
}

export interface RequestWithUpdateBody<T> extends Request {
  body: BodyWithUUID & Partial<T>;
}

export interface RequestWithRepositoryQuery extends Request {
  query: QueryWithRepositoryQuery;
}
