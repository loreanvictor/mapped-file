import { isRange } from './range'
import { File } from './file'


export interface Location {
  file: File
  range: Range
}


export function isLocation(something: any): something is Range {
  return !!something
    && !!something.range && isRange(something.range)
    && !!something.file && something.file instanceof File
}
