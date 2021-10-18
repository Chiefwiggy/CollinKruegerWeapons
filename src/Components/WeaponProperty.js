import Axios from 'axios'
import {useCallback, useEffect, useState} from 'react';
import Tooltip from './Tooltip';

const API_URL = "https://collinkrueger-weapons.herokuapp.com";

function WeaponProperty({propertyID, propertyTag}) {

    const [property, setProperty] = useState({});

    const GetPropertyFromId = useCallback(() => {
        Axios.get('https://collinkrueger-weapons.herokuapp.com/properties/get/'+propertyID).then((res) => {
            setProperty(res.data);
        })
    }, [propertyID]);

    useEffect(() => {
        //console.log(propertyID);
        GetPropertyFromId();
    },[GetPropertyFromId])

    return (
        <span className="weaponProperty">
            <Tooltip label={property.propertyName} tag={propertyTag} description={property.propertyQuickDescription} key={property._id} />
            &#160;
        </span>
    )
}

export default WeaponProperty;