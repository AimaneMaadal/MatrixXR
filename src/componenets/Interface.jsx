import React, { useEffect, useState } from "react";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import { useConfigurator } from "../contexts/Configurator";
import { Stack, Slider, Chip, Typography, Accordion, AccordionSummary, AccordionDetails, createTheme, ThemeProvider,
Avatar, Rating, FormControlLabel, FormControl, RadioGroup, Radio, Modal } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useMemo } from 'react';

import myData from '../data/data.json';

const multiArray = myData

const colors = [...new Set(multiArray.map((item) => item.color))];
const categories = [...new Set(multiArray.map((item) => item.category))];
const brands = [...new Set(multiArray.map((item) => item.brand))];
const minPrice = Math.min(...multiArray.map((item) => item.price));
const maxPrice = Math.max(...multiArray.map((item) => item.price));

const DrawerNavigate = ({ variant, ...props }) => {
const [open, setOpen] = useState(false);
const [start, setStart] = useState(false);

const { filterColor, setFilterColor, setPrice, category, setCategory, setBrand, brand, setRating, selected, setSelected, walk} = useConfigurator();

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


function valuetext(value) {
return `${value}`;
}


const [value, setValue] = useState([minPrice, maxPrice]);

const handleChange = (event, newValue) => {
setValue(newValue);
setPrice(newValue);
};

const [ratingValue, setRatingValue] = useState(0);

function resetFilters() {
setFilterColor([]);
setPrice([minPrice, maxPrice]);
setValue([minPrice, maxPrice]);
setCategory([]);
setBrand([]);
setRating(0);
setRatingValue(0);
}

const handleRadioChange = (event) => {
setRating(event.target.value);
setRatingValue(event.target.value);
};

useEffect(() => {

}, [selected])

const ColorChip = React.memo(({ color, filterColor, setFilterColor }) => {
const isSelected = filterColor.includes(color);

const avatar = useMemo(() => (
<Avatar alt={color} src={`./avatar/${color}.png`} />
), [color]);

const handleClick = () => {
if (isSelected) {
setFilterColor(prevFilterColor => prevFilterColor.filter(selectedColor => selectedColor !== color));
} else {
setFilterColor(prevFilterColor => [...prevFilterColor, color]);
}
};

return (
<Chip key={color} avatar={avatar} label={color} {...(isSelected ? { color: "primary" } : { variant: "outlined" })}
  onClick={handleClick} />
);
});

useEffect(() => {
  if(walk === true && open === true) {
    setOpen(false);
  }
}, [walk])

return (
<>
  <ThemeProvider theme={theme}>
    {!start ? (
    <div className="start">
      Are u ready to start shopping?
      <Button variant="contained" onClick={() => (setStart(true), setSelected([null, 0, [0, 8, 22]]))}>Yes</Button>
    </div>  
    ) : (null)}
    <div className="drawer" style={{ width: open ? "auto" : "0", padding: open ? "2rem" : "0" }}>
      <Typography variant="h2">FILTER</Typography>
      <Accordion sx={{ mb: 2, border: 'none', boxShadow: 'none', backgroundColor: 'transparent'}}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        >
        <Typography>Category</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack direction="row" spacing={1}>
            <Chip label="Chair" {...(category.includes("chair") ? {color: "primary" } : {variant: "outlined" })}
              onClick={()=> setCategory(category.includes("chair") ? category.filter((category) => category !== "chair")
              : [...category, "chair"])} />
              <Chip label="Couch" {...(category.includes("couch") ? {color: "primary" } : {variant: "outlined" })}
                onClick={()=> setCategory(category.includes("couch") ? category.filter((category) => category !==
                "couch") : [...category, "couch"])} />
          </Stack>
        </AccordionDetails>
      </Accordion>
      <Accordion sx={{ mb: 2, border: 'none', boxShadow: 'none', backgroundColor: 'transparent'}}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}
        aria-controls="panel2a-content"
        id="panel2a-header"
        >
        <Typography>Brand</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack direction="row" flexWrap="wrap" justifyContent="left" gap={1}>
            {brands.map((brandName) => (
            <Chip key={brandName} label={brandName} {...(brand.includes(brandName) ? { color: "primary" } : {
              variant: "outlined" })} onClick={()=> setBrand(brand.includes(brandName)? brand.filter((brand) => brand
              !== brandName): [...brand, brandName])}/>
              ))}
          </Stack>
        </AccordionDetails>
      </Accordion>
      <Accordion sx={{ mb: 2, border: 'none', boxShadow: 'none', backgroundColor: 'transparent'}}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}
        aria-controls="panel2a-content"
        id="panel2a-header"
        >
        <Typography>Color</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack direction="row" flexWrap="wrap" justifyContent="left" gap={1}>
            {colors.map((color, i) => (
            <Chip key={i} avatar={<Avatar alt={color} src={`./avatar/${color}.png`} />}
            label={color}
            {...(filterColor.includes(color)
            ? { color: "primary" }
            : { variant: "outlined" })}
            onClick={() =>
            setFilterColor(prevFilterColor =>
            prevFilterColor.includes(color)
            ? prevFilterColor.filter(selectedColor => selectedColor !== color)
            : [...prevFilterColor, color]
            )
            }
            />
            ))}
          </Stack>
        </AccordionDetails>
      </Accordion>
      <Accordion sx={{ mb: 2, border: 'none', boxShadow: 'none', backgroundColor: 'transparent'}}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}
        aria-controls="panel2a-content"
        id="panel2a-header"
        >
        <Typography>Price</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Slider getAriaLabel={()=> 'price range'}
            value={value}
            onChange={handleChange}
            valueLabelDisplay="auto"
            getAriaValueText={valuetext}
            color="primary"
            max={maxPrice}
            min={minPrice}
            />
            <Typography sx={{textAlign: 'center', mb: 2, fontWeight: 'bold'}}>${value[0]} - ${value[1]}</Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion sx={{ mb: 2, border: 'none', boxShadow: 'none', backgroundColor: 'transparent'}}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}
        aria-controls="panel2a-content"
        id="panel2a-header"
        >
        <Typography>Rating</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormControl sx={{width: '100%'}}>
            <RadioGroup aria-labelledby="demo-radio-buttons-group-label" onChange={handleRadioChange}
              value={ratingValue}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Stack direction="row" alignItems="center">
                  <Rating name="read-only" value={5} sx={{'& .MuiRating-iconFilled': {color: '#242424',},}} readOnly />
                  &nbsp; &up</Stack>
                <FormControlLabel value="5" control={<Radio />} sx={{padding: 0, margin: 0}}/>
              </Stack>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Stack direction="row" alignItems="center">
                  <Rating name="read-only" value={4} sx={{'& .MuiRating-iconFilled': {color: '#242424',},}} readOnly />
                  &nbsp; &up</Stack>
                <FormControlLabel value="4" control={<Radio />} sx={{padding: 0, margin: 0}}/>
              </Stack>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Stack direction="row" alignItems="center">
                  <Rating name="read-only" value={3} sx={{'& .MuiRating-iconFilled': {color: '#242424',},}} readOnly />
                  &nbsp; &up</Stack>
                <FormControlLabel value="3" control={<Radio />} sx={{padding: 0, margin: 0}}/>
              </Stack>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Stack direction="row" alignItems="center">
                  <Rating name="read-only" value={2} sx={{'& .MuiRating-iconFilled': {color: '#242424',},}} readOnly />
                  &nbsp; &up</Stack>
                <FormControlLabel value="2" control={<Radio />} sx={{padding: 0, margin: 0}}/>
              </Stack>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Stack direction="row" alignItems="center">
                  <Rating name="read-only" value={1} sx={{'& .MuiRating-iconFilled': {color: '#242424',},}} readOnly />
                  &nbsp; &up</Stack>
                <FormControlLabel value="1" control={<Radio />} sx={{padding: 0, margin: 0}}/>
              </Stack>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Stack direction="row" alignItems="center">
                  <Rating name="read-only" value={0} sx={{'& .MuiRating-iconFilled': {color: '#242424',},}} readOnly />
                  &nbsp; &up</Stack>
                <FormControlLabel value="0" control={<Radio />} sx={{padding: 0, margin: 0}}/>
              </Stack>
            </RadioGroup>
          </FormControl>
        </AccordionDetails>
      </Accordion>
      <Button variant="contained" sx={{ width: 500 }} size="large" onClick={()=> (resetFilters())}>RESET</Button>
    </div>
    {
      selected && selected.length > 3 ?  
      <div className="selected">
        <Typography variant="h1">{selected[1]}</Typography>
        <Typography variant="h4">{selected[8]}</Typography>
        <Chip label={"$ "+selected[7]} variant="contained" color="primary" sx={{ width: 100, height: 30, borderRadius: 5, mb: 2 }}/>
        <Rating name="read-only" value={selected[6]} sx={{'& .MuiRating-iconFilled': {color: '#242424',},}} readOnly />
        <Typography variant="p">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
        </Typography>
      </div> : null
    }
  { !walk && start ?
  <div className="controls" style={{ right: open ? 550 : 50 }}>
    <Button variant="contained" onClick={() => setOpen(!open)} style={{ backgroundColor: "#242424", color: "#fff" }}>
      {open ? "Close Filter" : "Open Filter"}
    </Button>  
    {/* <Button onClick={() => selected.length > 0 ? setSelected([]): setSelected([null,0,[0,8,22]])} {...(selected.length > 0 ? {variant: "contained"} : {variant: "outlined", color:"error"})}>
      {selected.length > 0 ? "Spectate Mode" : "Exit Spectate Mode"}
    </Button> */}
    <Button onClick={() => window.location.href = "http://demo-matrix.netlify.app/?mode=vr"} variant="contained" style={{ backgroundColor: "#242424", color: "#fff" }}>
      VR Mode
    </Button>
  </div>
  : null
  }
  </ThemeProvider>
</>
);
};

export default DrawerNavigate;