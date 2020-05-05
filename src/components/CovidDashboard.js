import React, { Component } from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import CovidGoogleMap from "./CovidGoogleMap";
import PatientInfo from "./PatientInfo";
import CovidMap from "./CovidMap";
import PatientList from "./PatientList";
import DateSeekbar from "./DateSeekbar"
import $ from 'jquery';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';

class CovidDashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            patienstLst: [],
            currentPatient: null,
            currentDate: 0, //current date sent by seekbar
            seekbarControllerValue: 1575738000000,// to control value of seekbar starting at December 08, 2019 (date -> milliseconds)
            isPlaying: false,
        };
    }

    componentDidMount() {
        this.getAllPatients();

        const _this = this;
        setInterval(() => {
            if (_this.state.isPlaying === true && this.state.seekbarControllerValue < Date.now()) {
                _this.updateSeekbarDate(86400000); //milisec of a day
            }
            if (_this.state.isPlaying === true && this.state.seekbarControllerValue >= Date.now()) {
                this.setState({
                    seekbarControllerValue: 1575738000000
                });
            }
        }, 500);
    }

    getAllPatients = () => {
        fetch("https://maps.vnpost.vn/apps/covid19/api/patientapi/list")
            .then(res => res.json())
            .then(
                (result) => {
                    let finishSorting = false;

                    result.data.sort(function (a, b) {
                        let aDate = new Date(a.verifyDate);
                        let bDate = new Date(b.verifyDate);
                        return bDate - aDate;
                    });
                    finishSorting = true;

                    if (finishSorting) {
                        this.setState({
                            patienstLst: result.data
                        });
                    }
                },
                (error) => {
                    console.log(error)
                }
            )
    }

    patientMarkerClickedHandler = (patient) => {
        this.setState({
            currentPatient: patient
        });
    }

    updateSeekbarDate = (dayTime) => {
        const newTime = this.state.seekbarControllerValue + dayTime;
        this.setState({
            seekbarControllerValue: newTime
        });
    }

    onMarkerClick(id) {
        $('div.clickedListItem').removeClass('clickedListItem');
        let elmnt = document.getElementById("patientItem" + id);
        elmnt.className += ' clickedListItem';
        elmnt.scrollIntoView({
            //behavior: 'smooth',
            block: 'center',
        });
    }

    getCurrentDateFromSeekbar = (dateValue) => {  
        this.setState({
            currentDate: dateValue
        });             
    }

    playTimeline = () => {
        if (this.state.isPlaying === true) {
            return;
        }
        this.setState({
            isPlaying: true
        });
    }

    stopTimeline = () => {
        if (this.state.isPlaying === false) {
            return;
        }
        this.setState({
            isPlaying: false
        });
    }

    render() {
        const patientsLst = this.state.patienstLst;
        const currentPatient = this.state.currentPatient;
        const currentDate = this.state.currentDate;
        const seekbarControllerValue = this.state.seekbarControllerValue;

        const utcTime = new Date(seekbarControllerValue);
        const utcString = utcTime.toDateString();
        return (
            <div style={{ padding: "30px" }}>
                <Row>
                    <Col xs={6}>
                        <CovidMap onPatientMarkerClicked={this.patientMarkerClickedHandler} onMarkerClick={this.onMarkerClick}
                            patientsLst={patientsLst} currentPatient={currentPatient} currentDate={currentDate} />
                        <div id="dateSeekBar">
                            <Button onClick={() => this.playTimeline()}><PlayArrowIcon></PlayArrowIcon></Button>
                            <Button onClick={() => this.stopTimeline()}><PauseIcon></PauseIcon></Button>
                            <DateSeekbar dateValue={seekbarControllerValue} emitDate={this.getCurrentDateFromSeekbar} />
                            <div style={{display: 'flex', justifyContent: 'center'}}>{utcString}</div>
                        </div>
                    </Col>
                    <Col xs={3}> Patient Information:
                {currentPatient &&
                            <PatientInfo currentPatient={currentPatient} />
                        }
                    </Col>
                    <Col xs={3} >
                        <PatientList onPatientMarkerClicked={this.patientMarkerClickedHandler}
                            onMarkerClick={this.onMarkerClick}
                            patientsLst={patientsLst}>
                        </PatientList>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default CovidDashboard;