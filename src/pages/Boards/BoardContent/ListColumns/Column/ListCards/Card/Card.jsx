import GroupIcon from '@mui/icons-material/Group'
import CommentIcon from '@mui/icons-material/Comment'
import AttachmentIcon from '@mui/icons-material/Attachment'
import { Card as MuiCard} from '@mui/material'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

function Card( { temporaryHideMedia } ) {
  if (temporaryHideMedia) {
    return (
      <MuiCard sx={{
        cursor:'pointer',
        boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
        overflow:'unset'
      }}>
        <CardContent sx={{ p:1.5, '&:last-child': { p:1.5 } }}>
          <Typography>
            Card 01
          </Typography>
        </CardContent>
      </MuiCard>
    )
  }
  return (
    <MuiCard sx={{
      cursor:'pointer',
      boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
      overflow:'unset'
    }}>
      <CardMedia
        sx={{ height: 140 }}
        image="https://scontent.fdad2-1.fna.fbcdn.net/v/t39.30808-6/481226049_1656448978278026_4222112501929874722_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeFJj7gXSor1cyjb1-zXn6Qxqtqxrp9V1quq2rGun1XWq69T0uSsbwj7AmZOZuej0YmOpBB4zYFI_a9q1zo_KiJ6&_nc_ohc=xrYqUfVmnUoQ7kNvwGM6wtS&_nc_oc=Adm5RmEqh3_fafKrE8AiXxZ5SZ5ncETqiYqUOe-fXI6Oc6mhkr5CiPTZ0MzJokbPEbp0g4fwdl8bYRDFVoFQP7rb&_nc_zt=23&_nc_ht=scontent.fdad2-1.fna&_nc_gid=FaGb4LqY90Ip0EMVGGJzJw&oh=00_Afg79JzkKj-WVLNnQ9nH1YgFxrYjuqavqgiNQiwBNuPPlw&oe=6931FAA0"
        title="green iguana"
      />
      <CardContent sx={{ p:1.5, '&:last-child': { p:1.5 } }}>
        <Typography>
          Tran Quang Thong
        </Typography>
      </CardContent>
      <CardActions sx={{ p:'0 4px 8px 4px' }}>
        <Button size="small" startIcon={<GroupIcon />}>20</Button>
        <Button size="small" startIcon={<CommentIcon />}>15</Button>
        <Button size="small" startIcon={<AttachmentIcon />}>10</Button>
      </CardActions>
    </MuiCard>
  )
}

export default Card