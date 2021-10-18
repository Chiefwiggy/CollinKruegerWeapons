import Axios from 'axios'
import React, {useCallback, useEffect, useState} from 'react'
import Tooltip from './Tooltip';
import WeaponProperty from './WeaponProperty'
import WeaponClassBox from './WeaponClassBox';

const API_URL = "https://collinkrueger-weapons.herokuapp.com";

function Weapon({data}) {

    const [damageType, setDamageType] = useState({});
    const [weaponClass, setWeaponClass] = useState({});
    const [weaponRange, setWeaponRange] = useState("");
    const [weaponExpanded, setWeaponExpanded] = useState(false);

    const ToggleWeaponExpansion = () => {
        setWeaponExpanded(!weaponExpanded);
    }

    const CastToDamageType = (id) => {
        Axios.get('https://collinkrueger-weapons.herokuapp.com/types/get/'+id).then((res) => {
            setDamageType(res.data)
        })
    }

    const CastToWeaponClass = (id) => {
        Axios.get('https://collinkrueger-weapons.herokuapp.com/weaponclasses/get/'+id).then((res) => {
            setWeaponClass(res.data);
        })
    }

    const ConstructWeaponRange = useCallback(() => {
        let rangeString = "";
        if (data.weaponRange?.midRange === undefined) {
            rangeString = data.weaponRange.shortRange + ' feet';
        } else {
            rangeString = data.weaponRange.shortRange + '/' + data.weaponRange.midRange + '/' + data.weaponRange.longRange;
        }

        setWeaponRange(rangeString);
    }, [data.weaponRange]);

    useEffect(()=> {
        CastToDamageType(data.weaponDamage.damageType.baseType);
        CastToWeaponClass(data.weaponClass)
        ConstructWeaponRange();
    },[data, ConstructWeaponRange])


    return (
        <div className='Weapon row' key={data._id}>
            <div className='cw-2 cw-m-3 cw-s-4 cw-xss-3 weaponName'>{data.weaponName}</div>
            <div className='cw-2 cw-m-1 cw-s-2 lalign'>
                <span className='damageDice'>
                    {data.weaponDamage.dieCount}
                    d
                    {data.weaponDamage.damageDie} 
                </span>
                <span className='spacer'> </span>
                <span className='damageType table-lg'>
                    <Tooltip label={damageType?.name} description={damageType.critCondition} tag={data.weaponDamage.damageType.typeTag ? '- '+data.weaponDamage.damageType.typeTag.toLowerCase() : ''}/>
                </span>
                <span className='damageType table-r'>
                    <Tooltip label={damageType?.name?.substring(0,1)} description={damageType?.critCondition} tag={data.weaponDamage.damageType.typeTag ? '*' : ''} />
                </span>
            </div>
            <div className='cw-1 cw-m-1 cw-s-0'>
                <WeaponClassBox classData={weaponClass}/>
            </div>
            <div className='cw-1 cw-m-0 lalign'>
                {data.weaponSkill}
            </div>
            <div className='cw-1 cw-m-1 cw-s-2'>
                <span className='table-r'>
                    {
                        data.weaponRange.midRange ?
                        (<Tooltip label={data.weaponRange.shortRange + '*ft'} description={weaponRange} tag={''} />)
                        : data.weaponRange.shortRange + 'ft'
                    }
                </span>
                <span className='table-lg text-small'>
                    {weaponRange.length > 12 ? (<Tooltip label={weaponRange.split('/').slice(0,2).join('/')+'*'} description={weaponRange} tag={''} />) : weaponRange}
                </span>
                
            </div>
            <div className={`cw-5 cw-m-6 cw-s-4 lalign properties ${weaponExpanded ? 'openedWeapon' : 'closedWeapon'}`}>
                {
                    data.properties.map((prop) => {
                        return (<WeaponProperty propertyID={prop.propertyID} propertyTag={prop.propertyTag} key={prop._id} />);
                    })
                }
                <div className='ellipsis-s' onClick={ToggleWeaponExpansion}>
                    {
                        data.properties.length <= 1 ? '' : weaponExpanded ? '[...close...]' : '...'
                    }
                </div>
                
            </div>
        </div>
    )
}

export default Weapon;