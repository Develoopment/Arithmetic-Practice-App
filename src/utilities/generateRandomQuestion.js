export const generateRandomQuestion = () => {

    // add more operators here
    const operators = ["+", "-"];
    
    const firstOperand = Math.floor(Math.random()*100);
    const secondOperand = Math.floor(Math.random()*100);
    
    const randomIndex = Math.round(Math.random()*(operators.length-1));
    // console.log(randomIndex);
    const operator = operators[randomIndex];

    const question = `${firstOperand} ${operator} ${secondOperand} = `;
    let answer = 0;
    if(operator === "+"){
        answer = firstOperand + secondOperand;
    }else if(operator === "-"){
        answer = firstOperand - secondOperand;
    }

    // console.log(answer);

    return {question, answer}

}

// module.exports = generateRandomQuestion;