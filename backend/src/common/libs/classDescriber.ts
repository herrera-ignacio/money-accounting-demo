export class ClassDescriber {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  describeClass = (ClassType: new () => any): string[] => {
    const obj = new ClassType();
    return Object.getOwnPropertyNames(obj);
  };
}
