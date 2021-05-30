export const useValidation = () => {
  const emailRules = [
    (v: string) => !!v || 'E-mail is required',
    (v: string) => /.+@.+/.test(v) || 'E-mail must be valid',
  ]
  return {
    emailRules,
  }
}
