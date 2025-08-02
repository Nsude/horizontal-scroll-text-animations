import { useEffect, useRef } from 'react'
import './App.css'
import { ReactLenis, type LenisRef } from 'lenis/react';
import gsap from 'gsap';
import ClassicSmooth from './components/ClassicSmooth';

function App() {
  const lenisRef = useRef<LenisRef>(null);

   useEffect(() => {
    function update(time: number) {
      if (!lenisRef.current) return;
      lenisRef.current?.lenis?.raf(time * 1000)
    }
  
    gsap.ticker.add(update)
  
    return () => gsap.ticker.remove(update)
  }, [])

  // sm:text-[6.5rem] md:text-[9rem] lg:text-[12rem] xl:text-[14rem] 2xl:text-[19rem] 
  return (
    <ReactLenis root ref={lenisRef} options={{lerp: 0.05, smoothWheel: true, autoRaf: false}}>
      <section className='w-full h-fit overflow-hidden'>
        <div className='relative h-screen w-full flex flex-col justify-center items-center'>
          <div className='absolute top-[22px] left-1/2 -translate-x-1/2'>
            <img src="/assets/logo.png" alt="" />
          </div>
          <h2 className='
            text-[4.3rem] 
            tracking-tight
          '>
            <span className='opacity-25'>because</span>
            <span>ican</span>
          </h2>
        </div>

        {/* text showcase */}
        <section className='h-full w-full'>
          <ClassicSmooth text='Why do You Suck at Code?' />
        </section>

        <div className='relative w-full h-[50vh] flex flex-col justify-center items-center'>
          <h2 className='
            text-[4.3rem] 
            tracking-tight
          '>
            <span className='opacity-25'>The</span>
            <span>end</span>
          </h2>
        </div>
      </section>
    </ReactLenis>
  )
}

export default App
