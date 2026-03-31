import { UserDto } from 'src/profile/dto/user.dto';
export declare class TokensDto {
    accessToken: string;
}
export declare class AuthResponse {
    user: UserDto;
    tokens: TokensDto;
}
export declare class RefreshResponse {
    accessToken: string;
}
