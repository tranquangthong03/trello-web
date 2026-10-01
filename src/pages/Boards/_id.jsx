import { useEffect, useState } from 'react'
import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar/AppBar.jsx'
import BoardBar from './BoardBar'
import BoardContent from './BoardContent/BoardContent'
import { mockData } from '~/apis/mock-data.js'
import { fetchBoardDetailsAPI } from '~/apis'
function Board() {
  const [board, setBoard] = useState(null)
  useEffect(() => {
    const boardId = '6ab8b091295add1bc9196dfd'
    // Call api
    fetchBoardDetailsAPI(boardId).then((board) => {
      setBoard(board)
    })
  }, [])
  return (
    <Container disableGutters maxWidth="false" sx={{ height: '100vh' }}>
      <AppBar board={board} />
      <BoardBar board={board} />
      <BoardContent board={board} />
    </Container>
  )
}

export default Board
