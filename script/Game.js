class Game {

    constructor() {
        this.playerNum = [];
        this.hideNum = [];
        this.bull = 0;
        this.cows = 0;
        this.player = {
            point: 0,
            overGame: false,
            error: false,
            wins: 0,
            step: 0
        } 
    }

    getNumber() {
        let setNum = [], uniqArray = [];
        let num = document.getElementById('inner').value;
        setNum = num.split('').map(Number);

        uniqArray = ([...new Set(setNum)]);

        if(setNum.length == 0 ){
            return Random.hiddenNumber();
         }

        if(uniqArray.length != 4 || num instanceof String) {
            this.player.error = true;
            return this.player.error;
        }
        if(setNum.length == 4) {
            return setNum;
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
        if(this.bull == 4) {
            this.player.overGame = true
            this.player.point += 100;
            this.player.wins += 1;
            return this.player.overGame
        }
    }
    
    getHTML() {
        let app = document.getElementById("app");
        
            this.init();
            this.player.step += 1;
            console.log(this.hideNum);
            document.getElementById('inner').value = "";
            let randomMessage = Math.floor(Math.random() * 4);

            let player = true;
            for(let i = 0; i < 2; i++) {
                let message = document.createElement('div'),
                    name = document.createElement('h2'),
                    text = document.createElement('p');
                
                app.append(message);
                message.append(name,text);

                if(this.player.error) {
                    message.classList.add('message','message-user');
                    name.innerHTML = "Игрок";
                    text.innerHTML = `Неверный формат числа! Цифры не должны повторяться, а число должно быть 4-значным`;
                    this.player.error = false;
                    break;
                }


                if(player) {
                    message.classList.add('message','message-user');
                    name.innerHTML = "Игрок";
                    if(randomMessage == 1 || randomMessage == 0) {
                        text.innerHTML = `Я думаю число будет: <strong style="font-size: 18px;">${this.playerNum.join(' ')}</strong>`
                    } else {
                        text.innerHTML = `Хм а если вот такое число: <strong style="font-size: 18px;">${this.playerNum.join(' ')}</strong>`
                    }
                    
                    player = false;
                    continue;
                } 

                if(this.player.overGame) {
                    message.classList.add('message','message-computer', 'statistics');
                    if(this.player.step < 5) {
                        text.innerHTML = `
                        <b>Ничего себе, даже я не смог бы!</b> <br/>
                        <strong >Вы выйграли</strong> &#127881;  <br/>
                        Статистка игры: <br />
                        Выйграно игр: <strong >${this.player.wins}</strong>;<br />
                        Сделано ходов: <strong >${this.player.step}</strong>;<br />
                        Получено очков: <strong >+100</strong>; <br />
                        Всего очко: <strong >${this.player.point}
                        `
                    } else {
                        text.innerHTML = `
                        <b>Ничего себе, даже я не смог бы!</b> <br/>
                        <strong >Вы выйграли</strong> &#127881;  <br/>
                        Статистка игры: <br />
                        Выйграно игр: <strong >${this.player.wins}</strong>;<br />
                        Сделано ходов: <strong >${this.player.step}</strong>;<br />
                        Получено очков: <strong >+100</strong>; <br />
                        Всего очко: <strong >${this.player.point}
                        `
                    }
                    if(this.player.step > 20) {
                        text.innerHTML = `
                        <b>ХА-ХА-ХА я загадал сложное число!</b> <br/>
                        <strong >Вы выйграли</strong> &#127881;  <br/>
                        Статистка игры: <br />
                        Выйграно игр: <strong >${this.player.wins}</strong>;<br />
                        Сделано ходов: <strong >${this.player.step}</strong>;<br />
                        Получено очков: <strong >+100</strong>; <br />
                        Всего очко: <strong >${this.player.point}
                        `
                    }
                    
                    let restartButton = document.createElement('button');
                    message.append(restartButton);
                    restartButton.classList.add('restart');
                    restartButton.innerHTML = "Начать заново";
                    restartButton.addEventListener("click", () => {
                        this.restart();
                        while(app.children.length > 1 ) {
                            app.removeChild(app.lastElementChild);
                        }
                    });

                    break;
                }
                
                if(!player) {
                    message.classList.add('message','message-computer');
                    name.innerHTML = "Компьютер";
                    if(randomMessage == 0) {
                        text.innerHTML = ` Неа! Но вот что есть: <br />
                        Быков: <strong style="font-size: 18px">${this.bull}</strong> <br />
                         Коров: <strong style="font-size: 18px">${this.cows}</strong>`
     
                    } else if(randomMessage == 1) {
                        text.innerHTML = ` Нет, нет, нет... Так дело не пойдет: <br />
                        Быков: <strong style="font-size: 18px">${this.bull}</strong> <br />
                         Коров: <strong style="font-size: 18px">${this.cows}</strong>`
     
                    } else {
                        text.innerHTML = ` Эх...Человечешка, вот что есть: <br />
                        Быков: <strong style="font-size: 18px">${this.bull}</strong> <br />
                         Коров: <strong style="font-size: 18px">${this.cows}</strong>`
     
                    }
                    
                }
                
                
            }
            app.scrollTop = app.scrollHeight - app.clientHeight;
        

        
    }
    viewupdate() {
        let submit = document.getElementById('answer');
        let input = document.getElementById('inner');
        let app = document.getElementById("app");
        submit.addEventListener('click', () =>  {
            this.getHTML();
            input.focus();
        });
        input.addEventListener('keydown', (e) => {
            if(e.code == 'Enter') {
                this.getHTML();
                input.focus();
            }
        })
        document.body.addEventListener('keydown', () => {
            if(event.code == 'KeyZ' && (event.ctrlKey || event.metaKey)) {
                this.restart();
                input.focus();
                        while(app.children.length > 1 ) {
                            app.removeChild(app.lastElementChild);
                        }
            }
        })
    }
    start() {
        this.viewupdate();
        this.hideNum = Random.hiddenNumber();
    }
    
    restart() {
        this.bull = this.cows = 0;
        this.hideNum = this.playerNum = [];
        this.player.overGame = false;
        this.player.step = 0;
        this.hideNum = Random.hiddenNumber();
    }
}