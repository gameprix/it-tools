import { describe, expect, it } from 'vitest';
import { type JsonValue, condenseJsonStructures } from './json-data-condenser.service';

const asJsonValue = <T extends JsonValue>(val: T): T => val;

describe('condenseJsonStructures', () => {
  it('removes duplicate object structures in an array but keeps unique ones', () => {
    const input = asJsonValue({
      users: [
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' },
        { id: 3, name: 'Charlie' },
        { id: 4, name: 'David', email: 'david@example.com' }, // unique structure
        { id: 5, name: 'Eve' },
      ],
      status: 'active',
    });

    const output = condenseJsonStructures(input);

    expect(output).toEqual({
      users: [
        { id: 1, name: 'Alice' },
        { id: 4, name: 'David', email: 'david@example.com' }, // kept due to extra key
      ],
      status: 'active',
    });
  });

  it('keeps all non-array values untouched', () => {
    const input = asJsonValue({
      status: 'ok',
      count: 5,
      success: true,
      metadata: {
        source: 'api',
        timestamp: '2025-06-27T12:00:00Z',
      },
    });

    const output = condenseJsonStructures(input);

    expect(output).toEqual(input);
  });

  it('keeps non-object array values untouched', () => {
    const input = asJsonValue([1, 2, 3, 'a', true, null]);

    const output = condenseJsonStructures(input);

    expect(output).toEqual([1, 2, 3, 'a', true, null]);
  });

  it('returns primitive values unchanged', () => {
    expect(condenseJsonStructures(42)).toBe(42);
    expect(condenseJsonStructures('hello')).toBe('hello');
    expect(condenseJsonStructures(null)).toBe(null);
    expect(condenseJsonStructures(true)).toBe(true);
  });
});
