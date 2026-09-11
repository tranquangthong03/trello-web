import Box from '@mui/material/Box'
import Column from './Column/Column'
import { Button } from '@mui/material'
import AddBoxIcon from '@mui/icons-material/AddBox'
import {SortableContext, horizontalListSortingStrategy} from '@dnd-kit/sortable'
function ListColumns({ columns, activeDragItemId, activeDragItemData, cardDropPreview }) {
  return (
    <SortableContext items={columns?.map(column => column._id)} strategy={horizontalListSortingStrategy}>
      <Box sx={{
        bgcolor: 'inherit',
        width: '100%',
        height: '100%',
        display: 'flex',
        overflowX: 'auto',
        overflowY: 'hidden',
        '&::-webkit-scrollbar-track': { m: 2 }
      }}>
        {columns?.map(column => (
          <Column
            key={column._id}
            column={column}
            activeDragItemId={activeDragItemId}
            activeDragItemData={activeDragItemData}
            cardDropPreview={cardDropPreview}
          />
        ))}


        {/* Box add new column */}
        <Box sx={{
          minWidth: '200px',
          maxWidth: '200px',
          mx: 2,
          borderRadius: '6px',
          height: 'fit-content',
          bgcolor: '#ffffff3d'
        }}>
          <Button startIcon={<AddBoxIcon />}
            sx={{
              color: 'white',
              width: '100%',
              display: 'flex',
              justifyContent: 'flex-start',
              pl: 2.5,
              py: 1
            }}
          >
            Add new column
          </Button>
        </Box>
      </Box>
    </SortableContext>

  )
}

export default ListColumns