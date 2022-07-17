import { Position, isPosition, serializePosition, deserializePosition } from './position'


export interface Range {
  start: Position
  end: Position
}


export function isRange(something: any): something is Range {
  return !!something && isPosition(something.start) && isPosition(something.end)
}


export function serializeRange(range: Range): string {
  return `${serializePosition(range.start)}-${serializePosition(range.end)}`
}


export function deserializeRange(serialized: string): Range {
  const [start, end, ...rest] = serialized.split('-')

  if (!start || !end || rest.length > 0) {
    throw new Error(`Invalid range: ${serialized}`)
  }

  return {
    start: deserializePosition(start),
    end: deserializePosition(end)
  }
}
