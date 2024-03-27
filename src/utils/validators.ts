export const hasSpecialCharacters = (str: string) => {
  // Regular expression to match special characters
  const specialCharsRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?]/;

  return specialCharsRegex.test(str);
};
