import { HttpException } from './http.exception';

export class MethodNotAllowedException extends HttpException {
  constructor(message?: string) {
    super(405, message || 'Method known by the origin server but not allowed by target resource');
  }
}
