import Meubel from './Meubel.jsx'
import { useConfigurator } from "../contexts/Configurator";
import myData from '../data/data.json';
import { Text } from "@react-three/drei";

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
  const { matrix, setMatrix, filterColor, price, category, brand, rating, start } = useConfigurator();

  setMatrix(positionToMatrixNewPosition(multiArrayWithPositions));

  let results

  for (let i = 0; i < multiArrayWithPositions.length; i++) {
    if ((filterColor.includes(multiArrayWithPositions[i].color) || filterColor.length === 0 ) && (multiArrayWithPositions[i].price >= price[0] && multiArrayWithPositions[i].price <= price[1]) && (category.includes(multiArrayWithPositions[i].category) || category.length === 0) && (brand.includes(multiArrayWithPositions[i].brand) || brand.length === 0) && (multiArrayWithPositions[i].rating >= rating) && start === true) {
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
  let amount = multiArrayWithPositions.filter((obj) => obj.visible === true).length;
  if (amount === 0 && start === true) {
    results = 0;
  }
  else {
    results = -1;
  }

    return <>

      { multiArrayWithPositions.map((props, i) => (
        <Meubel key={i} {...props} index={i} />
      ))}

      <Text
        font="/fonts/Funkturm.otf"
        color="black"
        fontSize={2}
        position={[0, results, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        anchorX="center"
        anchorY="middle"
      >
      No products found
      </Text>

    </>
}