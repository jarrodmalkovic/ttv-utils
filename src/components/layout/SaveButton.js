import React from 'react';

import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';

const StartButton = ({ onSubmit, running, changes }) => {
  return (
    <div>
      {running && changes && (
        <Button onClick={onSubmit} variant='contained'>
          Save Changes
        </Button>
      )}
      {running && !changes && (
        <Tooltip title='You must make changes before saving your settings'>
          <span>
            <Button onClick={onSubmit} variant='contained' disabled>
              Save Changes
            </Button>
          </span>
        </Tooltip>
      )}
      {!running && (
        <Tooltip title='You must start the bot before using any services on TTVUtils'>
          <span>
            <Button onClick={onSubmit} variant='contained' disabled>
              Save Changes
            </Button>
          </span>
        </Tooltip>
      )}
    </div>
  );
};

export default StartButton;
