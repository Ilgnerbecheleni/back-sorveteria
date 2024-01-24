import { IsNumber, IsString } from "class-validator"

export class CreateFileDto {
    
    @IsString()
    fileName:string
    @IsNumber()
    contentLength:number 
    @IsString()
    contentType:string 
    @IsString()
    url:string 
}
