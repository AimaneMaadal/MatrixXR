import Meubel from './Meubel.jsx'
import { useConfigurator } from "../contexts/Configurator";
import myData from '../data/data.json';

const multiArray = myData.sort(() => Math.random() - 0.5);

function positionToMatrixPosition(array) {
  const numObjects = array.length;
  const numCols = Math.ceil(Math.sqrt(numObjects));
  const numRows = Math.ceil(numObjects / numCols);
  const rowSpacing = 3.5;
  const colSpacing = 4;
  const centerOffset = [(numCols - 1) * colSpacing / 2, 0, (numRows - 1) * rowSpacing / 2];
  
  const multiArrayWithPositions = [];
  
  for (let i = 0; i < array.length; i++) {
    const row = Math.floor(i / numCols);
    const col = i % numCols;
    const position = [
      col * colSpacing - centerOffset[0],
      0,
      row * rowSpacing - centerOffset[2]
    ];
    multiArrayWithPositions.push({ ...array[i], position });
  }
  return multiArrayWithPositions;
}

function positionToMatrixNewPosition(array) {
  const filteredArray = array;
  const numObjects = filteredArray.length;
  const numCols = Math.ceil(Math.sqrt(numObjects));
  const numRows = Math.ceil(numObjects / numCols);
  const rowSpacing = 3.5;
  const colSpacing = 4;
  const centerOffset = [(numCols - 1) * colSpacing / 2, 0, (numRows - 1) * rowSpacing / 2];
  
  const multiArrayWithPositions = [];
  
  for (let i = 0; i < filteredArray.length; i++) {
    const obj = filteredArray[i];
    const row = Math.floor(i / numCols);
    const col = i % numCols;
    const newPosition = [
      col * colSpacing - centerOffset[0],
      0,
      row * rowSpacing - centerOffset[2]
    ];
    const free = true;
    multiArrayWithPositions.push({ newPosition, free });
  }
  return multiArrayWithPositions;
}

let multiArrayWithPositions = positionToMatrixPosition(multiArray);

export default function Experience()
{
  const { matrix, setMatrix, filterColor, price, category, brand, rating, setSelected } = useConfigurator();

  setMatrix(positionToMatrixNewPosition(multiArrayWithPositions));

  for (let i = 0; i < multiArrayWithPositions.length; i++) {
    if ((filterColor.includes(multiArrayWithPositions[i].color) || filterColor.length === 0 ) && (multiArrayWithPositions[i].price >= price[0] && multiArrayWithPositions[i].price <= price[1]) && (category.includes(multiArrayWithPositions[i].category) || category.length === 0) && (brand.includes(multiArrayWithPositions[i].brand) || brand.length === 0) && (multiArrayWithPositions[i].rating >= rating)) {
      multiArrayWithPositions[i].visible = true;
      for (let j = 0; j < matrix.length; j++) {
        if (matrix[j].free === true) {
          multiArrayWithPositions[i].newPosition = matrix[j].newPosition;
          matrix[j].free = false;
          break;
        }
      }
      
    }
    else {
      multiArrayWithPositions[i].visible = false;
    }
  }

    return <>

        { multiArrayWithPositions.map((props, i) => (
          <Meubel key={i} {...props} index={i} castShadow />
        ))}

        <mesh position={[0, -0.5, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow opacity={1}>
          <planeGeometry attach="geometry" args={[150, 150]} />
          <meshStandardMaterial attach="material" color="white" />
        </mesh>

    </>
}