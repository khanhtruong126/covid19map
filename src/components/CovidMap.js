import React from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

const CovidMap = (props) => {
    const curDate = new Date(props.currentDate);

    const filterPatientsList = props.patientsLst.filter(patient => new Date(patient.verifyDate) < curDate);

    return <Map center={props.currentPatient ? [props.currentPatient.lat, props.currentPatient.lng] : [10.762887, 106.6800684]} zoom={12}>
        <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.osm.org/{z}/{x}/{y}.png   "
        />
        {filterPatientsList.length > 0 && filterPatientsList.map((patient, index) =>
            <Marker key={index} position={[patient.lat, patient.lng]} onClick={() => {
                props.onPatientMarkerClicked(patient);
                props.onMarkerClick(index)
            }}>
                <Popup>
                    <ul>
                        <li>Name: {patient.name}</li>
                        <li>Address: {patient.address}</li>
                        <li>Note: {patient.note}</li>
                        <li>Verify date: {patient.verifyDate}</li>
                    </ul>
                </Popup>
            </Marker>)}
    </Map>;
};

export default CovidMap;
