import React, { useState, Suspense } from 'react'
import { XR, Controllers, VRButton } from '@react-three/xr'
import { Sky } from '@react-three/drei'
import '@react-three/fiber'
import { Canvas } from '@react-three/fiber'
import './style.css'
import { Stats, Loader } from '@react-three/drei'
import Experience from './componenets/Experience.jsx'
import Lights from './componenets/Lights.jsx'
import Interface from './componenets/Interface.jsx'
import TeleportTravel from './componenets/TeleportTravel.jsx'
import VRInterface from './componenets/VRInterface.jsx'
import Controls from './componenets/Controls.jsx'

function App() {

  return (
    <>
      <Suspense fallback={<Loader />}>   
        <VRButton />
        <Canvas shadows camera={{ position: [ 0, 4, 14], fov: 60 }} dpr={[1, 2]}>
          <XR>
            <fog attach="fog" args={['#ffffff', 0.0002, 105]} />
            <Lights />
            <VRInterface />
            <Controllers /> 
            <Controls/>
            <TeleportTravel useNormal={false}>
              <Experience />
            </TeleportTravel>
          </XR>
        </Canvas>
        <Interface />
      </Suspense>
    </>
  )
}

export default App;

