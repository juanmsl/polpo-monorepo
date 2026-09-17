import { Button, Menu, ModalBackdrop } from 'polpo/components';
import { PositionContainer } from 'polpo/helpers';
import { useModal } from 'polpo/hooks';
import { BsAirplane } from 'react-icons/bs';
import { FaBicycle, FaInstagram, FaLink, FaSpinner, FaWhatsapp } from 'react-icons/fa';
import { FaHouse, FaMagnifyingGlass } from 'react-icons/fa6';
import { FcDocument } from 'react-icons/fc';
import { GiThink } from 'react-icons/gi';
import { GrOrderedList } from 'react-icons/gr';
import { IoGameController } from 'react-icons/io5';
import { LuDoorClosed, LuDoorOpen } from 'react-icons/lu';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Menu> = {
  title: 'Modals/Menu',
  component: Menu,
  argTypes: {
    closeOnClickOutside: { control: 'boolean' },
    transitionDuration: { control: false },
    windowOffset: { control: { type: 'range', min: 0, max: 100 } },
    position: { control: 'inline-radio', options: Object.values(PositionContainer) },
    offset: { control: { type: 'range', min: 0, max: 100 } },
  },
  args: {
    offset: 5,
    windowOffset: 10,
    children: 'Menu content',
    position: PositionContainer.BOTTOM_RIGHT,
    backdrop: ModalBackdrop.TRANSPARENT,
  },
  decorators: [
    (Story, { args }) => {
      const { openModal, closeModal, isOpen, containerRef } = useModal<HTMLButtonElement>();

      return (
        <>
          <Button fullWidth ref={containerRef} onClick={openModal}>
            {isOpen ? <LuDoorOpen /> : <LuDoorClosed />}
            Menu
          </Button>
          <Story
            args={{
              ...args,
              isOpen,
              offset: 10,
              style: { height: 300, minWidth: 200 },
              onClose: closeModal,
              containerRef,
              children: (
                <>
                  <Menu.GroupLabel>Checkbox</Menu.GroupLabel>
                  <Menu.Option asCheckbox icon={FaHouse} disabled label='Option 1' />
                  <Menu.Option asCheckbox icon={FaMagnifyingGlass} selected label='Option 2' />
                  <Menu.Option asCheckbox icon={FcDocument} label='Option 3' />
                  <Menu.Option asCheckbox icon={FaSpinner} disabled selected label='Option 4' />
                  <Menu.Divider />
                  <Menu.GroupLabel>Options disabled</Menu.GroupLabel>
                  <Menu.Option icon={FaInstagram} label='Option 5' />
                  <Menu.Option icon={BsAirplane} disabled label='Option 6' />
                  <Menu.Option icon={FaWhatsapp} disabled selected label='Option 7' />
                  <Menu.Option icon={GrOrderedList} label='Option 8' />
                  <Menu.Divider />
                  <Menu.GroupLabel>Options</Menu.GroupLabel>
                  <Menu.Option icon={GiThink} label='Option 9' />
                  <Menu.Option icon={IoGameController} label='Option 10' />
                  <Menu.Option icon={FaBicycle} selected label='Option 11' />
                  <Menu.Option icon={FaLink} label='Option 12' />
                </>
              ),
            }}
          />
        </>
      );
    },
  ],
};

export default meta;
type Story = StoryObj<typeof Menu>;

export const Default: Story = {
  args: {},
};
