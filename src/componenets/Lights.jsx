export default function Lights()
{
    return <>
      <ambientLight intensity={0.5} />

      <pointLight position={[-10, 10, 5]} intensity={0.5} />

    </>
}