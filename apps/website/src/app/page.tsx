import Image from 'next/image';
import { Button } from 'polpo/components';

export default function Home() {
  return (
    <main className='grid place-content-center min-h-screen p-24 gap-4'>
      <Image src='turborepo-dark.svg' className='imgLight' alt='Turborepo logo' width={180} height={38} priority />

      <h1 className='text-2xl text-center text-nowrap'>Hello world, welcome to monorepo</h1>

      <Button appName='name'>Open alert</Button>
    </main>
  );
}
