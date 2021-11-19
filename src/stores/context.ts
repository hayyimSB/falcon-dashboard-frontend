import { createContext } from 'react';

import stores from './index';

const StoresContext = createContext<typeof stores>(stores);

export default StoresContext;
