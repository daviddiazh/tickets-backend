export const parseBoolean = (value: any): boolean | undefined => {
  if (value.obj[value.key] === 'true') return true;
  if (value.obj[value.key] === 'false') return false;

  return value.obj[value.key];
};
