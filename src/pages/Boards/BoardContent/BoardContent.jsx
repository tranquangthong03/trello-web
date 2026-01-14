import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import { mapOrder } from '~/ultis/sorts'
import {
  DndContext,
  PointerSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import { useEffect, useState } from 'react'
import { arrayMove } from '@dnd-kit/sortable'
function BoardContent({ board }) {
  // Yêu cầu chuột di chuyển 10px thì mới kích hoạt sự kiện kéo thả, fix trường hợp click gọi event
  // const pointerSensor = useSensor(PointerSensor, { activationConstraint: { distance: 10 } })
  const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } })
  const touchSensor = useSensor(TouchSensor, { activationConstraint: { delay:250, tolerance: 5 } })
  const sensors = useSensors(mouseSensor, touchSensor)
  const [orderedColumns, setOrderedColumns] = useState([])
  useEffect(() => {
    setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])
  const handleDragEnd = (event) => {
    const { active, over } = event // active: item đang kéo, over: item sẽ bị thay thế
    // Nếu kéo ra ngoài (over == null) thì return
    if (!over) return
    if (over.id != active.id) {
      //Lấy vị trí cũ từ active
      const oldIndex = orderedColumns.findIndex( c => c._id === active.id)
      // Lấy vị trí mới
      const newIndex = orderedColumns.findIndex( c => c._id === over.id)
      // Dùng hàm arrayMove để sắp xếp lại mảng
      const dndOrderedColumns = arrayMove(orderedColumns, oldIndex, newIndex)
      // const dndOrderedColumnsIds = dndOrderedColumns.map( c => c._id)
      // Cập nhật lại state
      setOrderedColumns(dndOrderedColumns)
    }
  }
  return (
    <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
      <Box sx={{
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
        width: '100%',
        height: (theme) => theme.trello.boardContentHeight,
        p: '10px 0'
      }}>
        <ListColumns columns={orderedColumns}/>
      </Box>
    </DndContext>

  )
}

export default BoardContent
