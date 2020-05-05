import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

class DateSeekbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            wrapper: React.createRef()
        };
    }

    shouldComponentUpdate(nextProps, nextState){
        if(this.props.dateValue === nextProps.dateValue){
            return false;
        } 
        return true;
    }

    sentValueToDashboard = (value) => {
        this.props.emitDate(value);
    }

    render() {
        const wrapper = this.state.wrapper;
        const { dateValue } = this.props;

        return <div ref={wrapper}>
            <Typography gutterBottom>Timeline</Typography>
            <Slider
                aria-label="custom thumb label"
                value={dateValue}
                getAriaValueText={this.sentValueToDashboard}
                min={Date.parse("December 08, 2019")}
                max={Date.now()}
            />
        </div>
    }
};

export default DateSeekbar;