import './styles.css';
import Theme from './theme';

import type { Preview } from '@storybook/react-vite';

const preview: Preview = {
  parameters: {
    layout: 'centered',

    docs: {
      theme: Theme,
    },

    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
        boolean: /is('*')$/i,
      },
    },

    initialGlobals: {
      theme: 'dark',
    },

    tags: ['autodocs'],
  },
};

export default preview;
