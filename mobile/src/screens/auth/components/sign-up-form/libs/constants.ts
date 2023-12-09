import { type UserSignUpRequestDto } from '~/packages/users/users';

const USER_SIGN_UP_DEFAULT_VALUES: UserSignUpRequestDto = {
  email: '',
  username: '',
  password: '',
  confirmedPassword: '',
};

export { USER_SIGN_UP_DEFAULT_VALUES };
