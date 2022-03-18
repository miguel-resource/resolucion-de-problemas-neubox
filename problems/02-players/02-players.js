/* 
    EJERCICIO 02 - RONDAS DE JUGADORES
*/

let playerScoreWinner1 = [];
let playerScoreWinner2 = [];

function loadFile(event) {
    let input = event.target;
    let reader = new FileReader();

    reader.onload = () => {
        let text = reader.result;  
        let lines = text.split('\n');

        for (var line = 1; line < lines.length; line++) {
            let player1 = 0;
            let player2 = 0;
            let points = lines[line].split(' ');

            points.forEach ((element, index) => {
                let core = parseInt(element);
                index !== 0 ? player2 = core: player1 = core;

                if ((player2 !== 0) && (player1 > player2)) {
                    let leader = player1 - player2;
                    playerScoreWinner1.push(leader);
                } else if (player2 > player1) {
                    let leader = player2 - player1;
                    playerScoreWinner2.push(leader);
                }
            });


        }
        let maxScore1 = Math.max(...playerScoreWinner1);
        let maxScore2 = Math.max(...playerScoreWinner2);

        while ((maxScore1 === maxScore2)) {
            maxScore1 = playerScoreWinner1.find(element => element < maxScore1);
            maxScore2 = playerScoreWinner2.find(element => element < maxScore2);
        }
        
        if (maxScore1 > maxScore2) {
            dowloadFile(`1 ${maxScore1}`) 
        } else {
            dowloadFile(`2 ${maxScore2}`)
        }

    }
    
    reader.readAsText(input.files[0]);
}

function dowloadFile (text) {
    let element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', 'resultado-problema2.txt');
    
    element.style.display = 'none';
    document.body.appendChild(element);
    
    element.click();
    
    document.body.removeChild(element);
      
}



