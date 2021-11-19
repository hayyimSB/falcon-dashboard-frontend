import type { FC } from 'react';
import { Box } from '@material-ui/core';
import { observer } from 'mobx-react';
import Header from 'components/Header';

const MainPage: FC = observer(() => {
  const title = 'Falcon';
  const text = 'Lorem Ipsum';

  return (
    <Box sx={{ pb: 3 }}>
      <Header title={title} text={text} />
    </Box>
  );
});

export default MainPage;
