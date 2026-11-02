import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {
  ArrowBack as ArrowBackIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  MoveToInbox as InboxIcon,
  Mail as MailIcon,
} from '@mui/icons-material';
import ShowCart from './TabsComponent/ShowCart';

export default function SwipeableTemporaryDrawer() {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const [cartDrawer, setCartDrawer] = React.useState({
    open: false,
    anchor: 'right',
  });
  const [cartData,setIsCartData] = React.useState(false);
  const [menuAnchor, setMenuAnchor] = React.useState('right');

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState((currentState) => ({ ...currentState, [anchor]: open }));
  };

  const openCartDrawer = (anchor) => (event) => {
    event.stopPropagation();
    setState((currentState) => ({ ...currentState, [anchor]: false }));
    setCartDrawer({ open: true, anchor });
  };

  const returnToMenu = () => {
    setCartDrawer((currentDrawer) => ({ ...currentDrawer, open: false }));
    setState((currentState) => ({
      ...currentState,
      [cartDrawer.anchor]: true,
    }));
  };

  const returnToMainMenu= ()=>{
      setCartDrawer((currentDrawer) => ({ ...currentDrawer, open: false }));
    setState((currentState) => ({
      ...currentState,
      [cartDrawer.anchor]: false,
    }));
  }

  const openShowCart = (anchor) => (event) => {
    event.stopPropagation();
    setState((currentState) => ({ ...currentState, [anchor]: false }));
    setMenuAnchor(anchor);
    setIsCartData(true);
  };

  const returnFromShowCart = () => {
    setIsCartData(false);
    setState((currentState) => ({ ...currentState, [menuAnchor]: true }));
  };

  if (cartData) {
    return <ShowCart onBack={returnFromShowCart} />;
  }
  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
         {/* {onBack && (
                <IconButton onClick={onBack} aria-label="Back to menu">
                  <ArrowBackIcon />
                </IconButton>
              )} */}
                <ListItemButton onClick={returnToMainMenu} aria-label="Back to menu">
                <ListItemIcon>
                  <ArrowBackIcon />
                </ListItemIcon>
                <ListItemText primary="Back" />
              </ListItemButton>
        {['Shopping Cart', 'Add To WishList', 'Category', 'Rating'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton
              onClick={text === 'Shopping Cart' ? openShowCart(anchor) : undefined}
            >
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', gap: 1.5, p: 2 }}>
      {['left', 'right'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button
            variant="outlined"
            startIcon={anchor === 'left' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            onClick={toggleDrawer(anchor, true)}
            sx={{
              borderRadius: 2,
              px: 2,
              py: 1,
              textTransform: 'capitalize',
              fontWeight: 600,
              borderColor: 'divider',
              bgcolor: 'background.paper',
              boxShadow: 1,
              '&:hover': {
                boxShadow: 2,
                bgcolor: 'action.hover',
              },
            }}
          >
            {anchor}
          </Button>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}

          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
      <SwipeableDrawer
        anchor={cartDrawer.anchor}
        open={cartDrawer.open}
        onClose={() =>
          setCartDrawer((currentDrawer) => ({ ...currentDrawer, open: false }))
        }
        onOpen={() =>
          setCartDrawer((currentDrawer) => ({ ...currentDrawer, open: true }))
        }
      >
        <Box sx={{ width: 250 }} role="presentation">
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={returnToMenu} aria-label="Back to menu">
                <ListItemIcon>
                  <ArrowBackIcon />
                </ListItemIcon>
                <ListItemText primary="Back" />
              </ListItemButton>
            </ListItem>
            {['Item 1', 'Item 2', 'Item 3'].map((item) => (
              <ListItem key={item}>
                <ListItemText primary={item} />
              </ListItem>
            ))}
          </List>
        </Box>
      </SwipeableDrawer>
    </Box>
  );
}