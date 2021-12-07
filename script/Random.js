class Random {
    static hiddenNumber() {
        let hide = [];
        while(hide.length < 4) {
            let random = Math.floor(Math.random() * 10);
            if(!hide.includes(random)) {
                hide.push(random);
            }
            if(hide[0] === 0 ) {
                hide = [];
            }
        }
        return hide;
    }
}