import { IsString, IsNumber } from "class-validator";
export class CreateUserDto {

    @IsString()
    public first_name:string;

    @IsString()
    public last_name:string;

    @IsNumber()
    public city: number;

    @IsString()
    public company:string;
}
