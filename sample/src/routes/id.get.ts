import factory from '../factory.js';

export default factory.createHandlers(async (c) => {
  return c.text('Hello from index.get.ts');
});
