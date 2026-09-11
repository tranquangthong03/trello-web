import GroupIcon from '@mui/icons-material/Group'
import CommentIcon from '@mui/icons-material/Comment'
import AttachmentIcon from '@mui/icons-material/Attachment'
import { Card as MuiCard } from '@mui/material'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
function Card({ card, isOverlay = false }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({
    id: card._id,
    data: {...card}
  }) // Id của card
  const dndKitCardStyles = {
    touchAction: isOverlay ? 'none' : 'none',
    // Nếu sử dụng CSS.Transform như doc sẽ bị lỗi stretch
    transform: isOverlay ? undefined : CSS.Translate.toString(transform),
    transition,
    opacity: isOverlay ? 0.85 : isDragging ? 0.5 : undefined,
    border: isDragging && !isOverlay ? '1px solid #2ecc71' : undefined,
    boxShadow: isOverlay ? '0 8px 24px rgba(0, 0, 0, 0.3)' : undefined
  }
  const shouldShowCardActions = () => {
    return !!card?.memberIds?.length || !!card?.comments?.length || !!card?.attachments?.length
  }
  return (
    <MuiCard
      ref={isOverlay ? undefined : setNodeRef}
      style={dndKitCardStyles}
      {...(isOverlay ? {} : attributes)}
      {...(isOverlay ? {} : listeners)}
      sx={{
        cursor: 'pointer',
        boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
        overflow: 'unset'
      }}
    >
      {card?.cover &&
        <CardMedia
          sx={{ height: 140 }}
          image={card?.cover}
          title={card?.title}
        />
      }
      <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
        <Typography>{card?.title}</Typography>
      </CardContent>
      {/* Nếu đủ điều kiện thì mới render ra CardActions */}
      {shouldShowCardActions() &&
        <CardActions sx={{ p: '0 4px 8px 4px' }}>
          {!!card?.memberIds?.length &&
            <Button size="small" startIcon={<GroupIcon />}>
              {card?.memberIds?.length || 0}
            </Button>
          }
          {!!card?.comments?.length &&
            <Button size="small" startIcon={<CommentIcon />}>
              {card?.comments.length || 0}
            </Button>
          }
          {!!card?.attachments?.length &&
            <Button size="small" startIcon={<AttachmentIcon />}>
              {card?.attachments.length || 0}
            </Button>
          }
        </CardActions>
      }
    </MuiCard>
  )
}
export default Card
