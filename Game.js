class Game {
    constructor() {
        this.playerNum = [];
        this.hideNum = [];
        this.bull = 0;
        this.cows = 0;
        this.point = 0;
    }

    getNumber() {
        let setNum = [], uniqArray = [];
        let num = document.getElementById('inner').value;
        setNum = num.split('').map(Number);

        uniqArray = ([...new Set(setNum)]);

        if(setNum.length == 0 ){
            console.log('error');
            return Random.hiddenNumber();
         }

        if(setNum.length == 4) {
            return setNum;
        }

        if(uniqArray.length != 4 ) {
            console.log("error idiot")
        }        
    }
    setCowsAndBolls() {
        let bull,cows;
        bull = cows = 0;

        for(let i = 0; i < this.hideNum.length; i++) {
            for(let j = 0; j < this.playerNum.length; j++) {
                if(this.hideNum[i] === this.playerNum[j] && i === j) {
                    bull++;
                } 
                if(this.hideNum[i] === this.playerNum[j] && i != j) {
                    cows++;
                }
            }
        }

        this.bull = bull;
        this.cows = cows;
    }
    init() {
        this.playerNum = this.getNumber();
        this.setCowsAndBolls();
        console.log(this.hideNum);
        console.log(this.playerNum + ' player');
        console.log(this.bull + " bulls");
        console.log(this.cows + " cows");
        if(this.bull == 4) {
            this.over(true);
        }
    }
    getHTML() {
        let app = document.getElementById("app");
        let windowGame = document.createElement('div');
        windowGame.classList.add('answerwindow');

        app.prepend(windowGame);

        
        let buttonAnswer = document.getElementById("answer")
        buttonAnswer.addEventListener('click', () => {
            this.init();
            let gamePlayer = true;
            for(let i = 0; i < 2; i++) {
                let message = document.createElement("div"),
                name = document.createElement('h3'),
                text = document.createElement('p');
        
                windowGame.append(message);
                message.append(name);
                message.append(text);
        
                if(gamePlayer) {
                name.innerHTML="Player";
                text.innerHTML=`${this.playerNum}`;
                
                message.classList.add(
                    "message_block", "answerwindow__message_user"
                )
                gamePlayer= false;
                } else {
                    name.innerHTML="Computer";
                    text.innerHTML=`${this.hideNum}`;
                    message.classList.add(
                        "message_block",
                        "answerwindow__message_computer"
                    )
                }
            }
            
        })

      return windowGame;
    }

    start() {
        // let windowGame = document.createElement('div'),
            // message = document.createElement("div"),
            // name = document.createElement('h3'),
            // text = document.createElement('p');

        // windowGame.classList.add('answerwindow');
        // windowGame.id = "windowGame";
        // message.classList.add("info-game");
        // windowGame.append(message);
        // message.append(name);
        // message.append(text);
        // name.innerHTML = "Помощник";
        // text.innerHTML = `
        //     <strong>Правила игры:</strong> загадывается 4-значное число 
        //     (цифры в нем не повторяются, а число может
        //          начинаться с 0), цель игрока — отгадать это 
        //          число. После каждой попытки бот сообщает игроку, 
        //          сколько цифр угадано с совпадением их позиции в 
        //          исходном числе (быки) и сколько угадано без 
        //          совпадения с позицией (коровы).
        // `;
        this.getHTML();
        this.hideNum = Random.hiddenNumber();
        
    }
    over(stop) {
        let stops = stop;
        if(stops == true) {
            console.log('Конец');
            this.bull = this.cows = 0;
            this.playerNum = this.playerNum = [];
            this.point += 100;
        } 
    }
}