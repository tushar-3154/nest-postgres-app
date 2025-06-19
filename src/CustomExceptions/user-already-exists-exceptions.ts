import { HttpException, HttpStatus } from '@nestjs/common';

export class UserAlredyExistsException extends HttpException {
  constructor(fieldName: string, fieldValue: string) {
    super(
      `User With  ${fieldName} ${fieldValue} already exists `,
      HttpStatus.CONFLICT,
    );
  }
}
