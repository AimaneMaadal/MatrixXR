import React, { useState } from 'react'
import { Interactive } from '@react-three/xr'
import { Text } from '@react-three/drei'
import '@react-three/fiber'
import { useConfigurator } from '../../contexts/Configurator.jsx'

function Box({ color, size, scale, children, ...rest }) {
    return (
      <mesh scale={scale} {...rest}>
        <boxGeometry args={size} />
        <meshPhongMaterial color={color} />
        {children}
      </mesh>
    )
}

function Panel(props) {
    return (
        <mesh position={props.position} rotation={[0, 0, 0]} receiveShadow opacity={0}>
            <boxBufferGeometry attach="geometry" args={[8, 5, 0.1]} />
            <meshBasicMaterial attach="material" color={0xffffff} />                    
        </mesh>
    )
}

function Button(props) {
    
const { setFilterColor, filterColor } = useConfigurator();
    
const [hover, setHover] = useState(false)

const onSelect = () => {
    setFilterColor(filterColor.includes(props.filterColor) ? filterColor.filter((item) => item !== props.filterColor) : [...filterColor, props.filterColor])
}

    return (
        <Interactive onSelect={onSelect} onHover={() => setHover(true)} onBlur={() => setHover(false)}>
            <Box size={[0.8, 0.3, 0.1]} position={props.position} onClick={() => setFilterColor(filterColor.includes(props.filterColor) ? filterColor.filter((item) => item !== props.filterColor) : [...filterColor, props.filterColor])} color={filterColor.includes(props.filterColor) ? "black" : "lightgrey"}>
                <Text position={[0, 0, 0.06]} fontSize={0.15} anchorX="center" anchorY="middle" font="/fonts/Yukita/YukitaSans-Medium.otf" color={filterColor.includes(props.filterColor) ? "white" : "black"}>
                    {props.filterColor}
                </Text>
            </Box>
        </Interactive>
    )
}

function Button2(props) {
    
    const { setFilterColor, filterColor } = useConfigurator();
        
    const [hover, setHover] = useState(false)
    
    const onSelect = () => {
        setFilterColor(filterColor.includes(props.filterColor) ? filterColor.filter((item) => item !== props.filterColor) : [...filterColor, props.filterColor])
    }
    
        return (
            <Interactive onSelect={onSelect} onHover={() => setHover(true)} onBlur={() => setHover(false)}>
                <Box color={hover ? props.filterColor : "lightgrey" } size={[0.8, 0.3, 0.1]} position={props.position}>
                    <Text position={[0, 0, 0.06]} fontSize={0.15} color="#000" anchorX="center" anchorY="middle" font="/fonts/Yukita/YukitaSans-Medium.otf">
                        {props.filterCategory}
                    </Text>
                </Box>
            </Interactive>
        )
    }



function VRInterface() {


    return (
        <>

            <Panel position={[0, 0, -17.5]} /> 
            <Text position={[-3.5, 2.25, -17.4]} fontSize={0.15} color="#000" anchorX="center" anchorY="middle" font="/fonts/Yukita/YukitaSans-Medium.otf">
                Color
            </Text>
            <Button filterColor="Black" position={[-3.5, 1.9, -17.48]} />
            <Button filterColor="Emerald" position={[-2.6, 1.9, -17.48]} />
            <Button filterColor="Lime" position={[-1.7, 1.9, -17.48]} />
            <Button filterColor="White" position={[-0.8, 1.9, -17.48]} />
            <Button filterColor="Beige" position={[0.1, 1.9, -17.48]} />
            <Button filterColor="Brown" position={[1, 1.9, -17.48]} />
        </>
    )
}
export default VRInterface;