import React from 'react'

const EditedSymbol = ({isNotEdited}) => {
    return (
        <div>
            {
                (isNotEdited) ? ('') : (<div className="edited-container"><p className="edited-label">EDITED</p></div>)
            }
        </div>
    )
}
export default EditedSymbol
