import React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import { Avatar } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import PersonAdd from '@mui/icons-material/PersonAdd'
import Settings from '@mui/icons-material/Settings'
import Logout from '@mui/icons-material/Logout'
function Profile() {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <Box>
      <Tooltip title="Account settings">
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ padding: 0 }}
          aria-controls={open ? 'basic-menu-profile' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <Avatar
            src='data:image/jpeg;base64,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'
            alt='Profile'
            sx={{ width: 34, height: 34 }}
          />
        </IconButton>
      </Tooltip>
      <Menu
        id="basic-menu-profile"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            'aria-labelledby': 'basic-button-profile'
          }
        }}
      >
        <MenuItem>
          <Avatar sx={{ width:'28px', height:'28px', mr:2 }}/> Profile
        </MenuItem>
        <MenuItem>
          <Avatar sx={{ width:'28px', height:'28px', mr:2 }}/> My account
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </Box>
  )
}

export default Profile