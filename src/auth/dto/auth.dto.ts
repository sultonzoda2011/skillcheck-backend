import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from 'src/profile/dto/user.dto';

export class TokensDto {
  @ApiProperty({
    description: 'JWT токен доступа для аутентифицированного пользователя',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  accessToken: string;
}

export class AuthResponse {
  @ApiProperty({ type: UserDto })
  user: UserDto;

  @ApiProperty({ type: TokensDto })
  tokens: TokensDto;
}

export class RefreshResponse {
  @ApiProperty({
    description: 'Новый JWT токен доступа',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  accessToken: string;
}
