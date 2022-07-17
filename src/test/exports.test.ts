import {
  Position, isPosition, serializePosition, deserializePosition,
  Range, isRange, serializeRange, deserializeRange,
  File, Location, isLocation
} from '../index'


test('everything is exported properly.', () => {
  expect(isPosition).toBeDefined()
  expect(isRange).toBeDefined()
  expect(isLocation).toBeDefined()
  expect(serializePosition).toBeDefined()
  expect(deserializePosition).toBeDefined()
  expect(serializeRange).toBeDefined()
  expect(deserializeRange).toBeDefined()
  expect(File).toBeDefined()
  expect(<Position>{}).toBeDefined()
  expect(<Range>{}).toBeDefined()
  expect(<Location>{}).toBeDefined()
})

