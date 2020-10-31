export const hanldeErrors = (res) => {
  if (!res.ok) {
    throw Error(res.statusText);
  }
  return res;
};
