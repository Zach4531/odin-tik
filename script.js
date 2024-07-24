const personProto = {
  sayHello() {
    return `My name is ${this.name}`;
  },
};

function createPerson(name) {
  return Object.create(personProto, {
    name: {
      value: name,
    },
  });
}
const user = createPerson('Zach');
