import { z } from 'zod';

import { UserValidationMessage } from '../enums/enums.js';
import { signRules } from './common-rules/sign-rules.js';

const userSignUp = z.object({
  username: signRules.username,
  email: signRules.email,
  password: signRules.password,
  confirmedPassword: signRules.password,
}).required().refine((data)=> data.password===data.confirmedPassword, {
  path: ['confirmedPasswors'],
  message: UserValidationMessage.PASSWORD_NOT_MATCH
});

type UserSignUpValidationSchemaType = z.infer<typeof userSignUp>;

export { userSignUp, type UserSignUpValidationSchemaType };
