import { IsNotEmpty } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}

// 可以在Dto寫class-validator套件阻止若欄位有空值得狀況像是IsNotEmpty，而後有使用到此dto的service，就有防止空白的功能