export const whiteSpaceValidator = (value: string) => {
  const val = value ?? "";
  if (val.trim().length === val.length) return true;
  return "No surrouding white spaces.";
};
