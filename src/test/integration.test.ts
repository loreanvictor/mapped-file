import { readFile } from 'fs/promises'
import { File } from '../'


test('should read an actual file and work properly.', async () => {
  const filename = 'src/test/integration-test.txt'
  const contents = await readFile(filename, 'utf8')
  const file = new File(filename, contents)

  expect(file.range({
    start: { line: 3, character: 5 },
    end: { line: 5, character: 2 }
  }, {
    surrounding: 1,
    highlight: s => `*${s}*`
  })).toEqual({
    2: { content: 'And I do weird stuff in my free time.', surround: true },
    3: { content: 'I als*o like anime.*', surround: false },
    4: { content: '*And coding fun stuff.*', surround: false },
    5: { content: '*I *work in IT.', surround: false },
    6: { content: 'And I hate all other departments.', surround: true }
  })
})
