
import { userSignInValidationSchema, userSignUpValidationSchema } from '~/packages/user/user.js';

import { ValidationName } from '../enums/enums.js';

const validationNameToSchema = {
  [ValidationName.USER_SIGN_UP_VALIDATION]: userSignUpValidationSchema,
  [ValidationName.USER_SIGN_IN_VALIDATION]: userSignInValidationSchema,
};

export { validationNameToSchema };
