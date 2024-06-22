import React, {useState} from 'react'

const Player = ({initialName, symbol, isActive, onChangeName}) => {
    const [playerName, setPlayerName]= useState(initialName)
    const [isEditing, setIsEditing]= useState(false)

    function handleEditClick(){
        setIsEditing((isEditing) => !isEditing)
        
        if (isEditing){
            onChangeName(symbol, playerName)
        }
    }

    function handleChange(event){
        setPlayerName(event.target.value)
    }

    let editablePlayerName = <span className="player-name">{playerName}</span>
    // let btnCaption= 'Edit'
    if (isEditing){
        editablePlayerName = <input type="text" value={playerName} required onChange={handleChange} />
        // let btnCaption= 'Save'
    }
    return (
        <li className={isActive ? 'active' : undefined}>
            <span className='player'>
                {/* {isEditing ? <input type="text" required /> : <span className="player-name">{name}</span> } */}
                {editablePlayerName}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEditClick}>{isEditing ? 'Save' : 'Edit'}</button>
        </li>
    )
}

export default Player