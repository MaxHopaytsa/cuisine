import { type FetchResult } from '@apollo/client';

import { type apollo } from '~/libs/packages/apollo/apollo';

import { type UserAuthResponseDto } from '../users/users';
import { GET_USER, SIGNUP_USER } from './auth-queries';

class AuthApi {
  private client: typeof apollo;

  public constructor(client: typeof apollo) {
    this.client = client;
  }

  public async signUpUser(email: string, username: string): Promise<FetchResult<UserAuthResponseDto>> {
    return await  this.client.mutate({
      mutation: SIGNUP_USER,
      variables: { email, username },
      context: {
        hasAuth: false
      }
    });
  }

  public async getUser() {
    return await this.client.query({
      query: GET_USER,
      context: {
        hasAuth: true
      }
    });
  }

}

export { AuthApi };
