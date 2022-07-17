import { isRange, serializeRange, deserializeRange } from '../range'


describe(isRange, () => {
  test('returns true when given object is indeed a range.', () => {
    expect(isRange({ start: { line: 0, character: 0 }, end: { line: 0, character: 0 } })).toBe(true)
  })

  test('returns false when given object is not a range.', () => {
    expect(isRange({})).toBe(false)
    expect(isRange(0)).toBe(false)
    expect(isRange('')).toBe(false)
    expect(isRange(null)).toBe(false)
    expect(isRange(undefined)).toBe(false)
  })
})


describe(serializeRange, () => {
  test('returns a string representation of a range.', () => {
    expect(serializeRange({ start: { line: 0, character: 0 }, end: { line: 0, character: 0 } })).toBe('0:0-0:0')
    expect(serializeRange({ start: { line: 1, character: 2 }, end: { line: 1, character: 2 } })).toBe('1:2-1:2')
  })
})


describe(deserializeRange, () => {
  test('returns a range from a string representation.', () => {
    expect(deserializeRange('0:0-0:0')).toEqual({ start: { line: 0, character: 0 }, end: { line: 0, character: 0 } })
    expect(deserializeRange('1:2-3:4')).toEqual({ start: { line: 1, character: 2 }, end: { line: 3, character: 4 } })
  })

  test('throws an error when given range is invalid.', () => {
    expect(() => deserializeRange('0:x-0:0')).toThrow(Error)
    expect(() => deserializeRange('0:0-0:0-0:0')).toThrow(Error)
    expect(() => deserializeRange('0:0-0:0-0:0-0:0')).toThrow(Error)
    expect(() => deserializeRange('0:0-0:0-0:0-0:0-0:0')).toThrow(Error)
  })
})

