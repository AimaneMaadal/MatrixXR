import React, { useState, Suspense } from 'react'
import { XR, Controllers, VRButton } from '@react-three/xr'
import '@react-three/fiber'
import { Canvas } from '@react-three/fiber'
import './style.css'
import Experience from './componenets/Experience.jsx'
import Lights from './componenets/Lights.jsx'
import Interface from './componenets/Interface.jsx'
import TeleportTravel from './componenets/XR/TeleportTravel.jsx'
import VRInterface from './componenets/XR/VRInterface.jsx'
import Controls from './componenets/Controls.jsx'
import { Perf } from 'r3f-perf'
import Loading from './componenets/Loading.jsx'


export function Floor(props) {
	return (
		<>
      <mesh position={[0, -0.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry attach="geometry" args={[props.size[0], props.size[1]]} />
        <meshStandardMaterial attach="material" color="white" />
      </mesh>
		</>
	);
}

function App() {

  return (
    <>
      <Suspense fallback={<Loading />}>
        <VRButton/>
        <Canvas shadows camera={{ position: [ 0, 4, 14], fov: 60 }} dpr={[1, 2]}>
          <fog attach="fog" args={['#ffffff', 0.0002, 105]} />
          <XR>

            <Lights />

            <VRInterface />
            
            <Controllers /> 

            <TeleportTravel useNormal={false}>
              <Floor size={[200, 150]} />
            </TeleportTravel>
            <Experience />

            {/* <Perf /> */}
          </XR>
          <Controls/>
        </Canvas>
        <Interface />
      </Suspense>
    </>
  )
}

export default App;

