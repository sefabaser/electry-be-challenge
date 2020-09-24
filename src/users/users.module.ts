import { Module } from '@nestjs/common';
import { UsersService } from 'src/users/services/users.service';

@Module({
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
