import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAuthDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async validateUser(authDto: CreateAuthDto) {
    const user = await this.prisma.user.findUnique({
      where: { username: authDto.username },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const isValidPassword = await this.verifyPassword(
      authDto.password,
      user.password,
    );
    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const { password, ...result } = user;
    return this.jwtService.sign(result);
  }

  async login(authDto: CreateAuthDto, res: Response) {
    const foundUser = await this.prisma.user.findUnique({
      where: { username: authDto.username },
    });
    if (!foundUser) {
      throw new BadRequestException('Invalid Credentials');
    }

    if (!this.verifyPassword(authDto.password, foundUser.password)) {
      throw new BadRequestException('Wrong password');
    }

    const payload = {
      userId: foundUser.userId,
      sub: {
        name: foundUser.username,
      },
    };

    const token = await this.generateAccessToken(payload);
    res.cookie('jwt', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 24 * 60 * 60 * 1000,
    });

    const { password, ...users } = foundUser;

    return res.send({
      ...users,
      accessToken: token,
      refreshToken: await this.refreshToken(payload),
    });
  }

  async createUser({ username, password }: CreateAuthDto, res: Response) {
    const isUserExist = await this.prisma.user.findUnique({
      where: { username },
    });
    if (isUserExist) {
      throw new HttpException('User already exist', 409);
    }
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await this.prisma.user.create({
      data: {
        userId: (new Date().getMilliseconds() * 10).toString(),
        username,
        password: hashedPassword,
      },
    });

    if (user) {
      return res
        .status(HttpStatus.CREATED)
        .send({ message: 'User created successfully' });
    }
  }

  async verifyPassword(password: string, hashedPassword: string) {
    const result = await bcrypt.compare(password, hashedPassword);

    return result;
  }

  async generateAccessToken(payload: any): Promise<string> {
    const accessToken = this.jwtService.sign(payload, {
      secret: `${process.env.jwt_secret}`,
      expiresIn: '15min',
    });

    return accessToken;
  }

  async refreshToken(payload: any): Promise<string> {
    const refreshToken = this.jwtService.sign(payload, {
      secret: `${process.env.jwt_secret}`,
      expiresIn: '7d',
    });

    return refreshToken;
  }
}
