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

  test('valid user', () => {
    let result = usersService.validateAndReturnUser('Lohgarra', 'wookieSidearm');
    let { password, ...userWithoutPassword } = SampleUser;
    expect(result).toStrictEqual(userWithoutPassword);
  });

  test('wrong password', () => {
    let result = usersService.validateAndReturnUser('Lohgarra', 'wrong');
    expect(result).toStrictEqual(undefined);
  });

  test('non-existing user', () => {
    let result = usersService.validateAndReturnUser('NonExistingUser', 'NonExistingPassword');
    expect(result).toStrictEqual(undefined);
  });
});
