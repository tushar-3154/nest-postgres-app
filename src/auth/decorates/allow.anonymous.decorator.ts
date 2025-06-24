import { SetMetadata } from '@nestjs/common';

export const AlllowAnanymous = () => {
  return SetMetadata('isPublic', true);
};
