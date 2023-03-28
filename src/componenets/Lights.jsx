import { useEffect } from "react";
import { useConfigurator } from "../contexts/Configurator";

export default function Lights()
{
    const { selected, setSelected } = useConfigurator();

    console.log(selected)
    
    return <>
      <ambientLight intensity={0.6} />
        <directionalLight position={[4, 12, -8]} castShadow intensity={0.7} shadow-mapSize={2048} shadow-bias={-0.001}> 
          <orthographicCamera attach="shadow-camera" args={[-80.5, 80.5, 80.5, -80.5, 0.10, 30]} />
        </directionalLight>
      <pointLight position={[-10, 10, 0]} intensity={0.2} />
    </>
}