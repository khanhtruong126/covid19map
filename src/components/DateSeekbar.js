import React from 'react';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const DateSeekbar = (props) => {
    if(props.dateValue.dateValue !== undefined){
        props = {dateValue : 0};
    }
    console.log(props.patientsLst)
    
    const wrapper = React.createRef();

    return <div ref={wrapper}>
            <Typography gutterBottom>Timeline</Typography>
            <Slider
                aria-label="custom thumb label"              
                value={props.dateValue}
                getAriaValueText={props.emitDate}
                min={Date.parse("December 08, 2019")}
                max={Date.now()}
            />
        </div>
    
};

export default DateSeekbar;