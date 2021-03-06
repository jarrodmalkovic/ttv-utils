import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Divider, Typography } from '@material-ui/core';

export default function DemoButton({ type }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button type='outline' onClick={handleClickOpen}>
        View Demo
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>
          <Typography variant='h6'>{type} Demo</Typography>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <Typography paragraph> Yo</Typography>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button onClick={handleClose} color='primary' autoFocus>
            GOT IT
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
