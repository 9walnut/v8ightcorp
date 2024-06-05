import {
  Controller,
  Post,
  Body,
  // Get,
  // UseGuards,
  // Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
// import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signUp(
    @Body('username') username: string,
    @Body('password') password: string,
  ): Promise<void> {
    return this.authService.signUp(username, password);
  }

  @Post('signin')
  async signIn(
    @Body('username') username: string,
    @Body('password') password: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    return this.authService.signIn(username, password);
  }

  @Post('refresh')
  async refresh(
    @Body('refreshToken') refreshToken: string,
  ): Promise<{ accessToken: string }> {
    const accessToken = await this.authService.refreshToken(refreshToken);
    return { accessToken };
  }
}
