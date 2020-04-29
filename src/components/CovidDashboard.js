import React, { useEffect, useState } from 'react';
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

const CovidDashboard = (props) => {
    const [patientsLst, setPatientsLst] = useState([]);
    useEffect(() => {
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
                        setPatientsLst(result.data);
                    }
                },
                (error) => {
                    console.log(error)
                }
            )
    }, []);

    const [currentPatient, setCurrentPatient] = useState();
    const patientMarkerClickedHandler = (patient) => {
        setCurrentPatient(patient);
    }

    const [currentDate, setCurrentDate] = useState();
    const setDate = (date) => {
        console.log(date)
        setCurrentDate(date);
    }

    const onMarkerClick = (id) => {
        $('div.clickedListItem').removeClass('clickedListItem');
        let elmnt = document.getElementById("patientItem" + id);
        elmnt.className += ' clickedListItem';
        elmnt.scrollIntoView({
            //behavior: 'smooth',
            block: 'center',
        });

    }

    const [dateValue, setDateValue] = useState({
        dateValue: 0,
        setValue: (newValue) => {
            setDateValue({...dateValue, dateValue: newValue})
        }
    });
    
    const updateDate = (value) => {
        setDateValue(value);
    }

    const playTimeline = () =>{
        let start = Date.parse("December 08, 2019");
        setInterval(() => {
            updateDate(start);
            start+= 86400000;
        }, 500);
    }

    const stopTimeline = () =>{
        
    }
    
    return <div style={{ padding: "30px" }}>
        <Row>
            <Col xs={6}>
                <CovidMap onPatientMarkerClicked={patientMarkerClickedHandler} onMarkerClick={onMarkerClick}
                    patientsLst={patientsLst} currentPatient={currentPatient} currentDate={currentDate}/>
                <div id="dateSeekBar">
                <Button onClick={playTimeline}><PlayArrowIcon></PlayArrowIcon></Button>
                <Button onClick={stopTimeline}><PauseIcon></PauseIcon></Button>
                {dateValue && patientsLst &&
                    <DateSeekbar dateValue={dateValue} patientsLst={patientsLst} emitDate={setDate}/>
                }

                </div>
            </Col>
            <Col xs={3}> Patient Information:
                {currentPatient &&
                    <PatientInfo currentPatient={currentPatient} />
                }
            </Col>
            <Col xs={3} >
                <PatientList onPatientMarkerClicked={patientMarkerClickedHandler}
                    onMarkerClick={onMarkerClick}
                    patientsLst={patientsLst}>
                </PatientList>
            </Col>
        </Row>
    </div>
};


export default CovidDashboard;