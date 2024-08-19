import { IsEmail, IsString } from 'class-validator';

import { Exclude } from 'class-transformer';

export class User {
  id: number;

  @IsEmail()
  email: string;

  @IsString()
  @Exclude()
  password: string;

  @IsString()
  name: string;
}
