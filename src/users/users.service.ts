import { Injectable } from '@nestjs/common';

export type User = any;

@Injectable()
export class UsersService {
  private readonly users: User[];

  constructor() {
    // TODO: move those to db
    this.users = [
      {
        userId: 1,
        username: 'Lohgarra',
        password: 'wookieSidearm'
      },
      {
        userId: 2,
        username: 'Jiprirr',
        password: 'nabooBlasterPistol'
      },
      {
        userId: 3,
        username: 'Nagraoao',
        password: 'wookieDistruptor'
      }
    ];
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }
}
