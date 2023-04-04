import React, { useRef, useState } from "react";
import { useGLTF, Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useConfigurator } from "../contexts/Configurator";
import * as THREE from "three";
import { useTexture } from "@react-three/drei";

export function Bank(props) {

    const { nodes } = useGLTF(props.gltf)

    const { index } = props
    
    const group = useRef();

    const [hovered, setHovered] = useState(false)
    const [clicked, setClicked] = useState(false)

    const { setCursor, selected, setSelected } = useConfigurator()

    const info = [index, props.name, props.newPosition, props.gltf, props.scale, props.rotation, props.rating, props.price, props.category]
    
    useFrame(() =>
    {
      if(props.visible == false)
      {
        group.current.position.lerp(new THREE.Vector3(props.position[0], props.position[1]+30, props.position[2]), 0.2);
      }
      else if (props.visible == true)
      {
        try{
          group.current.position.x = props.newPosition[0];                
          group.current.position.lerp(new THREE.Vector3(props.newPosition[0], props.newPosition[1], props.newPosition[2]), 0.2);  
        }
        catch{
          group.current.position.lerp(new THREE.Vector3(props.position[0], props.position[1], props.position[2]), 0.2);
        }
      }
    });
    useFrame((state, delta) => {
      if (clicked && props.visible && selected[0] === index) {
        try {
          group.current.position.lerp(
            new THREE.Vector3(
              props.newPosition[0],
              props.newPosition[1] + 1,
              props.newPosition[2]
            ),
            0.04
          );
          group.current.rotation.y += delta * 0.5;
        } catch {
          group.current.position.lerp(
            new THREE.Vector3(
              props.position[0],
              props.position[1] + 1,
              props.position[2]
            ),
            0.04
          );
          group.current.rotation.y += delta * 0.5;
        }
      } else {
        clicked && setClicked(false);
        try {
          group.current.rotation.y = 0.0;
        } catch {
          group.current.rotation.y = 0.0;
        }
      }
    });
    

    const [colorMap, displacementMap, normalMap, roughnessMap, aoMap] = useTexture([
      props.materials.map + '/Substance_Graph_BaseColor.webp',
      props.materials.map + '/Substance_Graph_Height.webp',
      props.materials.map + '/Substance_Graph_Normal.webp',
      props.materials.map + '/Substance_Graph_Roughness.webp',
      props.materials.map + '/Substance_Graph_AmbientOcclusion.webp',
    ])

    colorMap.wrapS = THREE.RepeatWrapping;
    colorMap.wrapT = THREE.RepeatWrapping;
    colorMap.repeat.set(12,12);

    

    const shadowMap = useTexture("textures/shadows/"+props.category+".png");

    // get the image data of the texture
    const image = shadowMap.image;
    const shadowWidth = image.width;
    const shadowHeight = image.height;

    return (
      <group dispose={null}>
        <mesh
            {...props}
            ref={group}
            receiveShadow
            geometry={nodes.HSM0004001.geometry}
            scale={0.05}
            onClick={(e) => (e.stopPropagation(), setClicked(!clicked), selected[0] == index ? setSelected([null,0,[0,8,20]]) : setSelected(info))}
            onPointerOver={(e) => (e.stopPropagation(), setHovered(true), setCursor(true))}
            onPointerOut={(e) => (setHovered(false), setCursor(false))}
        >
          <meshStandardMaterial roughness={1} map={colorMap} roughnessMap={roughnessMap} aoMap={aoMap} displacementMap={displacementMap} displacementScale={0.2} normalMap={normalMap} />
        </mesh>
        <mesh
            position={
              group.current && group.current.position.y < 0.5 
                ? [group.current.position.x - 0.3, group.current.position.y - 0.4, group.current.position.z + 0.4]
                : [0, -10, 0]
            }
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <planeBufferGeometry attach="geometry" args={[shadowWidth / 450, shadowHeight / 450]} />
            <meshStandardMaterial roughness={1} map={shadowMap} transparent />
        </mesh>

      </group>
    );
  }

  export default Bank;