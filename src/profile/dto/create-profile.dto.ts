import {
  IsDate,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateProfileDto {
  @IsString({ message: 'First Name Should be a String value.  ' })
  @IsOptional()
  @MinLength(3, {
    message: 'First Name Should have a minimum of 3 character. ',
  })
  @MaxLength(100)
  firstName?: string;

  @IsString({ message: 'First Name Should be a String value.' })
  @IsOptional()
  @MinLength(3, {
    message: 'First Name Should have a minimum of 3 character. ',
  })
  @MaxLength(100)
  lastName?: string;

  @IsString()
  @IsOptional()
  @MaxLength(10)
  gender?: string;

  @IsOptional()
  @IsDate()
  dateOfBirth?: Date;

  @IsString()
  @IsOptional()
  bio?: string;

  @IsString()
  @IsOptional()
  profileImage?: string;
}
