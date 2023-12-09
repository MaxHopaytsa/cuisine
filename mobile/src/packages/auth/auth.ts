
import { apollo } from '~/libs/packages/apollo/apollo';

import { AuthApi } from './auth-api';

const authApi = new AuthApi(apollo);

export { authApi };
export { default as firebaseAuth } from '@react-native-firebase/auth';
