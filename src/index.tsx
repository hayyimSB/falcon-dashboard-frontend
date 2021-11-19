import 'react-perfect-scrollbar/dist/css/styles.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import 'react-quill/dist/quill.snow.css';
import 'nprogress/nprogress.css';
import ReactDOM from 'react-dom';
import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import StyledEngineProvider from '@material-ui/core/StyledEngineProvider';
import stores from './stores';
import { Observer } from 'mobx-react';
import StoresContext from './stores/context';
import { UISettingsProvider } from './contexts/SettingsContext';
import { QueryClientProvider } from 'react-query';
import { queryClient } from './apis';
import App from './App';

ReactDOM.render(
  <StrictMode>
    <StyledEngineProvider injectFirst>
      <UISettingsProvider>
        <StoresContext.Provider value={stores}>
          <StoresContext.Consumer>
            {() => (
              <Observer>
                {() => (
                  <BrowserRouter>
                    <QueryClientProvider client={queryClient}>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <App />
                      </LocalizationProvider>
                    </QueryClientProvider>
                  </BrowserRouter>
                )}
              </Observer>
            )}
          </StoresContext.Consumer>
        </StoresContext.Provider>
      </UISettingsProvider>
    </StyledEngineProvider>
  </StrictMode>,
  document.getElementById('root'),
);
