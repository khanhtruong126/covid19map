import React from 'react'
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import PatientInfo from "./PatientInfo";

const PatientList = (props) => {
    return (
        <div id="patientCol">
            <div className="patient-list">
                <ListGroup >
                    {props.patientsLst.map((patient, index) =>
                        <ListGroupItem key={index} id={'patientItem' + index} onClick={() => {
                            props.onPatientMarkerClicked(patient);
                            props.onMarkerClick(index);
                        }}>
                            {patient &&
                                <PatientInfo currentPatient={patient} />
                            }
                        </ListGroupItem>
                    )}
                </ListGroup>
            </div>
        </div>
    )
};

export default PatientList
