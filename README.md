# mapped-file


[![tests](https://github.com/loreanvictor/mapped-file/actions/workflows/test.yml/badge.svg)](https://github.com/loreanvictor/mapped-file/actions/workflows/test.yml)
[![coverage](https://github.com/loreanvictor/mapped-file/actions/workflows/coverage.yml/badge.svg)](https://github.com/loreanvictor/mapped-file/actions/workflows/coverage.yml)
[![version](https://img.shields.io/npm/v/mapped-file?logo=npm)](https://www.npmjs.com/package/mapped-file)

A simple utility for working with files using source mapped (line, character) locations.

```bash
npm i mapped-file
```

<br>

## Usage

```ts
import { readFile } from 'fs/promises'
import { File } from 'mapped-file'


const filename = 'diary.txt'
const contents = await readFile(filename, 'utf8')
const file = new File(filename, contents)


console.log(file.range({
  start: { line: 3, character: 5 },
  end: { line: 5, character: 2 }
}, {
  surrounding: 1,
  highlight: s => `*${s}*`
})

// {
//   '2': { content: 'And I do weird stuff in my free time.', surround: true },
//   '3': { content: 'I als*o like anime.*', surround: false },
//   '4': { content: '*And coding fun stuff.*', surround: false },
//   '5': { content: '*I *work in IT.', surround: false },
//   '6': { content: 'And I hate all other departments.', surround: true }
// }
```

<details>
<summary><code>diary.txt</code></summary>

```txt
Hellow world!
My name is jack
And I do weird stuff in my free time.
I also like anime.
And coding fun stuff.
I work in IT.
And I hate all other departments.
I have no idea why. They are nice people.
Maybe I should talk to my therapist about it?
But I hate her as well.
```

</details>

<br>

> ⚠️⚠️ Line numbers and characters are zero based! ⚠️⚠️

<br>

## Contribution

Be nice and respectful to other people. Make sure all checks are passing when creating a PR (tests, coverage and linter). Here are some useful commands
for development:

```bash
git clone git@github.com:loreanvictor/ts-inference-check.git  # 👉 clone the code (generally fork it before cloning though)
```
```bash
npm i            # 👉 install all dependencies
```
```bash
npm test         # 👉 run the tests
```
```bash
npm run coverage # 👉 check code coverage
```
```bash
npm run lint     # 👉 check code style
```
```bash
npm run lint:fix # 👉 fix trivial stylistic issues
```

### TODO

- [ ] Write full documentation of all features

<br><br>


