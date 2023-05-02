export const AutoBind =
  (_: void) =>
  (_: any, __: string | Symbol, descriptor: PropertyDescriptor) => {
    const newDescriptor: PropertyDescriptor = {
      configurable: true,
      enumerable: false,
      get() {
        return descriptor.value.bind(this);
      },
    };
    return newDescriptor;
  };

export const GenerateUUID = (digit: number) => {
  let uuid = '';
  const charLibrary = 'abcdefghijklmnopqrstuvwxyz1234567890';
  for (let _ = 0; _ < digit; _++) {
    digit--;
    uuid += charLibrary[Math.floor(Math.random() * charLibrary.length)];
  }
  return uuid;
};
