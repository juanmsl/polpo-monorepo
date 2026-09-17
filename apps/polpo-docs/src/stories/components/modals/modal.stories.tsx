import { Button, Line, Typography, ModalBackdrop, Modal as ModalComponent, ModalProps } from 'polpo/components';
import { PositionContainer } from 'polpo/helpers';
import { useModal } from 'polpo/hooks';
import { Grid } from 'polpo/layouts';

import type { Meta, StoryObj } from '@storybook/react-vite';

const Modal = ({ children, ...props }: ModalProps) => (
  <ModalComponent backdrop='none' {...props} style={{ borderRadius: '1em' }}>
    <Grid style={{ width: '400px', maxWidth: '100%', padding: '1em' }}>
      <Typography variant='header4' color='primary'>
        {children}
      </Typography>
      <Line />
      <Typography>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. At, commodi dolore, doloremque doloribus esse
        excepturi impedit in, ipsam ipsum iste magni nihil officiis quasi quia quod similique tenetur? Aliquid cum dolor
        incidunt nihil?
      </Typography>
    </Grid>
  </ModalComponent>
);

const meta: Meta<typeof ModalComponent> = {
  title: 'Modals/Modal',
  component: ModalComponent,
  argTypes: {
    animation: { control: { type: 'inline-radio', options: ['none', 'fade-down', 'bounce'] } },
    windowOffset: { control: { type: 'range', min: 0, max: 100 } },
    offset: { control: { type: 'range', min: 0, max: 100 } },
    position: { control: 'inline-radio', options: Object.values(PositionContainer) },
    closeOnClickOutside: { control: 'boolean' },
    opacity: { control: { type: 'range', min: 0, max: 1, step: 0.1 } },
    backdrop: { control: { type: 'inline-radio', options: Object.values(ModalBackdrop) } },
    transitionDuration: { control: false },
    backdropOnClick: { control: false },
    zIndex: { control: false },
    id: { control: false },
    children: { control: false },
    isOpen: { control: false },
    onClose: { control: false },
    className: { control: false },
    style: { control: false },
    rootStyle: { control: false },
    closeAnimationClassName: { control: false },
    containerRef: { control: false },
    modalRef: { control: false },
  },
  args: {
    offset: 20,
    windowOffset: 10,
  },
};

export default meta;
type Story = StoryObj<typeof ModalComponent>;

export const AllContainerPositions: Story = {
  argTypes: {
    position: { control: false },
  },
  render: (args => {
    const modal1 = useModal<HTMLButtonElement>();
    const modal2 = useModal<HTMLButtonElement>();
    const modal3 = useModal<HTMLButtonElement>();
    const modal4 = useModal<HTMLButtonElement>();
    const modal5 = useModal<HTMLButtonElement>();
    const modal6 = useModal<HTMLButtonElement>();
    const modal7 = useModal<HTMLButtonElement>();
    const modal8 = useModal<HTMLButtonElement>();
    const modal9 = useModal<HTMLButtonElement>();
    const modal10 = useModal<HTMLButtonElement>();
    const modal11 = useModal<HTMLButtonElement>();
    const modal12 = useModal<HTMLButtonElement>();

    return (
      <Grid gtc='repeat(3, 1fr)' gap='20px'>
        <Button fullWidth ref={modal1.containerRef} onClick={modal1.openModal}>
          top left
        </Button>
        <Modal
          {...args}
          containerRef={modal1.containerRef}
          id='container-modal'
          isOpen={modal1.isOpen}
          onClose={modal1.closeModal}
          position='top left'
        >
          top left
        </Modal>
        <Button fullWidth ref={modal2.containerRef} onClick={modal2.openModal}>
          top center
        </Button>
        <Modal
          {...args}
          containerRef={modal2.containerRef}
          id='container-modal'
          isOpen={modal2.isOpen}
          onClose={modal2.closeModal}
          position='top center'
        >
          top center
        </Modal>
        <Button fullWidth ref={modal3.containerRef} onClick={modal3.openModal}>
          top right
        </Button>
        <Modal
          {...args}
          containerRef={modal3.containerRef}
          id='container-modal'
          isOpen={modal3.isOpen}
          onClose={modal3.closeModal}
          position='top right'
        >
          top right
        </Modal>

        <Button fullWidth ref={modal4.containerRef} onClick={modal4.openModal}>
          left top
        </Button>
        <Modal
          {...args}
          containerRef={modal4.containerRef}
          id='container-modal'
          isOpen={modal4.isOpen}
          onClose={modal4.closeModal}
          position='left top'
        >
          left top
        </Modal>
        <span />
        <Button fullWidth ref={modal5.containerRef} onClick={modal5.openModal}>
          right top
        </Button>
        <Modal
          {...args}
          containerRef={modal5.containerRef}
          id='container-modal'
          isOpen={modal5.isOpen}
          onClose={modal5.closeModal}
          position='right top'
        >
          right top
        </Modal>

        <Button fullWidth ref={modal6.containerRef} onClick={modal6.openModal}>
          left center
        </Button>
        <Modal
          {...args}
          containerRef={modal6.containerRef}
          id='container-modal'
          isOpen={modal6.isOpen}
          onClose={modal6.closeModal}
          position='left center'
        >
          left center
        </Modal>
        <span />
        <Button fullWidth ref={modal7.containerRef} onClick={modal7.openModal}>
          right center
        </Button>
        <Modal
          {...args}
          containerRef={modal7.containerRef}
          id='container-modal'
          isOpen={modal7.isOpen}
          onClose={modal7.closeModal}
          position='right center'
        >
          right center
        </Modal>

        <Button fullWidth ref={modal8.containerRef} onClick={modal8.openModal}>
          left bottom
        </Button>
        <Modal
          {...args}
          containerRef={modal8.containerRef}
          id='container-modal'
          isOpen={modal8.isOpen}
          onClose={modal8.closeModal}
          position='left bottom'
        >
          left bottom
        </Modal>
        <span />
        <Button fullWidth ref={modal9.containerRef} onClick={modal9.openModal}>
          right bottom
        </Button>
        <Modal
          {...args}
          containerRef={modal9.containerRef}
          id='container-modal'
          isOpen={modal9.isOpen}
          onClose={modal9.closeModal}
          position='right bottom'
        >
          right bottom
        </Modal>

        <Button fullWidth ref={modal10.containerRef} onClick={modal10.openModal}>
          bottom left
        </Button>
        <Modal
          {...args}
          containerRef={modal10.containerRef}
          id='container-modal'
          isOpen={modal10.isOpen}
          onClose={modal10.closeModal}
          position='bottom left'
        >
          bottom left
        </Modal>
        <Button fullWidth ref={modal11.containerRef} onClick={modal11.openModal}>
          bottom center
        </Button>
        <Modal
          {...args}
          containerRef={modal11.containerRef}
          id='container-modal'
          isOpen={modal11.isOpen}
          onClose={modal11.closeModal}
          position='bottom center'
        >
          bottom center
        </Modal>
        <Button fullWidth ref={modal12.containerRef} onClick={modal12.openModal}>
          bottom right
        </Button>
        <Modal
          {...args}
          containerRef={modal12.containerRef}
          id='container-modal'
          isOpen={modal12.isOpen}
          onClose={modal12.closeModal}
          position='bottom right'
        >
          bottom right
        </Modal>
      </Grid>
    );
  }) satisfies typeof ModalComponent,
};

