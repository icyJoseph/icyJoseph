export const shouldFetch = expiry => {
  const now = new Date();
  const lastSave = new Date(expiry || now.getTime() - 1000);

  return now > lastSave;
};
