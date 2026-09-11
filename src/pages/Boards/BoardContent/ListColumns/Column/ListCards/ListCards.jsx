import Box from '@mui/material/Box'
import Card from './Card/Card'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { Fragment } from 'react'
function ListCards({ cards, activeDragItemId, activeDragItemData, cardDropPreview, columnId }) {
  const renderDropPreview = (index) => {
    if (cardDropPreview?.columnId !== columnId || cardDropPreview.index !== index) return null

    return (
      <Box
        key={`drop-preview-${columnId}-${index}`}
        sx={{
          minHeight: 48,
          border: '2px dashed rgba(255, 255, 255, 0.9)',
          borderRadius: 1,
          bgcolor: 'rgba(255, 255, 255, 0.3)',
          backgroundImage: activeDragItemData?.cover ? `url(${activeDragItemData.cover})` : 'none',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          color: '#1f2937',
          display: 'flex',
          alignItems: 'center',
          px: 1.5,
          opacity: 0.55
        }}
      >
        {activeDragItemData?.title}
      </Box>
    )
  }

  return (
    <SortableContext items={cards?.map(card => card._id)} strategy={verticalListSortingStrategy}>
      <Box sx={{
        p: '0 5px',
        m: '0 5px',
        display:'flex',
        flexDirection:'column',
        gap:1,
        overflowX:'hidden',
        overflowY:'auto',
        maxHeight: (theme) => `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)} - ${theme.trello.columnFooterHeight} - ${theme.trello.columnHeaderHeight})`,
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: '#ced0da'
        },
        '&::-webkit-scrollbar-thumb:hover': {
          backgroundColor: '#bfc2cf'
        }
      }}>
        {cards?.map((card, index) => {
          return (
            <Fragment key={card._id}>
              {renderDropPreview(index)}
              {card._id !== activeDragItemId && <Card card={card}/>} 
            </Fragment>
          )
        })}
        {renderDropPreview(cards?.length || 0)}
      </Box>
    </SortableContext>
  )
}

export default ListCards