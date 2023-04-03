export default function Lights()
{
    return <>
      <ambientLight intensity={0.6} />

      <pointLight position={[-10, 10, 15]} intensity={0.6} />

      <pointLight position={[0, 20, -5]} intensity={0.3} />

    </>
}