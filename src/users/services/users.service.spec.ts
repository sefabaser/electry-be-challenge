import { UsersService } from 'src/users/services/users.service';

const SampleUser = {
  userId: 1,
  username: 'Lohgarra',
  password: 'wookieSidearm'
};

describe('Book Service', () => {
  let usersService: UsersService;

  beforeEach(() => {
    usersService = new UsersService();
    // TODO: update to "fake db connection" after having the db
    (<any>usersService).users = [SampleUser];
  });

  test('find existing user', () => {
    let result = usersService.findUser('Lohgarra');
    expect(result).toStrictEqual(SampleUser);
  });

  test('non-existing user', () => {
    let result = usersService.findUser('NonExistingUser');
    expect(result).toStrictEqual(undefined);
  });
});
