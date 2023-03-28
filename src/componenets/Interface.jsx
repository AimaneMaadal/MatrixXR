import { useConfigurator } from "../contexts/Configurator";
import { useRef, useEffect } from "react";
import { Box, Stack, Slider, Chip, Typography, Accordion, AccordionSummary, AccordionDetails, Button, createTheme, ThemeProvider, Avatar, Rating, FormControlLabel, FormControl, RadioGroup, Radio, Modal } from "@mui/material";
import { useState } from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


export const Interface = () => {
const { filterColor, setFilterColor, input, setPrice, category, setCategory, brand, setBrand, cursor, setRating, setSelected } = useConfigurator();
const inputRef = useRef(null);

const theme = createTheme({
  palette: {
    primary: {
      light: '#232323',
      main: '#242424',
      dark: '#222222',
      contrastText: '#fff',
    }
  },
  fonts: {
    fontFamily: 'Montserrat',
  },
});

useEffect(() => {
if (input) {
  inputRef.current.focus();
}
}, [input]);

function valuetext(value) {
  return `${value}`;
}
  const [value, setValue] = useState([0, 1000]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setPrice(newValue);
  };

  const [ratingValue, setRatingValue] = useState(0);

function resetFilters() {
  setFilterColor([]);
  setPrice([0, 1000]);
  setValue([0, 1000]);
  setCategory([]);
  setBrand([]);
  setRating(0);
 
}

const handleRadioChange = (event) => {
  setRating(event.target.value);
  setRatingValue(event.target.value);
};

return (
<>
<ThemeProvider theme={theme}>
  <div className="filter">
    <Box sx={{ width: 500, maxHeight: '82.5vh', overflowY: 'auto', overflowX: 'hidden'}}>
      <Typography variant="h2">FILTER</Typography>
      <Accordion sx={{ mb: 2, border: 'none', boxShadow: 'none', backgroundColor: 'transparent'}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
        <Typography>Category</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack direction="row" spacing={1}>
            <Chip label="Chair" {...(category.includes("chair") ? {color: "primary"} : {variant: "outlined"})} onClick={()=> setCategory(category.includes("chair") ? category.filter((category) => category !== "chair") : [...category, "chair"])} />
            <Chip label="Couch" {...(category.includes("couch") ? {color: "primary"} : {variant: "outlined"})} onClick={()=> setCategory(category.includes("couch") ? category.filter((category) => category !== "couch") : [...category, "couch"])} />
          </Stack>
        </AccordionDetails>
      </Accordion>
      <Accordion sx={{ mb: 2, border: 'none', boxShadow: 'none', backgroundColor: 'transparent'}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
        <Typography>Brand</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack direction="row" spacing={1}>  
            <Chip label="IKEA" {...(brand.includes("ikea") ? {color: "primary"} : {variant: "outlined"})} onClick={()=> setBrand(brand.includes("ikea") ? brand.filter((brand) => brand !== "ikea") : [...brand, "ikea"])} />
            <Chip label="CB2" {...(brand.includes("cb2") ? {color: "primary"} : {variant: "outlined"})} onClick={()=> setBrand(brand.includes("cb2") ? brand.filter((brand) => brand !== "cb2") : [...brand, "cb2"])} />
          </Stack>
        </AccordionDetails>
      </Accordion>
      <Accordion sx={{ mb: 2, border: 'none', boxShadow: 'none', backgroundColor: 'transparent'}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
        <Typography>Color</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack direction="row" flexWrap="wrap" justifyContent="left" gap={1} >
            <Chip avatar={<Avatar alt="Red" src="./avatar/red.png" />} label="Red" {...(filterColor.includes("red") ? {color: "primary"} : {variant: "outlined"})} onClick={() => setFilterColor(filterColor.includes("red") ? filterColor.filter((color) => color !== "red") : [...filterColor, "red"])} />
            <Chip avatar={<Avatar alt="orange" src="./avatar/orange.png" />} label="Orange" {...(filterColor.includes("orange") ? {color: "primary"} : {variant: "outlined"})} onClick={() => setFilterColor(filterColor.includes("orange") ? filterColor.filter((color) => color !== "orange") : [...filterColor, "orange"])} />
            <Chip avatar={<Avatar alt="white" src="./avatar/white.png" />} label="White" {...(filterColor.includes("white") ? {color: "primary"} : {variant: "outlined"})} onClick={() => setFilterColor(filterColor.includes("white") ? filterColor.filter((color) => color !== "white") : [...filterColor, "white"])} />
            <Chip avatar={<Avatar alt="black" src="./avatar/black.png" />}  label="Black" {...(filterColor.includes("black") ? {color: "primary"} : {variant: "outlined"})} onClick={() => setFilterColor(filterColor.includes("black") ? filterColor.filter((color) => color !== "black") : [...filterColor, "black"])} />
            <Chip avatar={<Avatar alt="green" src="./avatar/green.png" />}  label="Green" {...(filterColor.includes("green") ? {color: "primary"} : {variant: "outlined"})} onClick={() => setFilterColor(filterColor.includes("green") ? filterColor.filter((color) => color !== "green") : [...filterColor, "green"])} />
            <Chip avatar={<Avatar alt="beige" src="./avatar/beige.png" />}  label="Beige" {...(filterColor.includes("beige") ? {color: "primary"} : {variant: "outlined"})} onClick={() => setFilterColor(filterColor.includes("beige") ? filterColor.filter((color) => color !== "beige") : [...filterColor, "beige"])} />
          </Stack>
        </AccordionDetails>
      </Accordion>
      <Accordion sx={{ mb: 2, border: 'none', boxShadow: 'none', backgroundColor: 'transparent'}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
        <Typography>Price</Typography>
        </AccordionSummary>
        <AccordionDetails>
            <Slider
              getAriaLabel={() => 'price range'}
              value={value}
              onChange={handleChange}
              valueLabelDisplay="auto"
              getAriaValueText={valuetext}
              color="primary"
              max={1000}
            />
            <Typography sx={{textAlign: 'center', mb: 2, fontWeight: 'bold'}}>${value[0]} - ${value[1]}</Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion sx={{ mb: 2, border: 'none', boxShadow: 'none', backgroundColor: 'transparent'}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
        <Typography>Rating</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormControl sx={{width: '100%'}}>
            <RadioGroup aria-labelledby="demo-radio-buttons-group-label" onChange={handleRadioChange} value={ratingValue}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Stack direction="row" alignItems="center"><Rating name="read-only" value={5} sx={{'& .MuiRating-iconFilled': {color: '#242424',},}} readOnly />&nbsp; &up</Stack>
                <FormControlLabel value="5" control={<Radio />} sx={{padding: 0, margin: 0}}/>
              </Stack> 
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Stack direction="row" alignItems="center"><Rating name="read-only" value={4} sx={{'& .MuiRating-iconFilled': {color: '#242424',},}} readOnly />&nbsp; &up</Stack>
                <FormControlLabel value="4" control={<Radio />} sx={{padding: 0, margin: 0}}/>
              </Stack> 
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Stack direction="row" alignItems="center"><Rating name="read-only" value={3} sx={{'& .MuiRating-iconFilled': {color: '#242424',},}} readOnly />&nbsp; &up</Stack>
                <FormControlLabel value="3" control={<Radio />} sx={{padding: 0, margin: 0}}/>
              </Stack> 
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Stack direction="row" alignItems="center"><Rating name="read-only" value={2} sx={{'& .MuiRating-iconFilled': {color: '#242424',},}} readOnly />&nbsp; &up</Stack>
                <FormControlLabel value="2" control={<Radio />} sx={{padding: 0, margin: 0}}/>
              </Stack> 
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Stack direction="row" alignItems="center"><Rating name="read-only" value={1} sx={{'& .MuiRating-iconFilled': {color: '#242424',},}} readOnly />&nbsp; &up</Stack>
                <FormControlLabel value="1" control={<Radio />} sx={{padding: 0, margin: 0}}/>
              </Stack> 
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Stack direction="row" alignItems="center"><Rating name="read-only" value={0} sx={{'& .MuiRating-iconFilled': {color: '#242424',},}} readOnly />&nbsp; &up</Stack>
                <FormControlLabel value="0" control={<Radio />} sx={{padding: 0, margin: 0}}/>
              </Stack>  
            </RadioGroup>
          </FormControl>
        </AccordionDetails>
      </Accordion>
    </Box>  
    <Button variant="contained" sx={{ width: 500 }} size="large" onClick={() => (resetFilters(), setSelected([]))}>RESET</Button>
  </div>
</ThemeProvider>
<div className="title"><Typography variant="h1">COUCH<br/>MATRIX</Typography></div>

</>
);
};

export default Interface;