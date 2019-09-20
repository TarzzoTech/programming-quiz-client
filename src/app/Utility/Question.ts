export const generateId = () => {
  return (
    '_' +
    Math.random()
      .toString(36)
      .substr(2) +
    Math.random()
      .toString(36)
      .substr(2)
  );
};
