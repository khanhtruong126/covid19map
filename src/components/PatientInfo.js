import React from 'react';

const PatientInfo = (props) => {
    return <ul className="patient-info">
        <li>Name: {props.currentPatient.name}</li>
        <li>Address: {props.currentPatient.address}</li>
        <li>Note: {props.currentPatient.note}</li>
        <li>Verify Date: {props.currentPatient.verifyDate}</li>
    </ul>
};

export default PatientInfo;