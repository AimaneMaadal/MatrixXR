import React from 'react'


const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

const mat = urlParams.get('mat');


function AR() {
  return (
  <>
    <model-viewer
      id="couch"
      style={{ width: '100%', height: '92vh' }}
      shadow-intensity="1"
      ar-placement="floor"
      ar-modes="webxr scene-viewer quick-look"
      camera-controls
      ar
      src={`/models/AR/${id}/${mat}.glb`}
    >
    </model-viewer>
  </>
  );
}

export default AR;
