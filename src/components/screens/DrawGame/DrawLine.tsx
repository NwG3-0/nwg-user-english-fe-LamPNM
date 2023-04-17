import React, { useEffect, useState } from 'react'
import { Group, Layer, Line, Text } from 'react-konva'
// import { SOCKET_IO_EVENTS } from '@src/models/event'
import { EventPointer, EVENT_TYPE, TOOL } from '@src/models/stage'
// import { SocketContext } from '@utils/context/SocketContext'

export interface Props {
  eventPointer: EventPointer
  scale: number
  tool: TOOL
  color: string
}

interface Line {
  tool: TOOL
  color: string
  points: number[]
}

// interface PointArray {
//   points: number[]
// }

export const DrawLine: React.FC<Props> = React.memo(({ eventPointer, scale, tool, color }) => {
  // const { socket } = useContext(SocketContext)
  const [lines, setLines] = useState<Line[]>([])

  // useEffect(() => {
  //   socket.on(SOCKET_IO_EVENTS.ON_DRAW_LINE_END, ({ points }: PointArray) => {
  //     setLines((prev) => [...prev, { tool, points: [...points] }])
  //   })

  //   return () => {
  //     socket.off(SOCKET_IO_EVENTS.ON_DRAW_LINE_END)
  //   }
  // }, [])

  useEffect(() => {
    if (eventPointer.eventType === null || tool !== TOOL.PEN) {
      return
    }
    if (eventPointer.eventType === EVENT_TYPE.MOUSE_DOWN) {
      const { x, y } = eventPointer.pointerPosition
      setLines([...lines, { tool, color, points: [x!, y!] }])
    } else if (eventPointer.eventType === EVENT_TYPE.MOUSE_MOVE) {
      const { x, y } = eventPointer.pointerPosition
      const lastLine = lines[lines.length - 1]
      // add point
      lastLine.points = lastLine.points.concat([x!, y!])
      // socket.emit('draw', { x: point?.x, y: point?.y })

      // replace last
      lines.splice(lines.length - 1, 1, lastLine)
      setLines([...lines.slice(0, lines.length - 1), lastLine])
    } else {
      // socket.emit(SOCKET_IO_EVENTS.DRAW_LINE_END, { points: lines[lines.length - 1].points })
    }
  }, [eventPointer, color])

  return (
    <Layer>
      <Text text="Just start drawing" x={5} y={30} fontSize={20} />
      <Group>
        {lines.map((line, i) => (
          <Line
            key={i}
            points={line.points}
            stroke={line.color}
            strokeWidth={5 * scale}
            tension={0.5}
            lineCap="round"
            lineJoin="round"
            globalCompositeOperation={line.tool === TOOL.ERASER ? 'destination-out' : 'source-over'}
          />
        ))}
      </Group>
    </Layer>
  )
})
