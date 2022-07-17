import { isPosition, serializePosition, deserializePosition } from '../position'


describe(isPosition, () => {
  test('returns true when given object is indeed a position.', () => {
    expect(isPosition({ line: 0, character: 0 })).toBe(true)
  })

  test('returns false when given object is not a position.', () => {
    expect(isPosition({})).toBe(false)
    expect(isPosition(0)).toBe(false)
    expect(isPosition('')).toBe(false)
    expect(isPosition(null)).toBe(false)
    expect(isPosition(undefined)).toBe(false)
  })
})


describe(serializePosition, () => {
  test('returns a string representation of a position.', () => {
    expect(serializePosition({ line: 0, character: 0 })).toBe('0:0')
    expect(serializePosition({ line: 1, character: 2 })).toBe('1:2')
  })
})


describe(deserializePosition, () => {
  test('returns a position from a string representation.', () => {
    expect(deserializePosition('0:0')).toEqual({ line: 0, character: 0 })
    expect(deserializePosition('1:2')).toEqual({ line: 1, character: 2 })
  })

  test('throws an error when given string is not a valid position.', () => {
    expect(() => deserializePosition('0')).toThrow(Error)
    expect(() => deserializePosition('0:')).toThrow(Error)
    expect(() => deserializePosition(':0')).toThrow(Error)
    expect(() => deserializePosition('0:0:0')).toThrow(Error)
    expect(() => deserializePosition('0:0:0:0')).toThrow(Error)
    expect(() => deserializePosition('0:0:0:0:0')).toThrow(Error)
  })
})
