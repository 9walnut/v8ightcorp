import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from './user.repository';
// import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private userRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(username: string, password: string): Promise<void> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = this.userRepository.create({
      username,
      password: hashedPassword,
    });
    await this.userRepository.save(user);
  }

  async signIn(
    username: string,
    password: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await this.userRepository.findOne({ where: { username } });
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { username };
      const accessToken = await this.jwtService.sign(payload, {
        expiresIn: '15m',
      });
      const refreshToken = await this.jwtService.sign(payload, {
        expiresIn: '7d',
      });
      return { accessToken, refreshToken };
    }
    throw new Error('Invalid credentials');
  }

  async refreshToken(oldRefreshToken: string): Promise<string> {
    const payload = this.jwtService.verify(oldRefreshToken);
    const newAccessToken = await this.jwtService.sign(
      { username: payload.username },
      { expiresIn: '15m' },
    );
    return newAccessToken;
  }
}
