import { File } from '../file'
import { isLocation, Location } from '../location'


describe(isLocation, () => {
  test('returns true when given object is indeed a location.', () => {
    const location: Location = {
      file: new File('', ''),
      range: { start: { line: 0, character: 0 }, end: { line: 0, character: 0 } }
    }

    expect(isLocation(location)).toBe(true)
  })

  test('returns false when given object is not a location.', () => {
    expect(isLocation({})).toBe(false)
    expect(isLocation(0)).toBe(false)
    expect(isLocation('')).toBe(false)
    expect(isLocation(null)).toBe(false)
    expect(isLocation(undefined)).toBe(false)
  })
})
