import Axios from 'axios';
import {useEffect, useState, useCallback, useRef} from 'react'
import Weapon from './Weapon'
import '../Styles/grid.css';
import '../Styles/weapon-styles.css'


const WeaponTable = () => {
  const [weaponData, setWeaponData] = useState([]);
  const [allWeapons, setAllWeapons] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const searchRef = useRef();

  const FilterWeapons = useCallback(() => {
    console.log("FILTERED WEAPONS"); 
    setWeaponData(allWeapons.filter((e) => {
      return e.weaponName.includes(searchTerm);
    }))
  }, [searchTerm, allWeapons])

  const GetWeapons = useCallback( async () => {
    console.log("did this");
    Axios.get('https://collinkrueger-weapons.herokuapp.com/weapons/getAll').then((res) => {
      setAllWeapons(res.data);
    })
  }, []);

  

  const CallSearch = (ev) => {
    if (ev.key === 'Enter') setSearchTerm(searchRef.current.value.toLowerCase());
  }

  useEffect(()=>{
    GetWeapons();
  },[GetWeapons])

  useEffect(() => {
    FilterWeapons();
  }, [FilterWeapons])

  return (
      <div className="WeaponTableContainer">
        <div className='SearchBarContainer'>
          <input type='text' className='SearchBar' ref={searchRef} onKeyDown={CallSearch}></input>
        </div>
        <div className="row table-head-row">
            <div className='cw-2 cw-m-3 cw-s-4'>Weapon</div>
            <div className='cw-2 cw-m-1 cw-s-2'>Damage</div>
            <div className='cw-1 cw-m-1 cw-s-0'>Class</div>
            <div className='cw-1 cw-m-0'>Skill</div>
            <div className='cw-1 cw-m-1 cw-s-2'>Range</div>
            <div className='cw-5 cw-m-6 cw-s-4'>Properties</div>
        </div>
        <div className='WeaponRows'>
        {
            weaponData.map((weapon) => {
              return <Weapon data={weapon} key={weapon._id}/>
            })
        }
        </div>
      </div>
  )
}

export default WeaponTable;