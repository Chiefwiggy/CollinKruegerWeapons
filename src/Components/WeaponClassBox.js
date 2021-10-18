import '../Styles/weapon-styles.css'

const WeaponClassBox = ({classData}) => {
    return (
        <div className='WeaponClassBox Tooltip'>
            <span className='WeaponClassName TooltipHover' >{classData?.name?.singular}</span>
            <div className='cw-12 TooltipText'>
                {
                    classData.weaponAbilities?.map((e) => {
                        return (<div className='TooltipData' key={e._id}>
                            <span className='WeaponAbilityName'>{e.name}. </span>
                            <span className='WeaponAbilityDesc'>
                                {e.desc}
                            </span>
                            <em className='WeaponAbilityPrereq'>{e.prerequisites ? ' (requires a ' + e.prerequisites + ')' : ''}</em>
                        </div>)
                    }) 
                }
            </div>
        </div>
    )
}

export default WeaponClassBox;