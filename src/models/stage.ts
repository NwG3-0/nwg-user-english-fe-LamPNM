export enum TOOL {
  PEN = 'PEN',
  ERASER = 'ERASER',
  POINTER = 'POINTER',
}
export enum EVENT_TYPE {
  MOUSE_UP = 'MOUSE_UP',
  MOUSE_DOWN = 'MOUSE_DOWN',
  MOUSE_MOVE = 'MOUSE_MOVE',
}
export interface PointerPosition {
  x: number | undefined
  y: number | undefined
}

export interface EventPointer {
  eventType: EVENT_TYPE | null
  pointerPosition: PointerPosition
}
