import { create } from 'storybook/theming';

export default create({
  base: 'dark',
  brandTitle: 'Juanmsl',
  brandUrl: 'https://www.npmjs.com/package/polpo',
  brandImage:
    'https://images.ctfassets.net/oums43ieu6nl/2ylSC9qo4LKhdbuA5w0UEv/092b9842073058c8b66760aa84c3bbfd/polpo.png',
  brandTarget: '_blank',

  // Typography
  fontBase: '"Montserrat", "Segoe UI", sans-serif',
  fontCode: 'monospace',

  colorPrimary: '#B91345',
  colorSecondary: '#177fff',
  barHoverColor: '#B91345',
  barSelectedColor: '#B91345',
});
