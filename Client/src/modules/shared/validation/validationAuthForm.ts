export const validationAuthForm = (values: any) => {
  let errors: any = {}
  if (!values.login) {
    errors.login = 'Напишите логин или почту'
  }
  if (!values.password) {
    errors.password = 'Напишите пароль'
  } else if (values.password.length < 6) {
    errors.password = 'Паролль должен содержать минимум 7 символов'
  }
  return errors
}

export const validationForm = (values: any) => {
  let errors: any = {}
  if (values.password !== values['repeat Password']) {
    errors.password = 'Неправильно повторили пароль'
  } else if (values.password.length < 6) {
    errors.password = 'Паролль должен содержать минимум 7 символов'
  }

  return errors
}
