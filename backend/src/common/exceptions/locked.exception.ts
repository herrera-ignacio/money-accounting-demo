import { HttpException } from './http.exception';

export class LockedException extends HttpException {
  constructor(message?: string) {
    super(423, message || 'Resource is locked, try again later');
  }
}
