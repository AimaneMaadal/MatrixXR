export default function Lights()
{
    return <>
      <ambientLight intensity={0.6} />

      <pointLight position={[0, 10, 10]} intensity={0.3} />

      <pointLight position={[0, 20, -2]} intensity={0.4} />
    </>
}