import { z } from 'zod';

import { signRules } from './common-rules/sign-rules.js';

const userSignIn = z.object({
  email: signRules.email,
  password: signRules.password,
}).required();

type UserSignInValidationSchemaType = z.infer<typeof userSignIn>;

export { userSignIn, type UserSignInValidationSchemaType };
