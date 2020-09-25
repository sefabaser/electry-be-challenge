import { Injectable, NestInterceptor, ExecutionContext, CallHandler, HttpException, HttpStatus } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as jsonToXml from 'jsontoxml';

const SupportedContentTypes = ['application/json', 'application/xml'];

@Injectable()
export class ContentTypeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    let request = context.switchToHttp().getRequest();
    let response = context.switchToHttp().getResponse();

    let contentType = request.headers['content-type'] || 'application/json';
    if (!SupportedContentTypes.includes(contentType)) {
      throw new HttpException(
        `Unsuported content type! Type: '${contentType}', Supported Types: '${SupportedContentTypes.join(', ')}'`,
        HttpStatus.BAD_REQUEST
      );
    }

    return next.handle().pipe(
      map(responseData => {
        if (contentType === 'application/xml') {
          response.set('content-type', 'application/xml');
          return jsonToXml(responseData);
        } else {
          return responseData;
        }
      })
    );
  }
}
