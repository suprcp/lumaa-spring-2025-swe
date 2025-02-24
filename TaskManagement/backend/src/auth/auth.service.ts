import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    console.log(`Validating user: ${username}`);
    console.log(`Provided password: ${password}`);
    console.log(`Provided password length: ${password.length}`);

    const user = await this.usersService.findOne(username);

   if (!user) {
         console.log(`User not found: ${username}`);
         throw new UnauthorizedException({
           error: 'user_not_found',
           message: 'Account does not exist'
         });
       }

    console.log('Stored hashed password:', user.password);
    console.log('Stored hashed password length:', user.password.length);

    try {
      const isPasswordValid = await bcrypt.compare(password, user.password);

      console.log('Password validation result:', isPasswordValid);

      if (!isPasswordValid) {
              console.log(`Invalid password for user: ${username}`);
              throw new UnauthorizedException({
                error: 'invalid_password',
                message: 'Incorrect password'
              });
            }

      const { password: _, ...result } = user;
      return result;
    } catch (error) {
      console.error('Error during password comparison:', error);
      return null;
    }
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(username: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.usersService.create(username, hashedPassword);
    const { password: _, ...result } = user;
    return result;
  }
}