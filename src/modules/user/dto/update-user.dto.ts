import { IsString, IsOptional, IsIn } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  password?: string;

  @IsIn(['MANAGER', 'STOREKEEPER'])
  @IsOptional()
  role?: string;

  @IsOptional()
  isActive?: boolean;
}
