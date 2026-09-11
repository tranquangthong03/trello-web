import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import { mapOrder } from '~/ultis/sorts'
import {
  DndContext,
  PointerSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragOverlay,
  defaultDropAnimationSideEffects
} from '@dnd-kit/core'
import { useEffect, useState } from 'react'
import { arrayMove } from '@dnd-kit/sortable'

import Column from './ListColumns/Column/Column'
import Card from './ListColumns/Column/ListCards/Card/Card'

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
  CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD'
}
function BoardContent({ board }) {
  // Yêu cầu chuột di chuyển 10px thì mới kích hoạt sự kiện kéo thả, fix trường hợp click gọi event
  // const pointerSensor = useSensor(PointerSensor, { activationConstraint: { distance: 10 } })
  const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } })
  const touchSensor = useSensor(TouchSensor, { activationConstraint: { delay:250, tolerance: 5 } })
  const sensors = useSensors(mouseSensor, touchSensor)
  const [orderedColumns, setOrderedColumns] = useState([])
  const [activeDragItemId, setActiveDragItemId] = useState(null)
  const [activeDragItemType, setActiveDragItemType] = useState(null)
  const [activeDragItemData, setActiveDragItemData] = useState(null)
  useEffect(() => {
    setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])

  const findColumnByCardId = (cardId) => {
    return orderedColumns.find(column => column.cards?.some(card => card._id === cardId))
  }
  const handleDragStart = (event) => {
    setActiveDragItemId(event?.active?.id)
    setActiveDragItemType(event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN)
    setActiveDragItemData(event?.active?.data?.current)
  }


  const handleDragOver = (event) => {
    const { active, over } = event
    const activeData = active?.data?.current

    if (!active || !over || !activeData?.columnId) return

    const activeDraggingCardId = active.id
    const overCardId = over.id

    // Tìm 2 column theo cardId
    const activeColumn = findColumnByCardId(activeDraggingCardId)
    const overColumn = orderedColumns.find(column =>
      column._id === overCardId || column.cards?.some(card => card._id === overCardId)
    )
    //activeColumn có thể undefind do hàm findColumnByCardId không thể hoạt động được
    if (!activeColumn || !overColumn) return

    // Xử lý trường hợp kéo thả giữa 2 column khác nhau
    if (activeColumn._id !== overColumn._id) {
      console.log('Kéo thả card ở 2 column khác nhau')
    }
  }

  const handleDragEnd = (event) => {
    const { active, over } = event

    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      if (active && over) {
        setOrderedColumns((currentColumns) => {
          const sourceColumnIndex = currentColumns.findIndex(column =>
            column.cards?.some(card => card._id === active.id)
          )
          const targetColumnIndex = currentColumns.findIndex(column =>
            column._id === over.id || column.cards?.some(card => card._id === over.id)
          )

          if (sourceColumnIndex === -1 || targetColumnIndex === -1) return currentColumns

          const sourceColumn = currentColumns[sourceColumnIndex]
          const targetColumn = currentColumns[targetColumnIndex]
          const activeCard = sourceColumn.cards.find(card => card._id === active.id)

          if (!activeCard) return currentColumns

          if (sourceColumnIndex === targetColumnIndex) {
            const oldIndex = sourceColumn.cards.findIndex(card => card._id === active.id)
            const newIndex = targetColumn.cards.findIndex(card => card._id === over.id)

            if (newIndex === -1 || oldIndex === newIndex) return currentColumns

            const reorderedCards = arrayMove(sourceColumn.cards, oldIndex, newIndex)
            const updatedColumns = [...currentColumns]
            updatedColumns[sourceColumnIndex] = {
              ...sourceColumn,
              cards: reorderedCards,
              cardOrderIds: reorderedCards.map(card => card._id)
            }
            return updatedColumns
          }

          const sourceCards = sourceColumn.cards.filter(card => card._id !== active.id)
          const targetCards = [...targetColumn.cards]
          const overIndex = targetCards.findIndex(card => card._id === over.id)
          const insertIndex = overIndex === -1 ? targetCards.length : overIndex
          targetCards.splice(insertIndex, 0, {
            ...activeCard,
            columnId: targetColumn._id
          })

          return currentColumns.map((column, index) => {
            if (index === sourceColumnIndex) {
              return {
                ...column,
                cards: sourceCards,
                cardOrderIds: sourceCards.map(card => card._id)
              }
            }
            if (index === targetColumnIndex) {
              return {
                ...column,
                cards: targetCards,
                cardOrderIds: targetCards.map(card => card._id)
              }
            }
            return column
          })
        })
      }

      setActiveDragItemId(null)
      setActiveDragItemType(null)
      setActiveDragItemData(null)
      return
    }

    if (over && over.id !== active.id) {
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

    setActiveDragItemId(null)
    setActiveDragItemType(null)
    setActiveDragItemData(null)
  }

  const handleDragCancel = () => {
    setActiveDragItemId(null)
    setActiveDragItemType(null)
    setActiveDragItemData(null)
  }

  const dropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: '0.5'
        }
      }
    })
  }
  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
      sensors={sensors}
    >
      <Box sx={{
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
        width: '100%',
        height: (theme) => theme.trello.boardContentHeight,
        p: '10px 0'
      }}>
        <ListColumns columns={orderedColumns}/>
        <DragOverlay dropAnimation={dropAnimation}>
          {!activeDragItemType && null}
          {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) && <Column column={activeDragItemData}/>}
          {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) && <Card card={activeDragItemData}/>}
        </DragOverlay>
      </Box>
    </DndContext>

  )
}

export default BoardContent
