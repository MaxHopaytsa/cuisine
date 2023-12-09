import { createAsyncThunk } from '@reduxjs/toolkit';

import { StorageKey } from '~/libs/packages/storage/storage';
import { type AsyncThunkConfig } from '~/libs/types/types';
import {
  type UserAuthResponseDto,
  type UserSignInRequestDto,
  type UserSignUpRequestDto,
} from '~/packages/users/users';

import { name as sliceName } from './auth.slice';

const signUp = createAsyncThunk<
  UserAuthResponseDto,
  UserSignUpRequestDto,
  AsyncThunkConfig
>(`${sliceName}/sign-up`, async ({ password, email, username }, { extra }) => {
  const { authApi, firebaseAuth, storage } = extra;
  const { user } = await firebaseAuth().createUserWithEmailAndPassword(email, password);

  const token = await user.getIdToken();
  await storage.set(StorageKey.TOKEN, token);

  const a = await authApi.signUpUser(email, username);

  return { email, username, id: 1 };
});

const signIn = createAsyncThunk<
  UserAuthResponseDto,
  UserSignInRequestDto,
  AsyncThunkConfig
>(`${sliceName}/sign-in`, async ({ email, password }, { extra }) => {
  const { authApi, firebaseAuth, storage } = extra;
  const { user } = await firebaseAuth().signInWithEmailAndPassword(email, password);

  const token = await user.getIdToken();
  await storage.set(StorageKey.TOKEN, token);

  return { email, username, id: 1 };
});

const signOut = createAsyncThunk<
  UserAuthResponseDto | null,
  undefined,
  AsyncThunkConfig
>(`${sliceName}/sign-out`, async ( _ , { extra } ) => {
  const { authApi, firebaseAuth, storage } = extra;
  await firebaseAuth().signOut();
  await storage.drop(StorageKey.TOKEN);

  return null;
});

// const getAuthenticatedUser = createAsyncThunk<
//   UserAuthResponseDto | null,
//   undefined,
//   AsyncThunkConfig
// >(`${sliceName}/get-authenticated-user`, async (_, { extra }) => {
//   const { authApi } = extra;

//   const hasToken = await storage.has(StorageKey.TOKEN);

//   if (hasToken) {
//     return await authApi.getAuthenticatedUser();
//   }

//   return null;
// });

export { signIn, signOut, signUp };
