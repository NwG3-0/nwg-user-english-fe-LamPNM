import { useWindowSize } from '@hooks/useWindowSize'
import { EVENT_TYPE, EventPointer, TOOL } from '@src/models/stage'
import { drawLines } from '@utils/drawGrid'
import Konva from 'konva'
import { KonvaEventObject } from 'konva/lib/Node'
import { useRouter } from 'next/router'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { Layer, Stage } from 'react-konva'
import { DrawLine } from './DrawLine'

const scaleBy = 1.05
const MAX_SCALE = 3.125
const MIN_SCALE = 0.25

export const Step3 = () => {
  const router = useRouter()

  const { width, height } = useWindowSize()
  const [tool, setTool] = useState<TOOL>(TOOL.PEN)
  const [scale, setScale] = useState<number>(1)
  const [eventPointer, setEventPointer] = useState<EventPointer>({ eventType: null, pointerPosition: { x: 0, y: 0 } })
  const [offset, setOffset] = useState<{ top: number; left: number }>()
  const [color, setColor] = useState<string>('#df4b26')

  const isDrawing = useRef<boolean>(false)
  const gridLayerRef = useRef<Konva.Layer>(null)
  const stageRef = useRef<Konva.Stage>(null)

  useEffect(() => {
    if (gridLayerRef && gridLayerRef.current && stageRef.current) {
      drawLines(gridLayerRef, stageRef.current, width, height)
    }
  }, [width])

  useEffect(() => {
    setEventPointer({ eventType: null, pointerPosition: { x: 0, y: 0 } })
  }, [tool])

  const handleMouseDown = (e: KonvaEventObject<MouseEvent> | KonvaEventObject<TouchEvent>) => {
    isDrawing.current = true
    let pos = e.target.getStage()?.getPointerPosition()
    if (scale !== 1) {
      pos = e.currentTarget.getRelativePointerPosition()
    }
    setEventPointer({ eventType: EVENT_TYPE.MOUSE_DOWN, pointerPosition: { x: pos?.x, y: pos?.y } })
    setOffset({
      top: stageRef.current?.container().offsetTop as number,
      left: stageRef.current?.container().offsetLeft as number,
    })
    console.log('offset', {
      top: stageRef.current?.container().offsetTop,
      left: stageRef.current?.container().offsetLeft,
    })
  }

  const handleMouseMove = (e: KonvaEventObject<MouseEvent> | KonvaEventObject<TouchEvent>) => {
    // no drawing - skipping
    if (!isDrawing.current) {
      return
    }
    const stage = e.target.getStage()
    let point = stage?.getPointerPosition()
    if (scale !== 1) {
      point = e.currentTarget.getRelativePointerPosition()
    }
    setEventPointer({ eventType: EVENT_TYPE.MOUSE_MOVE, pointerPosition: { x: point?.x, y: point?.y } })
  }

  const handleMouseUp = (e: KonvaEventObject<MouseEvent> | KonvaEventObject<TouchEvent>) => {
    isDrawing.current = false
    let point = e.target.getStage()?.getPointerPosition()
    if (scale !== 1) {
      point = e.currentTarget.getRelativePointerPosition()
    }
    setEventPointer({ eventType: EVENT_TYPE.MOUSE_UP, pointerPosition: { x: point?.x, y: point?.y } })
  }

  const handleWheel = (e: KonvaEventObject<WheelEvent>) => {
    e.evt.preventDefault()
    const stage = e.target.getStage()
    // const layer = e.target.g()

    const oldScale = stage?.scaleX()
    const pointer = stage?.getPointerPosition()
    const mousePointTo = {
      x: ((pointer?.x as number) - Number(stage?.x())) / Number(oldScale),
      y: ((pointer?.y as number) - Number(stage?.y())) / Number(oldScale),
    }
    // check is zoom in or zoom out
    let direction = e.evt.deltaY > 0 ? 1 : -1
    // when we zoom on trackpad, e.evt.ctrlKey is true
    // in that case lets revert direction
    if (e.evt.ctrlKey) {
      direction = -direction
    }

    const newScale = direction > 0 ? Number(oldScale) * scaleBy : Number(oldScale) / scaleBy
    if (newScale < MIN_SCALE || newScale > MAX_SCALE) {
      return
    }
    stage?.scale({ x: newScale, y: newScale })
    setScale(newScale)
    const newPos = {
      x: (pointer?.x as number) - mousePointTo.x * newScale,
      y: (pointer?.y as number) - mousePointTo.y * newScale,
    }
    stage?.position(newPos)

    drawLines(gridLayerRef, stage, width, height)
  }

  // const onSetDefaultTool = () => setTool(TOOL.POINTER)

  const onChangeColor = (e: ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value)
  }

  const onBack = () => {
    void router.back()
  }

  return (
    <div className="w-full py-[100px] mx-auto">
      <button type="button" className=" hover:underline" onClick={onBack}>
        Back
      </button>
      <p className="text-center text-3xl mb-8">Draw</p>

      <select value={tool} onChange={(e) => setTool(e.target.value as TOOL)}>
        <option value={TOOL.POINTER}>Pointer</option>
        <option value={TOOL.PEN}>Pen</option>
        <option value={TOOL.ERASER}>Eraser</option>
      </select>
      <input type="color" value={color} onChange={onChangeColor} />
      <div>
        <Stage
          ref={stageRef}
          width={width}
          height={height}
          onMouseDown={handleMouseDown}
          onMousemove={handleMouseMove}
          onMouseup={handleMouseUp}
          onTouchStart={handleMouseDown}
          onTouchMove={handleMouseMove}
          onTouchEnd={handleMouseUp}
          onWheel={handleWheel}
        >
          <Layer ref={gridLayerRef} draggable={false} x={0} y={0} />
          <DrawLine eventPointer={eventPointer} scale={scale} tool={tool} color={color} />
        </Stage>
      </div>
    </div>
  )
}
