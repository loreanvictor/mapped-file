import { Position, serializePosition } from './position'
import { Range, isRange, serializeRange } from './range'


export class File {
  readonly lines: string[]

  constructor(
    readonly name: string,
    readonly contents: string
  ) {
    this.lines = contents.split('\n')
  }

  position(offset: number): Position {
    if (!this.inRange(offset)) {
      throw new RangeError(`Offset ${offset} is out of range`)
    }

    let cursor = 0

    for (let i = 0; i < this.lines.length; i++) {
      const line = this.lines[i]!
      if (cursor + line.length > offset) {
        const res = {
          line: i,
          character: offset - cursor
        }

        // CORRECTION FOR NEWLINE CHARACTERS
        if (res.character === -1 && i !== 0) {
          res.line -= 1
          res.character = this.lines[res.line]!.length
        }

        return res
      }

      cursor += line.length + 1
    }

    // istanbul ignore next: This should never happen
    throw new RangeError(`Offset ${offset} is out of range`)
  }

  offset(position: Position): number {
    if (!this.inRange(position)) {
      throw new RangeError(`Position ${serializePosition(position)} is out of range`)
    }

    return this.lines
      .slice(0, position.line)
      .reduce((acc, l) => acc + l.length + 1, 0) + position.character
  }

  range(
    range: Range,
    { surrounding, highlight }: { surrounding?: number, highlight?: (c: string) => string} = {}
  ) {
    if (!this.inRange(range)) {
      throw new RangeError(`Range ${serializeRange(range)} is out of range`)
    }

    surrounding = surrounding || 0
    highlight = highlight || (c => c)

    const start = range.start.line - surrounding
    const end = range.end.line + surrounding

    const result: {[lineno: number]: {content: string, surround: boolean}} = {}

    for (let i = Math.max(0, start); i <= Math.min(end, this.lines.length - 1); i++) {
      const line = this.lines[i]!
      const lineno = i
      const surround = i < range.start.line || i > range.end.line
      let content = ''

      if (lineno === range.start.line && lineno === range.end.line) {
        content =
          line.slice(0, range.start.character) +
          highlight(line.slice(range.start.character, range.end.character)) +
          line.slice(range.end.character)
      } else if (lineno === range.start.line) {
        content = line.slice(0, range.start.character) + highlight(line.slice(range.start.character))
      } else if (lineno === range.end.line) {
        content = highlight(line.slice(0, range.end.character)) + line.slice(range.end.character)
      } else if (lineno > range.start.line && lineno < range.end.line) {
        content = highlight(line)
      } else {
        content = line
      }

      result[lineno] = { content, surround }
    }

    return result
  }

  inRange(target: number | Position | Range) {
    if (typeof target === 'number') {
      return target >= 0 && target < this.contents.length
    } else if (isRange(target)) {
      return this.inRange(target.start) && this.inRange(target.end)
    } else {
      return target.line >= 0 && target.line < this.lines.length &&
        // Because of the newline character, we can accept one index further than the line length
        target.character >= 0 && target.character <= this.lines[target.line]!.length
    }
  }
}
