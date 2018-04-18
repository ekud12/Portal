import { ErrorHandler, Injectable } from '@angular/core';

import { LoggerService } from './core/services/logger.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private _log: LoggerService) {}
  handleError(error) {
    this._log.error('error = ' + error, ['GlobalErrorHandler', 'handleError']);
    throw error;
  }
}
