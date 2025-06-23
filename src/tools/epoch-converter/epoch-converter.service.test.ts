import { describe, expect, it } from 'vitest';
import { dateToEpoch, epochToDate } from './epoch-converter.service';

describe('epochToDate', () => {
  it('converts known epoch seconds to correct local date string', () => {
    const epoch = 1750707060;
    const expectedDate = '6/23/2025, 12:31:00 PM';
    const result = epochToDate(epoch);
    expect(result).toBe(expectedDate);
  });

  it('throws for invalid string input', () => {
    expect(() => epochToDate('not-a-number')).toThrowError(TypeError);
  });

  it('throws for NaN input', () => {
    expect(() => epochToDate(Number.NaN)).toThrowError(TypeError);
  });
});

describe('dateToEpoch', () => {
  it('converts a known date to correct epoch (2025-06-20 13:48:00)', () => {
    const input = '2025-06-20T13:48:00';
    const expectedEpoch = 1750452480;
    const result = dateToEpoch(input);
    expect(result).toBe(expectedEpoch);
  });

  it('throws for invalid date string', () => {
    expect(() => dateToEpoch('not-a-date')).toThrowError(TypeError);
  });

  it('throws for empty string', () => {
    expect(() => dateToEpoch('')).toThrowError(TypeError);
  });
});
