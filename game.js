var startbtn=document.querySelector('#start')
var x0=document.querySelector('#x0')
var x1=document.querySelector('#x1')
var x2=document.querySelector('#x2')
var x3=document.querySelector('#x3')
var x4=document.querySelector('#x4')
var x5=document.querySelector('#x5')
var x6=document.querySelector('#x6')
var x7=document.querySelector('#x7')
var x8=document.querySelector('#x8')

var playerDisplay=document.querySelector('.display')
var announcer=document.querySelector('#winTxt')
var reset=document.querySelector('#reset')

var start=true
var PLAYERX_WON='PLAYERX_WON'
var PLAYERO_WON='PLAYERO_WON'
var TIE='TIE'

var board=['','','','','','','','','']
var currentPlayer='X'
// 0 1 2
// 3 4 5
// 6 7 8
var winConds=[
    [0,4,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [2,4,6]
]
var tiles=Array.from(document.querySelectorAll('.tile'))

function handleResultValidation(){
    let roundWon=false
    for(let i=0;i<winConds.length;i++){
        const winCond=winConds[i]
        const a=board[winCond[0]]
        const b=board[winCond[1]]
        const c=board[winCond[2]]
        if(a==='' || b==='' || c===''){
            continue
        }
        if(a===b && b===c){
            roundWon=true
            break
        }
    }
    if(roundWon){
        announce(currentPlayer==='X'?PLAYERX_WON: PLAYERO_WON)
        start=false
        return
    }
    if(!board.includes('')){
        announce(TIE)
    }
}
var announce=(type)=>{
    switch(type){
        case PLAYERX_WON:{
            announcer.innerHTML='Player X Won'
            break;
        }
        case PLAYERO_WON:{
            announcer.innerHTML='Player O Won'
            break;
        }
        case TIE:{
            announcer.innerHTML="It's a tie"
            break;
        }
    }
}

var isValidAction=(tile)=>{
    if(tile.innerText==='X' || tile.innerText==='O'){
        return false
    }
    return true
}
var updateBoard = (index)=>{
    board[index]=currentPlayer
}
var changePlayer=()=>{
    playerDisplay.classList.remove(`player${currentPlayer}`)
    currentPlayer=currentPlayer==='X'?'O':'X'
    playerDisplay.innerText=currentPlayer
    playerDisplay.classList.add(`player${currentPlayer}`)

}
var userAction=(tile,index)=>{
    if(isValidAction(tile)&& start){
        tile.innerText=currentPlayer;
        tile.classList.add(`player${currentPlayer}`)
        updateBoard(index)
        handleResultValidation();
        changePlayer();
    }
}
tiles.forEach((tile,index)=>{
    tile.addEventListener('click',()=>userAction(tile,index))
})

const resetBoard=()=>{
    clear()
    board=['','','','','','','','','']
    start=true
    announcer.classList.add('hide')
    if(currentPlayer==='O'){
        changePlayer()
    }
    tiles.forEach(tile=>{
        tile.innerText=''
        tile.classList.remove('playerX')
        tile.classList.remove('playerO')
    })
}
function clear(){
    
    x0.innerHTML=""
    x1.innerHTML=""
    x2.innerHTML=""
    x3.innerHTML=""
    x4.innerHTML=""
    x5.innerHTML=""
    x6.innerHTML=""
    x7.innerHTML=""
    x8.innerHTML=""
    
}
// startbtn.addEventListener('click',()=>{
//     start=true
//     clear()
//     tiles.forEach((tile,index)=>{
//         tile.addEventListener('click',()=>userAction(tile,index))
//     })
// })
reset.addEventListener('click',resetBoard)

