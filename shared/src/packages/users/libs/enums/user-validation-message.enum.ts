const UserValidationMessage = {
  USERNAME_REQUIRED: 'Username is required.',
  USERNAME_TYPE_WRONG: 'Username type is wrong.',
  USERNAME_MIN_LENGTH: 'Username must be at least 3 characters.',
  EMAIL_REQUIRED: 'Email is required.',
  EMAIL_TYPE_WRONG: 'Email type is wrong.',
  EMAIL_INVALID: 'Invalid email address',
  PASSWORD_REQUIRED: 'Password is required.',
  PASSWORD_TYPE_WRONG: 'Password type is wrong.',
  PASSWORD_MIN_LENGTH: 'Password must be at least 8 characters.',
  PASSWORD_NOT_MATCH: 'Password does not match.'
} as const;

export { UserValidationMessage };