export const AllScreenPositions: Story = {
  argTypes: {
    position: { control: false },
  },
  render: (args => {
    const modal1 = useModal();
    const modal2 = useModal();
    const modal3 = useModal();
    const modal4 = useModal();
    const modal5 = useModal();
    const modal6 = useModal();
    const modal7 = useModal();
    const modal8 = useModal();
    const modal9 = useModal();

    return (
      <Grid gtc='repeat(3, 1fr)' gap='20px'>
        <Button fullWidth onClick={modal1.openModal}>
          top left
        </Button>
        <Modal {...args} id='screen-modal' isOpen={modal1.isOpen} onClose={modal1.closeModal} position='top left'>
          top left
        </Modal>
        <Button fullWidth onClick={modal2.openModal}>
          top center
        </Button>
        <Modal {...args} id='screen-modal' isOpen={modal2.isOpen} onClose={modal2.closeModal} position='top center'>
          top center
        </Modal>
        <Button fullWidth onClick={modal3.openModal}>
          top right
        </Button>
        <Modal {...args} id='screen-modal' isOpen={modal3.isOpen} onClose={modal3.closeModal} position='top right'>
          top right
        </Modal>

        <Button fullWidth onClick={modal4.openModal}>
          left center
        </Button>
        <Modal {...args} id='screen-modal' isOpen={modal4.isOpen} onClose={modal4.closeModal} position='left center'>
          left center
        </Modal>
        <Button fullWidth onClick={modal5.openModal}>
          center
        </Button>
        <Modal {...args} id='screen-modal' isOpen={modal5.isOpen} onClose={modal5.closeModal} position='center'>
          center
        </Modal>
        <Button fullWidth onClick={modal6.openModal}>
          right center
        </Button>
        <Modal {...args} id='screen-modal' isOpen={modal6.isOpen} onClose={modal6.closeModal} position='right center'>
          right center
        </Modal>

        <Button fullWidth onClick={modal7.openModal}>
          bottom left
        </Button>
        <Modal {...args} id='screen-modal' isOpen={modal7.isOpen} onClose={modal7.closeModal} position='bottom left'>
          bottom left
        </Modal>
        <Button fullWidth onClick={modal8.openModal}>
          bottom center
        </Button>
        <Modal {...args} id='screen-modal' isOpen={modal8.isOpen} onClose={modal8.closeModal} position='bottom center'>
          bottom center
        </Modal>
        <Button fullWidth onClick={modal9.openModal}>
          bottom right
        </Button>
        <Modal {...args} id='screen-modal' isOpen={modal9.isOpen} onClose={modal9.closeModal} position='bottom right'>
          bottom right
        </Modal>
      </Grid>
    );
  }) satisfies typeof ModalComponent,
};
