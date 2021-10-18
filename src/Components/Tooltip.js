
const Tooltip = ({label, tag, description}) => {


    return (
        <div className='Tooltip'><span className='TooltipHover'>{label} {tag} </span>
            <span className='TooltipText'>{description}</span> 
        </div>
    )
}

export default Tooltip;