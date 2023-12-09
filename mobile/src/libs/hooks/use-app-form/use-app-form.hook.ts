
import { zodResolver } from '@hookform/resolvers/zod';
import {
  type Control,
  type DefaultValues,
  type FieldErrors,
  type FieldValues,
  type FormState,
  useForm,
  type UseFormClearErrors,
  type UseFormGetValues,
  type UseFormHandleSubmit,
  type UseFormProps,
  type UseFormRegister,
  type UseFormResetField,
  type UseFormSetError,
  type UseFormSetValue,
  type ValidationMode,
} from 'react-hook-form';

import { type ValidationSchema } from '~/libs/types/types';

type Parameters<T extends FieldValues = FieldValues> = {
  defaultValues: DefaultValues<T>;
  validationSchema?: ValidationSchema;
  mode?: keyof ValidationMode;
};

type ReturnValue<T extends FieldValues = FieldValues> = {
  control: Control<T, null>;
  handleSubmit: UseFormHandleSubmit<T>;
  errors: FieldErrors<T>;
  formState: FormState<T>;
  setError: UseFormSetError<T>;
  resetField: UseFormResetField<T>;
  clearErrors: UseFormClearErrors<T>;
  setValue: UseFormSetValue<T>;
  getValues: UseFormGetValues<T>;
  register: UseFormRegister<T>;
};

const useAppForm = <T extends FieldValues = FieldValues>({
  defaultValues,
  mode = 'onSubmit',
  validationSchema,
}: Parameters<T>): ReturnValue<T> => {
  let parameters: UseFormProps<T> = {
    mode,
    defaultValues,
  };

  if (validationSchema) {
    parameters = {
      ...parameters,
      resolver: zodResolver(validationSchema),
    };
  }

  const {
    control,
    handleSubmit,
    formState,
    setError,
    resetField,
    clearErrors,
    setValue,
    getValues,
    register,
  } = useForm<T>(parameters);

  return {
    control,
    handleSubmit,
    errors: formState.errors,
    formState,
    setError,
    resetField,
    clearErrors,
    setValue,
    getValues,
    register,
  };
};

export { useAppForm };
