import React from 'react';

import Avatar from '@material-ui/core/Avatar';
import { THEME } from '../constants/ThemeMUI';

export default function InitialsAvatar() {
  return (
    <div>
      <Avatar
        style={{
          fontWeight: 700,
          backgroundColor: `${THEME.palette.primary.main}`,
          marginRight: '8px',
          marginLeft: '8px',
          width: '45px',
          height: '45px',
        }}
      >
        IN
      </Avatar>
    </div>
  );
}
