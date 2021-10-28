import { Injectable, Scope, Logger } from '@nestjs/common';

@Injectable({ scope: Scope.TRANSIENT })
export default class AppLog extends Logger {
  error(message: any, trace?: string, context?: string) {
    // third party integration here
    super.error(message, trace, context);
  }
}
