import { IsString, IsNotEmpty, IsIn } from "class-validator";
import { Role } from "src/common/enum/role.enum";

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  role: Role;
}
