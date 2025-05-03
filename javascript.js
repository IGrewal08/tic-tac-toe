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
     }
})();

const elements = {
    startDiv: document.querySelector('.menu'),
    player1_name: document.querySelector('#player_1'),
    player2_name: document.querySelector('#player_2'),
    start: document.querySelector('#start'),
    player1_display_name: document.querySelector('#X #name'),
    player2_display_name: document.querySelector('#O #name'),
    player1_Score: document.querySelector('#X #score'),
    player2_Score: document.querySelector('#O #score'),
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
                if (game.Gameboard.board[i][0] === game.Gameboard.board[i][1] && 
                    game.Gameboard.board[i][1] === game.Gameboard.board[i][2] ||
                    game.Gameboard.board[0][i] === game.Gameboard.board[1][i] && 
                    game.Gameboard.board[1][i] === game.Gameboard.board[2][i] )
                {
                    return this.getCurrent();
                }
            }
            if (game.Gameboard.board[0][0] === game.Gameboard.board[1][1] && 
                game.Gameboard.board[1][1] === game.Gameboard.board[2][2] || 
                game.Gameboard.board[0][2] === game.Gameboard.board[1][1] && 
                game.Gameboard.board[1][1] === game.Gameboard.board[2][0] ) 
            {
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
            this.player[0].name = elements.player1_name.value;
            this.player[1].name = elements.player2_name.value;
            elements.player1_display_name.textContent = `${this.player[0].name} X`;
            elements.player2_display_name.textContent = `${this.player[1].name} O`;
        },
        getName(currentPlayer) {
            let temp;
            this.player.forEach(obj => {
                if (obj.symbol == currentPlayer) {
                    temp = obj;
                }
            });
            console.log(temp.name);
            return temp.name;
        },
        setscore() {
            elements.player1_Score.textContent = this.player[0].score;
            elements.player2_Score.textContent = this.player[0].score;
        },
        appendScore(currentPlayer) {
            let temp;
            this.player.forEach(obj => {
                if (obj.symbol == currentPlayer) {
                    obj.score += 1;
                    temp = obj;
                }
            });
            return temp.score;
        }
    }
}

function newGame() {
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

function createNewPlayers() {
    elements.modal.classList.remove("open");
    elements.player1_name.value = '';
    elements.player2_name.value = '';
    return players();
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
    
            switch (playGame.checkPattern()) {
                case false:  break;
                case 'Tie': { 
                    elements.message.textContent = `Both players have drawn the game!`;
                    elements.modal.classList.add("open");
                    break;
                }
                default:
                    const selectScore = document.querySelector(`.player#${currentPlayer} > #score`);
                    selectScore.textContent = newPlayers.appendScore(currentPlayer);
    
                    elements.message.textContent = `${newPlayers.getName(currentPlayer)} has won the game!`;
                    elements.modal.classList.add("open");
            }
            game.printArray(); // print current array in console
        });
    });
    
    elements.replay.forEach((button) => {
        button.addEventListener('click', (event) => {
            if (event.target.getAttribute('id') == 'reset') {
                elements.startDiv.classList.remove('hide');
                newPlayers = createNewPlayers();
                newPlayers.setName();
                newPlayers.setscore();
            }
            playGame = newGame(playGame).resetBoard();
        });
    });

    elements.start.addEventListener('click', (event) => {
        event.target.parentNode.classList.add("hide");
        newPlayers.setName();
    });
}

let playGame = flow();
let newPlayers = players();
runEventListener();