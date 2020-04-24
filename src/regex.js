export const checkVal = (val) => {
  return val.match(/^(\d+\.?\d{0,2}|\.\d{1,2})$/);
};

export const checkInt = (val) => {
  return val.match(/^\d+$/);
};
