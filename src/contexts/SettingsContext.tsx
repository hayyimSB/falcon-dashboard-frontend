import { createContext, useEffect, useState } from 'react';
import type { FC, ReactNode } from 'react';
import PropTypes from 'prop-types';
import { THEMES } from '../constants';

interface UISettings {
  compact?: boolean;
  responsiveFontSizes?: boolean;
  roundedCorners?: boolean;
  theme?: string;
}

export interface UISettingsContextValue {
  uiSettings: UISettings;
  saveSettings: (update: UISettings) => void;
}

interface SettingsProviderProps {
  children?: ReactNode;
}

const initialSettings: UISettings = {
  compact: true,
  responsiveFontSizes: true,
  roundedCorners: true,
  theme: THEMES.DARK,
};

export const restoreSettings = (): UISettings | null => {
  let uiSettings = null;

  try {
    const storedData: string | null = window.localStorage.getItem('uiSettings');

    if (storedData) {
      uiSettings = JSON.parse(storedData);
    } else {
      uiSettings = {
        compact: true,
        responsiveFontSizes: true,
        roundedCorners: true,
        theme: window.matchMedia('(prefers-color-scheme: dark)').matches
          ? THEMES.DARK
          : THEMES.LIGHT,
      };
    }
  } catch (err) {
    console.error(err);
    // If stored data is not a strigified JSON this will fail,
    // that's why we catch the error
  }

  return uiSettings;
};

export const storageSettings = (uiSettings: UISettings): void => {
  window.localStorage.setItem('uiSettings', JSON.stringify(uiSettings));
};

const UISettingsContext = createContext<UISettingsContextValue>({
  uiSettings: initialSettings,
  saveSettings: () => {},
});

export const UISettingsProvider: FC<SettingsProviderProps> = (props) => {
  const { children } = props;
  const [uiSettings, setSettings] = useState<UISettings>(initialSettings);

  useEffect(() => {
    const restoredSettings = restoreSettings();

    if (restoredSettings) {
      setSettings(restoredSettings);
    }
  }, []);

  const saveSettings = (updatedSettings: UISettings): void => {
    setSettings(updatedSettings);
    storageSettings(updatedSettings);
  };

  return (
    <UISettingsContext.Provider
      value={{
        uiSettings,
        saveSettings,
      }}>
      {children}
    </UISettingsContext.Provider>
  );
};

UISettingsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const SettingsConsumer = UISettingsContext.Consumer;

export default UISettingsContext;
