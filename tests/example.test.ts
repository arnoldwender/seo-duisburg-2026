import { describe, it, expect } from 'vitest';

describe('Example Test Suite', () => {
  it('should pass basic assertion', () => {
    expect(true).toBe(true);
  });

  it('should perform arithmetic correctly', () => {
    expect(2 + 2).toBe(4);
  });

  it('should handle string operations', () => {
    const message = 'Hello World';
    expect(message).toContain('World');
    expect(message.toLowerCase()).toBe('hello world');
  });

  it('should work with arrays', () => {
    const numbers = [1, 2, 3, 4, 5];
    expect(numbers).toHaveLength(5);
    expect(numbers).toContain(3);
  });

  it('should work with objects', () => {
    const user = { name: 'Test User', age: 25 };
    expect(user).toHaveProperty('name');
    expect(user.name).toBe('Test User');
  });
});
