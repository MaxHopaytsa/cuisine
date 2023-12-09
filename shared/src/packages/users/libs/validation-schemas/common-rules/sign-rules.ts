import { z } from 'zod';

import { UserValidationMessage } from '../../enums/enums.js';

const signRules = {
  username: z.string({
    required_error: UserValidationMessage.USERNAME_REQUIRED,
    invalid_type_error: UserValidationMessage.USERNAME_TYPE_WRONG,
  })
  .trim().min(3, { message: UserValidationMessage.USERNAME_MIN_LENGTH }),

  email: z
  .string({
    required_error: UserValidationMessage.EMAIL_REQUIRED,
    invalid_type_error: UserValidationMessage.EMAIL_TYPE_WRONG,
  })
  .trim()
  .email({ message: UserValidationMessage.EMAIL_INVALID }),

password: z.string({
  required_error: UserValidationMessage.PASSWORD_REQUIRED,
  invalid_type_error: UserValidationMessage.PASSWORD_TYPE_WRONG,
}).trim().min(8, { message: UserValidationMessage.PASSWORD_MIN_LENGTH })
};

export { signRules };
