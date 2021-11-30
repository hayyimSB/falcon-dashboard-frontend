import type { FC } from 'react';
import { Box, Typography } from '@material-ui/core';
import { observer } from 'mobx-react';
import styles from './styles';

interface PropTypes {
  title: string;
}

const Header: FC<PropTypes> = observer((props) => {
  const classes = styles();
  const { title } = props;

  return (
    <Box className={classes.box}>
      <Typography color='textPrimary' variant='h4'>
        {title}
      </Typography>
    </Box>
  );
});

export default Header;
