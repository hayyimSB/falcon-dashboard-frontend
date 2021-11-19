import { useContext } from 'react';

import StoresContext from 'stores/context';
import StoresType from 'stores/types';

export const useStores = (): StoresType => useContext(StoresContext);
