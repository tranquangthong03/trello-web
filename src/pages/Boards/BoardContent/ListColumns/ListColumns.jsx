import Box from '@mui/material/Box'
import Column from './Column/Column'
import TextField from '@mui/material/TextField'
import { Button } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import AddBoxIcon from '@mui/icons-material/AddBox'
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'
import { useState } from 'react'
function ListColumns({ columns, activeDragItemId, activeDragItemData, cardDropPreview }) {
  const [openNewColumnForm, setOpenNewColumnForm] = useState(false)
  const toggleOpenNewColumnForm = ( () => {
    setOpenNewColumnForm(!openNewColumnForm)
    return
  } )
  const [newColumnTitle, setNewColumnTitle] = useState('')
  const addNewColumn = () => {
    if (!newColumnTitle) {
      console.log('Nhập titile!')
      return
    }
    // console.log(newColumnTitle)
    // Gọi API ở đâu

    // Đóng trạng thái thêm column mới và clear thẻ input
    toggleOpenNewColumnForm()
    setNewColumnTitle('')
  }
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
        {!openNewColumnForm
          ? <Box onClick={toggleOpenNewColumnForm} sx={{
            minWidth: '250px',
            maxWidth: '250px',
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
          : <Box sx={{
            minWidth: '250px',
            maxWidth: '250px',
            mx: 2,
            p: 1,
            borderRadius: '6px',
            height: 'fit-content',
            bgcolor: '#ffffff3d',
            display: 'flex',
            flexDirection: 'column',
            gap: 1
          }}>
            <TextField
              label="Enter column title..."
              type="text"
              size='small'
              autoFocus
              value={newColumnTitle}
              onChange={(e) => {setNewColumnTitle(e.target.value)}}
              sx={{
                minWidth: '120px',
                maxWidth: '250px',
                '& label': {
                  color: 'white'
                },
                '& input': {
                  color: 'white'
                },
                '& label.Mui-focused': {
                  color: 'white'
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'white'
                  },
                  '&:hover fieldset': {
                    borderColor: 'white'
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'white'
                  }
                }
              }}
            />
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}>
              <Button
                onClick={addNewColumn}
                variant='contained'
                color = 'success'
                size = 'medium'
                sx = {{
                  boxShadow: 'none',
                  border: '0.5px solid',
                  borderColor: (theme) => theme.palette.success.main,
                  '&:hover': { bgcolor: (theme) => theme.palette.success.main }
                }}
              >
                Add Column
              </Button>
              <CloseIcon
                fontSize='small'
                sx={{
                  color: 'white',
                  cursor: 'pointer',
                  '&:hover': {
                    color: (theme) => theme.palette.warning.light
                  }
                }}
                onClick={toggleOpenNewColumnForm}
              />
            </Box>
          </Box>
        }
      </Box>
    </SortableContext>

  )
}

export default ListColumns