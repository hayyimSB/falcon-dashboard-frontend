import type { FC } from 'react';
import { Box, Typography, Card } from '@material-ui/core';
import { observer } from 'mobx-react';
import styles from './styles';

interface PropTypes {
  title: string;
  text: string;
}

const Header: FC<PropTypes> = observer((props) => {
  const classes = styles();
  const { title, text } = props;

  return (
    <>
      <Box className={classes.box}>
        <Typography color='textPrimary' variant='h4'>
          {title}
        </Typography>
      </Box>
      <Card color='primary' className={classes.text}>
        {text}
      </Card>
    </>
  );
});

export default Header;
