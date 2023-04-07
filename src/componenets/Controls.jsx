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

    const { selected, setSelected, matrix, filterColor, price, rating, brand, category, mode } = useConfigurator();

    //count the amount in array matrix where free = true
    const count = matrix ? matrix.filter(item => item.free === false).length : matrix.length;
    const [, get] = useKeyboardControls()

    useEffect(() => {
        if (count > 0) {
            setSelected([null,0,[0,count/7,count/2.7]])
        }
        else {
            if (matrix.length > 0) {
                setSelected([null,0,[0,matrix.length/8,matrix.length/5]])
            }   
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
        else{
        
            const { forward, backward, left, right } = get()

        const distance = speed * delta

        if (forward) {
            direction.set(0, 0, -speed)
            direction.applyQuaternion(camera.quaternion);
            direction.y = 0;
            direction.normalize();
            ref.current.position.addScaledVector(direction, distance);
        }
        if (backward){
            direction.set(0, 0, speed)
            direction.applyQuaternion(camera.quaternion)
            direction.y = 0
            direction.normalize()
            ref.current.position.addScaledVector(direction, distance)
        }
        if (left){
            direction.set(-speed, 0, 0)
            direction.applyQuaternion(camera.quaternion)
            direction.y = 0
            direction.normalize()
            ref.current.position.addScaledVector(direction, distance * Math.sqrt(2)/2)
        }
        if (right){
            direction.set(speed, 0, 0)
            direction.applyQuaternion(camera.quaternion)
            direction.y = 0
            direction.normalize()
            ref.current.position.addScaledVector(direction, distance * Math.sqrt(2)/2)
        }

        const bodyPosition = ref.current.position
    
        const cameraPosition = new THREE.Vector3()
        cameraPosition.copy(bodyPosition)
        cameraPosition.z += 2.25
        cameraPosition.y += 0.65

        const cameraTarget = new THREE.Vector3()
        cameraTarget.copy(bodyPosition)
        cameraTarget.y += 0.25

        smoothedCameraPosition.lerp(cameraPosition, 5 * delta)
        smoothedCameraTarget.lerp(cameraTarget, 5 * delta)

        state.camera.position.copy(smoothedCameraPosition)  
        }
    })


    return (
        <>
            <mesh ref={ref} />

        </>
    );
};

export default Player;
