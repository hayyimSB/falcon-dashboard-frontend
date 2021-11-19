import { useContext } from 'react';
import UISettingsContext from 'contexts/SettingsContext';
import type { UISettingsContextValue } from 'contexts/SettingsContext';

const useSettings = (): UISettingsContextValue => useContext(UISettingsContext);

export default useSettings;
