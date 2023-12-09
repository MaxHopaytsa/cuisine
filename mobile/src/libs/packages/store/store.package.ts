import {
  type AnyAction,
  type Middleware,
  type MiddlewareArray,
  type ThunkMiddleware,
} from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';

import { AppEnvironment } from '~/libs/enums/enums';
import { type Config } from '~/libs/packages/config/config';
import { authApi, firebaseAuth } from '~/packages/auth/auth';

import { notification } from '../notification/notification';
import { storage } from '../storage/storage';
import { type ExtraArguments, type RootReducer } from './libs/types/types';

class Store {
  public instance: ReturnType<
    typeof configureStore<
      RootReducer,
      AnyAction,
      MiddlewareArray<
        [
          ThunkMiddleware<RootReducer, AnyAction, ExtraArguments>,
          Middleware,
          Middleware,
          Middleware,
        ]
      >
    >
  >;

  public constructor(config: Config) {
    this.instance = configureStore({
      devTools: config.ENV.APP.ENVIRONMENT !== AppEnvironment.PRODUCTION,
      reducer: {},
      middleware: (getDefaultMiddleware) => [
        ...getDefaultMiddleware({
          thunk: {
            extraArgument: this.extraArguments,
          },
        }),
      ],
    });
  }

  public get extraArguments(): ExtraArguments {
    return {
      notification,
      storage,
      authApi,
      firebaseAuth,
    };
  }
}

export { Store };
