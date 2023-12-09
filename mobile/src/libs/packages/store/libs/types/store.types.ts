import { type notification } from '~/libs/packages/notification/notification';
import { type storage } from '~/libs/packages/storage/storage';
import { type authApi,type firebaseAuth } from '~/packages/auth/auth';

type RootReducer = {};

type ExtraArguments = {
  notification: typeof notification;
  storage: typeof storage;
  authApi: typeof authApi;
  firebaseAuth: typeof firebaseAuth;
};

export { type ExtraArguments, type RootReducer };
