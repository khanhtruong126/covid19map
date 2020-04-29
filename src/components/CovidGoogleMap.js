import React from 'react';
import {compose, withProps} from "recompose"
import {withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow} from "react-google-maps"

const CovidGoogleMap = ({onPatientMarkerClicked}) => {
    console.log('Rendering CovidGoogleMap...');

    const MyMapComponent = React.memo(compose(
        withProps({
            googleMapURL:
                "https://maps.googleapis.com/maps/api/js?key=AIzaSyAf6E1CQCl3XNMNjSE-YlGPfXXfrwX_Llg&libraries=geometry,drawing,places",
            loadingElement: <div style={{height: `100%`}}/>,
            containerElement: <div style={{height: `600px`}}/>,
            mapElement: <div style={{height: `100%`}}/>
        }),
        withScriptjs,
        withGoogleMap
    )((props)=> (
        <GoogleMap defaultZoom={16} defaultCenter={{lat: 10.762913, lng: 106.6799884}}>
            {this.props.patientsLst.map((patient, index) => (<Marker key={index} position={{lat: patient.lat, lng: patient.lng}} onClick={()=>{
                onPatientMarkerClicked(patient)}}>
            </Marker>))}
        </GoogleMap>
    )));


    return <MyMapComponent/>;
}
export default React.memo(CovidGoogleMap);
