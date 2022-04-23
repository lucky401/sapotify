import {ReactElement} from 'react';
import {render, RenderOptions} from '@testing-library/react';
import {BrowserRouter as Router} from 'react-router-dom';
import {QueryClientProvider, QueryClient} from 'react-query';
import {ChakraProvider, extendTheme, ColorModeScript} from '@chakra-ui/react';
import {Provider as ReduxProvider} from 'react-redux';

import store from 'store';
import customTheme from '../theme';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      useErrorBoundary: true,
      refetchOnWindowFocus: false,
      retry(failureCount, error: Record<string, unknown>) {
        if (error.status === 404) return false;
        if (failureCount < 2) return true;
        return false;
      },
    },
  },
});

const theme = extendTheme(customTheme);

function AllTheProviders({children}: {children: JSX.Element}): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <ReduxProvider store={store}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <ChakraProvider theme={theme}>
          <Router>{children}</Router>
        </ChakraProvider>
      </ReduxProvider>
    </QueryClientProvider>
  );
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, {wrapper: AllTheProviders, ...options});

export * from '@testing-library/react';
export {customRender as render};
