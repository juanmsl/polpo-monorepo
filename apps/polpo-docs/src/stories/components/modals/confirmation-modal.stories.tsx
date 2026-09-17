import { Button, ConfirmationModal } from 'polpo/components';
import { useModal } from 'polpo/hooks';

import ActionModalStory from './action-modal.stories';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof ConfirmationModal> = {
  title: 'Modals/ConfirmationModal',
  component: ConfirmationModal,
  argTypes: {
    ...ActionModalStory.argTypes,
    title: { control: 'text' },
    onAccept: { control: false },
    onReject: { control: false },
    acceptText: { control: 'text' },
    rejectText: { control: 'text' },
    isLoading: { control: 'boolean' },
  },
  args: {
    title: 'Are you sure?',
    acceptText: 'Accept',
    rejectText: 'Reject',
    children: 'Are you sure want to execute an action?',
  },
  decorators: [
    (Story, { args }) => {
      const { isOpen, openModal, closeModal } = useModal();

      return (
        <>
          <Button onClick={openModal}>Open modal</Button>
          <Story
            args={{
              ...args,
              isOpen,
              onClose: closeModal,
              onAccept: () =>
                new Promise(resolve => {
                  setTimeout(resolve, 1000);
                }),

              onReject: () =>
                new Promise(resolve => {
                  setTimeout(resolve, 1000);
                }),
            }}
          />
        </>
      );
    },
  ],
};

export default meta;
type Story = StoryObj<typeof ConfirmationModal>;

export const Default: Story = {
  args: {},
};
