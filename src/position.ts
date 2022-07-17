export interface Position {
  line: number
  character: number
}


export function isPosition(something: any): something is Position {
  return !!something && typeof something.line === 'number' && typeof something.character === 'number'
}


export function serializePosition(position: Position): string {
  return `${position.line}:${position.character}`
}


export function deserializePosition(serialized: string): Position {
  const [l, c, ...rest] = serialized.split(':')

  if (!l || !c || rest.length > 0) {
    throw new Error(`Invalid position: ${serialized}`)
  }

  const line = Number(l)
  const character = Number(c)

  if (isNaN(line) || isNaN(character)) {
    throw new Error(`Invalid position: ${serialized}`)
  }

  return { line, character }
}
