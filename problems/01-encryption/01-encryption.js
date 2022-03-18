/* 
    EJERCICIO 01 - ENCRIPTACIÓN DE MENSAJE
*/


function loadFile(event) {
    let input = event.target;
    let reader = new FileReader();


    reader.onload = () => {
        let text = reader.result;
        let lines = text.split("\n");

        let line1 = lines[1].split('');
        let line2 = lines[2].split('');
        let cryptoMessage = lines[3].split('');


        for (let i = 0; i < cryptoMessage.length; i++) {
            let index = cryptoMessage[i];

            for (let j = 0; j < 1; j++) {
                if ((index === cryptoMessage[j+(i+1)]) && (index === cryptoMessage[j+(i+2)])) {
                    cryptoMessage.splice((j+(i+1)), 2);
                } else if (index === cryptoMessage[j+(i+1)]) {
                    cryptoMessage.splice((j+(i+1)), 1);
                } 
            }
        }

        
        console.log({cryptoMessage})
        compareLines(line1, line2, cryptoMessage);
    }

    reader.readAsText(input.files[0]);
}

function dowloadFile (message) {
    let element = document.createElement('a');

    if (message === 0) {
        let text = `SI\nNO`
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    } else if (message === 1) {
        let text = `NO\nSI`
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    } else {
        let text = `NO\nNO`
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    }
    
    element.setAttribute('download', 'resultado-problema1.txt');
    
    element.style.display = 'none';
    document.body.appendChild(element);
    
    element.click();
    
    document.body.removeChild(element);
}

function compareLines (line1, line2, cryptoMessage) {
    let similarities1 = [];
    let similarities2 = [];
    console.log(cryptoMessage)

    for (let i = 0; i < line1.length; i++) {
        
        for (let j = 0; j < cryptoMessage.length; j++) {
            if (line1[i] === cryptoMessage[j]) {
                similarities1.push(cryptoMessage[j]);
            }

            for (let k = 0; k < similarities1.length; k++) {
                if ((similarities1[k] === similarities1[k+1]) && (similarities1[k] === similarities1[k+2])) {
                    similarities1.slice((k+1), 2)
                } else if (similarities1[k] === similarities1[k+1]) {
                    similarities1.splice((k+1), 1);
                } 
            }
        }
    }

    for (let i = 0; i < line2.length; i++) {
        
        for (let j = 0; j < cryptoMessage.length; j++) {
            if (line2[i] === cryptoMessage[j]) {
                similarities2.push(cryptoMessage[j]);
            }

            for (let k = 0; k < similarities2.length; k++) {
                if ((similarities2[k] === similarities2[k+1]) && (similarities2[k] === similarities2[k+2])) {
                    similarities2.slice((k+1), 2)
                } else if (similarities2[k] === similarities2[k+1]) {
                    similarities2.splice((k+1), 1);
                } 
            }
        }
    }

    if (JSON.stringify(line1) === JSON.stringify(similarities1)) {
        let message = 0;
        dowloadFile(message);
    } else if (JSON.stringify(line2) === JSON.stringify(similarities2)) {
        let message = 1;
        dowloadFile(message);
    } else {
        let message = 2;
        dowloadFile(message);
    }
    
}