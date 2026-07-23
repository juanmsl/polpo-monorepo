'use client';
import {
  ActionModal,
  AsideModal,
  Badge,
  Button,
  ColorTypes,
  RadiusTypes,
  SizeTypes,
  Tabs,
  VariantTypes,
} from 'polpo/components';
import { useState } from 'react';
import { FaUsers } from 'react-icons/fa';

const colors = Object.values(ColorTypes);
const variants = Object.values(VariantTypes);
const sizes = Object.values(SizeTypes);
const radiuses = Object.values(RadiusTypes);

export default function UIPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [size, setSize] = useState<SizeTypes>(SizeTypes.REGULAR);
  const [radius, setRadius] = useState<RadiusTypes>(RadiusTypes.MEDIUM);
  const [isActionModalOpen, setActionModalOpen] = useState(false);
  const [isAsideModalOpen, setAsideModalOpen] = useState(false);

  return (
    <section>
      <section className='p-6 grid grid-cols-[repeat(4,200px)] gap-4'>
        <section className='col-span-4 flex gap-4 items-center'>
          <Button onClick={() => setActionModalOpen(true)}>Action modal</Button>
          <Button onClick={() => setAsideModalOpen(true)}>Aside modal</Button>
        </section>
        <section className='col-span-4 flex gap-4 items-center'>
          <Button onClick={() => setIsLoading(p => !p)}>{isLoading ? 'loading...' : 'not loading'}</Button>
          {sizes.map(sizeType => (
            <Button
              key={sizeType}
              onClick={() => setSize(sizeType)}
              variant={size === sizeType ? 'solid' : 'outlined'}
              size={sizeType}
            >
              {sizeType}
            </Button>
          ))}
        </section>
        <section className='col-span-4 flex gap-4 items-center'>
          {radiuses.map(radiusType => (
            <Button
              key={radiusType}
              onClick={() => setRadius(radiusType)}
              variant={radius === radiusType ? 'solid' : 'outlined'}
              radius={radiusType}
            >
              {radiusType}
            </Button>
          ))}
        </section>
        {colors.map(color => [
          ...variants.map(variant => (
            <Button
              key={`${variant}-${color}`}
              radius={radius}
              size={size}
              color={color}
              variant={variant}
              isLoading={isLoading}
            >
              {variant}
            </Button>
          )),
        ])}
        {variants.map(variant => (
          <Button
            key={`${variant}-disabled`}
            radius={radius}
            size={size}
            disabled
            variant={variant}
            isLoading={isLoading}
          >
            disabled
          </Button>
        ))}
      </section>

      <section className='p-6 grid grid-cols-[repeat(4,200px)] gap-4'>
        {colors.map(color => [
          <Badge key={`${color}-unselected-1`} size={size} radius={radius} color={color}>
            {color}
          </Badge>,
          <Badge key={`${color}-selected`} size={size} radius={radius} color={color} selected>
            {color}
          </Badge>,
          <Badge key={`${color}-unselected-2`} size={size} radius={radius} color={color}>
            {color}
          </Badge>,
          <Badge key={`${color}-unselected-3`} size={size} radius={radius} color={color}>
            {color}
          </Badge>,
        ])}
      </section>

      <ActionModal
        isOpen={isActionModalOpen}
        backCard
        lineOnTop
        icon={FaUsers}
        onClose={() => setActionModalOpen(false)}
      >
        <section className='w-200 h-50'>
          <h1>Action modal</h1>
        </section>
      </ActionModal>

      <AsideModal size='400px' position='left' isOpen={isAsideModalOpen} onClose={() => setAsideModalOpen(false)}>
        <h4>Aside modal</h4>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid architecto autem consequatur culpa cumque
          dolores, id laborum laudantium molestias nostrum provident quisquam, veniam voluptates. Atque consequuntur
          quibusdam repellat. Aliquam, consectetur?
        </p>
      </AsideModal>

      <section className='grid gap-4'>
        <Tabs defaultOpenTab='A'>
          <Tabs.TabList
            color='primary'
            className='md:grid-flow-col grid-flow-row bg'
            radius='full'
            variant='flat'
            size='small'
            tabs={[
              { id: 'A', label: 'Tab A' },
              { id: 'B', label: 'Tab B' },
              { id: 'C', label: 'Tab C' },
              { id: 'D', label: 'Tab D' },
              { id: 'E', label: 'Tab E' },
            ]}
          />

          <section className='border border-solid grid place-content-center m-4'>
            <Tabs.TabPanel id='A'>
              <h1>A</h1>
            </Tabs.TabPanel>
            <Tabs.TabPanel id='B'>
              <h1>B</h1>
            </Tabs.TabPanel>
            <Tabs.TabPanel id='C'>
              <h1>C</h1>
            </Tabs.TabPanel>
            <Tabs.TabPanel id='D'>
              <h1>D</h1>
            </Tabs.TabPanel>
            <Tabs.TabPanel id='E'>
              <h1>E</h1>
            </Tabs.TabPanel>
          </section>
        </Tabs>
      </section>
    </section>
  );
}
