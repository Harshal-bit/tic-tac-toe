const Player = (name,symbol) => {
    return {name,symbol}
}

const gameboard = () => {
    let gameArray = []
    let moves = 0
    let winner = ''
    for(var i =0;i<3;i++){
        let row = []
        for(var j = 0;j<3;j++){
            row.push('')
        }
        gameArray.push(row)
    }
    
    const resetArray = () => {
        moves = 0;
        winner = ''
        for(var i =0;i<3;i++){
            
            for(var j = 0;j<3;j++){
                gameArray[i][j] = ''
            }
            
        }   
    }
    

    const updateBoard = (player,i,j) => {
        if(winner != '') return false;
        gameArray[i][j] = player.symbol
        moves++
        
        if(moves >= 5 && winCheck()) {
            let winnerDiv = document.createElement("h1")
            winnerDiv.innerText = `${player.name} wins`
            winnerDiv.classList.add("result")
            document.body.appendChild(winnerDiv)
            winner = player.name
        }

        if(moves == 9 && winner === '') {
            let drawDiv = document.createElement("h1")
            drawDiv.innerText = `Its a draw`
            drawDiv.classList.add("result")
            document.body.appendChild(drawDiv)
        }
        return true;

    }

    const winCheck = () => {
        
        for(var i = 0 ;i<3 ; i++){
            if(gameArray[i][0] !== '' && gameArray[i][0] === gameArray[i][1] && gameArray[i][1] === gameArray[i][2]) {
                console.log("row "+i)
                console.log(gameArray)
                return true;
            }
        }
        
        for(var i = 0 ;i<3 ; i++){
            if(gameArray[0][i] !== '' && gameArray[0][i] === gameArray[1][i] && gameArray[1][i] === gameArray[2][i]){
                console.log("col "+i)
                console.log(gameArray)
                return true;
            }
        }

        if(gameArray[0][0] !=='' && gameArray[0][0] === gameArray[1][1] && gameArray[1][1] === gameArray[2][2]) {
            console.log("1 ")
            console.log(gameArray)

            return true;
        }
        if(gameArray[2][0] !== '' && gameArray[0][2] === gameArray[1][1] && gameArray[1][1] === gameArray[2][0]) {
            console.log("2 ")
            console.log(gameArray)
            return true;
        }
        
        return false;
    }

    return {updateBoard,resetArray}
}

const gameflow = (() => {
    let player1 = Player("Player1",'X')
    let player2 = Player("Player2",'O')
    let turn = player1
    let cells = document.querySelectorAll(".box")
    let gameBoard = gameboard()
    const reset = document.getElementById('reset');
    

    cells.forEach((cell) => {
        cell.addEventListener('click',() => {
            if(cell.innerHTML == ''){
                let pos = parseInt(cell.id)
                let row = Math.floor(pos/10)
                let col = pos%10
                if(gameBoard.updateBoard(turn,row,col)) cell.innerHTML = turn.symbol;
                turn = (turn == player1) ? player2:player1
            }
        })
    })

    reset.addEventListener('click',()=>{
        
        gameBoard.resetArray()
        turn = player1;
        cells.forEach((cell)=>{
            cell.innerHTML = '';
        })
        let result = document.querySelector(".result")
        result.remove()
    })
})()