import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginRequestDto } from './dto/login.request.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { loginResponseDTO } from './dto/login.response.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Realizar login de um usuário' })
  @ApiResponse({
    status: 200,
    description: 'Login realizado com sucesso',
    type: loginResponseDTO,
  })
  @ApiResponse({
    status: 400,
    description: 'Parâmetros inválidos',
  })
  @ApiResponse({
    status: 401,
    description: 'Operação não autorizada',
  })
  @Post('login')
  async login(@Body() dto: LoginRequestDto) {
    const user = await this.authService.validateUser(dto.email, dto.password);
    if (!user) throw new UnauthorizedException('Credenciais inválidas.');
    return this.authService.login(user);
  }
}
