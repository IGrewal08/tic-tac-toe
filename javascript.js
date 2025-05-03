const game = (function() {
    const Gameboard = {
        board: [
            ['A', 'B', 'C'],
            ['D', 'F', 'G'],
            ['H', 'I', 'J']
        ]
    }

    return { 
        Gameboard,
        setData: function(row, column, newValue) {
            Gameboard.board[row][column] = newValue;
        },
        printArray: function() {
            for (let i = 0; i <= Gameboard.board.length; i++) {
                console.log(Gameboard.board[i]);
            }
        }
     } // what you return is what you can access
})();

const elements = {
    player1_Score: document.querySelector('#score1'),
    player2_Score: document.querySelector('#score2'),
    buttons: document.querySelectorAll('.board'),
    modal: document.querySelector('#modal'),
    message: document.querySelector('#end-game-message'),
    replay: document.querySelectorAll('.play-again-buttons')

};

function flow() {
    const gameFlow = {
        current: 'X',
        turn: 1
    }

    return {
        gameFlow,
        getCurrent: function() {
            return gameFlow.current;
        },
        setCurrent: function() {
            gameFlow.current = gameFlow.current === 'X' ? 'O': 'X';
            this.appendTurn();
        },
        appendTurn: function() {
            gameFlow.turn += 1;
        },
        getTurn: function() {
            return gameFlow.turn;
        },
        checkPattern: function() {
            for (let i = 0; i <= 2; i++) {
                if (
                    game.Gameboard.board[i][0].match((game.Gameboard.board[i][1]).match(game.Gameboard.board[i][2])) ||
                    game.Gameboard.board[0][i].match((game.Gameboard.board[1][i]).match(game.Gameboard.board[2][i])))
                {
                    return this.getCurrent();
                }
            }
            if (game.Gameboard.board[0][0].match((game.Gameboard.board[1][1]).match(game.Gameboard.board[2][2])) ||
                game.Gameboard.board[0][2].match((game.Gameboard.board[1][1]).match(game.Gameboard.board[2][0]))) {
                    return this.getCurrent();
            }
            if (this.getTurn() == 9) {
                    return 'Tie';
            }
            this.setCurrent();
            return false;
        }
    }
}

function players() {
    const player = [
        { name: '', symbol: 'X', score: 0 },
        { name: '', symbol: 'O', score: 0 }
    ];

    return { 
        player,
        setName() {
            this.player[0].name = 'Joe' // fix with dialog box
            this.player[1].name = 'rogan' // fix with dialog box
        },
        getName(currentPlayer) {
            let temp;
            this.player.forEach(obj => {
                if(obj.symbol == currentPlayer) {
                    temp = obj;
                }
            });
            console.log(temp.name);
            return temp.name;
        },
        appendScore(currentPlayer) {
            let temp;
            this.player.forEach(obj => {
                if(obj.symbol == currentPlayer) {
                    obj.score += 1;
                    temp = obj;
                }
            });
            return temp.score;
        }
    }
}

function newGame(anotherGame) {
    function resetBoard() {
        game.Gameboard.board = [
            ['A', 'B', 'C'],
            ['D', 'F', 'G'],
            ['H', 'I', 'J']
        ];

        elements.buttons.forEach((button) => {
            button.textContent = '';
            button.removeAttribute('disabled');
        });
        elements.modal.classList.remove("open");
        return flow();
    }
    return { resetBoard }
}

function runEventListener() {
    elements.buttons.forEach((button) => {
        button.addEventListener('click', (event) => {
            event.target.disabled = true;
            const row = event.target.getAttribute('row');
            const column = event.target.getAttribute('column');
    
            const currentPlayer = playGame.getCurrent();
            event.target.textContent = currentPlayer;
            game.setData(row, column, playGame.getCurrent());
            console.log(playGame.getTurn());
    
            switch(playGame.checkPattern()) {
                case false:  break;
                case 'Tie': { 
                    elements.message.textContent = `Both players have drawn the game!`;
                    elements.modal.classList.add("open");
                    break;
                }
                default: 
                    // updating score and getting score
                    const selectScore = document.querySelector(`.player#${currentPlayer} > #score`);
                    selectScore.textContent = newPlayers.appendScore(currentPlayer);
    
                    elements.message.textContent = `Player ${newPlayers.getName(currentPlayer)} has won the game!`;
                    elements.modal.classList.add("open");
    
            }
            game.printArray(); // print current array in console
        });
    });
    
    elements.replay.forEach((button) => {
        button.addEventListener('click', (event) => {
            if (event.target.getAttribute('id') == 'replay') {
                // replay
            } else if (event.target.getAttribute('id') == 'reset') {
                newPlayers = players();
            }
            playGame = newGame(playGame).resetBoard();
        });
    });
}

let playGame = flow();
const newPlayers = players();
newPlayers.setName(); //work on this (make a start-up menu when you first load the page (and re-publish it when you press reset button))
runEventListener();
