import { rootReducer } from '../reducers';

export * from './loader';
export * from './transaction';
export * from './account';

export type RootState = ReturnType<typeof rootReducer>;
