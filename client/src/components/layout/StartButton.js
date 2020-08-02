import React from 'react';

import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';

const StartButton = ({ onSubmit, running, text }) => {
  return (
    <div>
      {running ? (
        <Button onClick={onSubmit} variant='contained'>
          {text}
        </Button>
      ) : (
        <Tooltip title='You must start the bot before using any services on TTVUtils'>
          <span>
            <Button onClick={onSubmit} variant='contained' disabled>
              {text}
            </Button>
          </span>
        </Tooltip>
      )}
    </div>
  );
};

export default StartButton;
