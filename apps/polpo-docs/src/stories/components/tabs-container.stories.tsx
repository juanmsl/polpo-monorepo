import { Typography, Tabs, SizeTypes, RadiusTypes, TabListVariant, ColorTypes } from 'polpo/components';
import { Grid } from 'polpo/layouts';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Tabs.TabList> = {
  title: 'Tabs/Tab List',
  component: Tabs.TabList,
  argTypes: {
    variant: { control: 'inline-radio', options: Object.values(TabListVariant) },
    size: { control: 'inline-radio', options: Object.values(SizeTypes) },
    color: { control: 'inline-radio', options: [undefined, ...Object.values(ColorTypes)] },
    radius: { control: 'inline-radio', options: Object.values(RadiusTypes) },
    direction: { control: false },
    tabs: { control: false },
    className: { control: false },
    style: { control: false },
  },
  args: {
    tabs: [
      { id: 'home', label: 'Home' },
      { id: 'about', label: 'About us' },
      { id: 'products', label: 'Products' },
      { id: 'categories', label: 'Categories' },
      { id: 'services', label: 'Services' },
    ],
  },
};

export default meta;
type Story = StoryObj<typeof Tabs.TabList>;

export const Default: Story = {
  args: {},
  decorators: [
    Story => (
      <Grid gap='1em'>
        <Tabs defaultOpenTab='home'>
          <Story />

          <Tabs.TabPanel id='home'>
            <Typography variant='header4' align='center'>
              Home
            </Typography>
          </Tabs.TabPanel>
          <Tabs.TabPanel id='about'>
            <Typography variant='header4' align='center'>
              About us
            </Typography>
          </Tabs.TabPanel>
          <Tabs.TabPanel id='products'>
            <Typography variant='header4' align='center'>
              Products
            </Typography>
          </Tabs.TabPanel>
          <Tabs.TabPanel id='categories'>
            <Typography variant='header4' align='center'>
              Categories
            </Typography>
          </Tabs.TabPanel>
          <Tabs.TabPanel id='services'>
            <Typography variant='header4' align='center'>
              Services
            </Typography>
          </Tabs.TabPanel>
        </Tabs>
      </Grid>
    ),
  ],
};

export const Vertical: Story = {
  args: {
    direction: 'vertical',
  },
  decorators: [
    Story => (
      <Grid gtc='auto 1fr' gap='2em' style={{ width: 700 }}>
        <Tabs defaultOpenTab='home'>
          <Story />

          <Tabs.TabPanel id='home'>
            <section>
              <Typography variant='header4'>Home</Typography>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. At blanditiis, dolorem eius incidunt ipsum
                labore maiores, modi nemo nisi nulla quia sunt, tenetur veritatis? Architecto asperiores excepturi quo.
                Magni, maxime possimus! Adipisci facere laborum modi quod unde, velit veritatis! Voluptate!
              </Typography>
            </section>
          </Tabs.TabPanel>
          <Tabs.TabPanel id='about'>
            <section>
              <Typography variant='header4'>About us</Typography>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. At, debitis eligendi est eum, facere inventore
                iste neque nobis, rerum tempore vel voluptas voluptates. Maiores minima molestias mollitia nisi quidem
                unde voluptatibus. Aliquam assumenda dolores earum ex laboriosam quidem quod repellendus!
              </Typography>
            </section>
          </Tabs.TabPanel>
          <Tabs.TabPanel id='products'>
            <section>
              <Typography variant='header4'>Products</Typography>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet cumque cupiditate dolorum exercitationem
                in laboriosam maxime, odio odit quod vitae. Autem consequuntur doloremque dolores, doloribus excepturi
                fuga molestias natus nesciunt nulla obcaecati, odio quaerat quisquam reprehenderit sit tempore ullam
                voluptas.
              </Typography>
            </section>
          </Tabs.TabPanel>
          <Tabs.TabPanel id='categories'>
            <section>
              <Typography variant='header4'>Categories</Typography>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem cupiditate eius maxime repudiandae unde.
                Ducimus eius eos illo incidunt qui! Dicta doloremque ea eaque earum error impedit iure, laboriosam
                magnam maiores, odit quaerat quidem quos repudiandae sed temporibus ut voluptates.
              </Typography>
            </section>
          </Tabs.TabPanel>
          <Tabs.TabPanel id='services'>
            <section>
              <Typography variant='header4'>Services</Typography>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam amet aperiam architecto autem
                blanditiis cupiditate dicta eius et facere in incidunt laborum libero, maiores nam nulla odit
                praesentium, quae quis sapiente sed tenetur ullam ut. Deleniti optio possimus quae sequi!
              </Typography>
            </section>
          </Tabs.TabPanel>
        </Tabs>
      </Grid>
    ),
  ],
};

export const Variants: Story = {
  argTypes: {
    variant: { control: false },
  },
  args: {},
  decorators: Default.decorators,
  render: args => {
    return (
      <Grid gap='1em'>
        <Tabs.TabList {...args} variant='solid' />
        <Tabs.TabList {...args} variant='ghost' />
        <Tabs.TabList {...args} variant='flat' />
        <Tabs.TabList {...args} variant='line' />
      </Grid>
    );
  },
};
