import { describe, expect, test } from 'bun:test';
import { routeTransformer } from '../routes';

describe('routeTransformer', () => {
  test('to GET /users for users.get.ts', async () => {
    expect(routeTransformer('users.get.ts')).resolves.toEqual({
      path: '/users',
      method: 'get',
    });
  });

  test('to ALL /users for users.ts', async () => {
    expect(routeTransformer('users.ts')).resolves.toEqual({
      path: '/users',
      method: 'all',
    });
  });

  test('to GET / for index.get.ts', async () => {
    expect(routeTransformer('index.get.ts')).resolves.toEqual({
      path: '/',
      method: 'get',
    });
  });

  test('to POST /user for user.POST.ts', async () => {
    expect(routeTransformer('user.POST.ts')).resolves.toEqual({
      path: '/user',
      method: 'post',
    });
  });

  test('fails for invalid file name', () => {
    expect(routeTransformer('invalidfile')).rejects.toThrowError();
  });

  test('fails for non js/ts files', () => {
    expect(routeTransformer('invalidfile.cs')).rejects.toThrowError();
  });
});
