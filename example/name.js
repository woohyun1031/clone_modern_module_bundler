let __default__ = "Default";

export const changeName = (name) => {
  __default__ = name ? name : __default__;
  const result = __default__;
  return result;
};
