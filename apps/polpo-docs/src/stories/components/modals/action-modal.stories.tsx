import { ActionModal, Button, Line, Typography } from 'polpo/components';
import { Grid } from 'polpo/layouts';
import { useState } from 'react';
import { FaUser } from 'react-icons/fa';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof ActionModal> = {
  title: 'Modals/ActionModal',
  component: ActionModal,
  argTypes: {
    actionRequired: { control: 'boolean' },
    noCloseButton: { control: 'boolean' },
    noPadding: { control: 'boolean' },
    className: { control: false },
    style: { control: false },
    lineOnTop: { control: 'boolean' },
    backCard: { control: 'boolean' },
    children: { control: 'text' },
  },
  args: {
    children: 'Action modal content',
  },
  decorators: [
    (Story, { args }) => {
      const [isOpen, setIsOpen] = useState(false);

      return (
        <>
          <Button onClick={() => setIsOpen(true)}>Open modal</Button>
          <Story args={{ ...args, isOpen, onClose: () => setIsOpen(false) }} />
        </>
      );
    },
  ],
};

export default meta;
type Story = StoryObj<typeof ActionModal>;

export const Classic: Story = {
  argTypes: {
    children: { control: false },
  },
  args: {
    lineOnTop: true,
    noPadding: true,
  },
  render: args => {
    return (
      <ActionModal {...args}>
        <Typography variant='header4' noPadding style={{ padding: '0 1rem' }}>
          Action modal
        </Typography>
        <Line />
        <Grid gap='1em' style={{ padding: '0 1rem 1rem' }}>
          <Typography>Are you sure want to execute an action?</Typography>
        </Grid>
        <Grid
          ai='center'
          columnSize='80px'
          ji='center'
          flow='column'
          jc='end'
          gap='1em'
          style={{ padding: '0 1rem 1rem' }}
        >
          <ActionModal.ActionButton
            size='small'
            fullWidth
            variant='outlined'
            onClick={() =>
              new Promise(resolve => {
                setTimeout(resolve, 2000);
              })
            }
          >
            No
          </ActionModal.ActionButton>
          <ActionModal.ActionButton
            size='small'
            fullWidth
            color='primary'
            onClick={() =>
              new Promise(resolve => {
                setTimeout(resolve, 2000);
              })
            }
          >
            Yes
          </ActionModal.ActionButton>
        </Grid>
      </ActionModal>
    );
  },
};

export const Confirmation: Story = {
  argTypes: {
    children: { control: false },
  },
  args: {
    backCard: true,
    lineOnTop: true,
    icon: FaUser,
  },
  render: args => {
    return (
      <ActionModal {...args}>
        <Typography variant='header4' align='center' noPadding>
          Action modal
        </Typography>
        <Typography>Are you sure want to execute an action?</Typography>
        <Grid
          ai='center'
          columnSize='minmax(100px, 1fr)'
          ji='center'
          flow='column'
          jc='center'
          gap='1em'
          style={{ margin: 'auto' }}
        >
          <ActionModal.ActionButton
            size='small'
            fullWidth
            variant='outlined'
            onClick={() =>
              new Promise(resolve => {
                setTimeout(resolve, 2000);
              })
            }
          >
            No
          </ActionModal.ActionButton>
          <ActionModal.ActionButton
            size='small'
            fullWidth
            color='primary'
            onClick={() =>
              new Promise(resolve => {
                setTimeout(resolve, 2000);
              })
            }
          >
            Yes
          </ActionModal.ActionButton>
        </Grid>
      </ActionModal>
    );
  },
};
