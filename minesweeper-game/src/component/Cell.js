import React from 'react'


const Cell = (date,onClickCell,onContextMenu) => {
    
    const cellContent = () => {
        if(!date.isRevealed){
            return date.isFlaged ? '🚩' : ''
        }
        if(!date.isMine){
            return '💣'
        }
        if(date.neightbour === 0){
            return null
        }else {
            return date.neightbour
        }
    }
    console.log(date)
   
    return (
        <div onClickCell = {onClickCell} 
        // onContextMenu = {onContextMenu}
        >
            {cellContent()}
            
        </div>
    )

    
}

export default Cell;