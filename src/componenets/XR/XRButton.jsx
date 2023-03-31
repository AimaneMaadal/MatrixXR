import { toggleSession } from '@react-three/xr'

function XRButton(){

    const handleClick = async () => {
    const session = await toggleSession('immersive-vr')

    }

    return (
        <button onClick={handleClick}>Enter VR</button>
    )

}

export default XRButton;

