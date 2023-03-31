import React, { useEffect, useRef, useState } from 'react';
import { useThree, useFrame } from 'react-three-fiber';
import { useKeyboardControls } from "@react-three/drei"
import * as THREE from 'three'
import { useConfigurator } from "../contexts/Configurator";
import { MapControls } from '@react-three/drei'

export const Player = props => {
    
    const ref = useRef()

    
    const { camera } = useThree()
    const [ smoothedCameraPosition ] = useState(() => new THREE.Vector3(0, 4, 20))
    const [ smoothedCameraTarget ] = useState(() => new THREE.Vector3())

    const direction = new THREE.Vector3()
    const speed = 10

    const { selected, setSelected, matrix, filterColor, price, rating, brand, category } = useConfigurator();

    //count the amount in array matrix where free = true
    const count = matrix ? matrix.filter(item => item.free === false).length : matrix.length;

    useEffect(() => {
        if (count > 0) {
            setSelected([null,0,[0,count/7,count/2.7]])
        }
        else {
            setSelected([null,0,[0,matrix.length/8,matrix.length/5]])
        }
    }, [filterColor, price, rating, brand, category])


    useFrame((state, delta) => {

        if (selected[0] !== undefined) {
            const bodyPosition = ref.current.position
            
            const poss = new THREE.Vector3(selected[2][0], selected[2][1], selected[2][2])
    
            bodyPosition.lerp(poss, 0.5)
        
            const cameraPosition = new THREE.Vector3()
            cameraPosition.copy(bodyPosition)
            cameraPosition.z += 2.5
            cameraPosition.y += 1
   
            const cameraTarget = new THREE.Vector3()
            cameraTarget.copy(bodyPosition)
            cameraTarget.y += 0.25
    
            smoothedCameraPosition.lerp(cameraPosition, 0.5)
            smoothedCameraTarget.lerp(cameraTarget, 0.5)
    
            state.camera.position.copy(smoothedCameraPosition)  
    
            camera.lookAt(smoothedCameraTarget)
        }
    })


    return (
        <>
            <mesh ref={ref} />
            <MapControls 
                enableRotate={true}
                maxPolarAngle={Math.PI / 2 - 0.1}
                minDistance={2}
                maxDistance={16}
                dampingFactor={0.5}
                camera={camera}
            /> 
        </>
    );
};

export default Player;
