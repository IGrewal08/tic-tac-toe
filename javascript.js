const game = playGame();
const board = game.Gameboard;

function playGame () {
    const Gameboard = {
        gameboard: [
            ['A', 'B', 'C'],
            ['D', 'F', 'G'],
            ['H', 'I', 'J']
        ]
    };

    return { Gameboard };

}

const gameState = (function (board) {

    const player1 = {
        symbol: 'X',
        score: 0
    };
    
    const player2 = {
        symbol: 'O',
        score: 0
    };
    /*
        Create functions to get and set player1 and player2 scores
        const giveScore = winningplayer.score +1?
        const getScore1 = player1.score;
        const getScore2 = player2.score;
    */

    const gameFlow = {

        current: 'X',

        check() {
            for (let i = 0; i <= 2; i++) {
                if (
                    board.gameboard[i][0].match((board.gameboard[i][1]).match(board.gameboard[i][2])) ||
                    board.gameboard[0][i].match((board.gameboard[1][i]).match(board.gameboard[2][i])) )
                {
                    return true;
                }
            }
            if (board.gameboard[0][0].match((board.gameboard[1][1]).match(board.gameboard[2][2])) ||
                board.gameboard[0][2].match((board.gameboard[1][1]).match(board.gameboard[2][0]))) 
            {
                return true;
            }
            return false;
        },
        changeCurrent() {
            let temp = this.current;
            this.current = this.current === 'X' ? 'O' : 'X';
            return temp;
        }
    };
    return { player1, player2, gameFlow };

})(board);

//calling a IIFE function below
//console.log(gameState.gameFlow.check());

console.log(gameState.gameFlow.check());
//board.gameboard[1][1] = gameState.gameFlow.changeCurrent(); //x
board.gameboard[0][0] = gameState.gameFlow.changeCurrent();
console.log(gameState.gameFlow.check());
board.gameboard[1][1] = gameState.gameFlow.changeCurrent();
console.log(gameState.gameFlow.check());
board.gameboard[1][1] = gameState.gameFlow.changeCurrent();
console.log(gameState.gameFlow.check());
board.gameboard[2][1] = gameState.gameFlow.changeCurrent();
console.log(gameState.gameFlow.check());
board.gameboard[2][2] = gameState.gameFlow.changeCurrent();
console.log(gameState.gameFlow.check());



























function printGameboard (board) {
    for (let i = 0; i <= 2; i++) {
        console.log(board.gameboard[i][0] + ' ' + board.gameboard[i][1] + ' ' + board.gameboard[i][2]);
    }
}
printGameboard(board);
