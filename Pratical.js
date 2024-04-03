import React, { useState } from 'react';

function Practical() {
    const [postfixExpression, setPostfixExpression] = useState('');
    const [result, setResult] = useState('');
   
    const [operationHistory, setOperationHistory] = useState([]);

    const evaluatePostfix = () => {
        const stack = [];
        const expressionLength = postfixExpression.length;
        const history = [];

        for (let i = 0; i < expressionLength; i++) {
            const char = postfixExpression[i];

            if (!isNaN(parseInt(char))) {
                stack.push(parseInt(char));
            } else {
                const operand2 = stack.pop();
                const operand1 = stack.pop();

                let result;
                let operation;

                switch (char) {
                    case '+':
                        result = operand1 + operand2;
                        operation = '+';
                        stack.push(result);
                        break;
                    case '-':
                        result = operand1 - operand2;
                        operation = '-';
                        stack.push(result);
                        break;
                    case '*':
                        result = operand1 * operand2;
                        operation = '*';
                        stack.push(result);
                        break;
                    case '/':
                        result = operand1 / operand2;
                        operation = '/';
                        stack.push(result);
                        break;
                    default:
                        break;
                }

                // Store operation
                history.push({ operand1, operand2, operation });
            }
        }

        setResult(stack[0]);
       
        setOperationHistory(history); // Store operation history
    };

    return (
        <div style={{textAlign:'center',marginTop:'5%'}}>
        <h2>Postfix Expression Evaluator</h2>
        <input
            type="text"
            value={postfixExpression}
            onChange={(e) => setPostfixExpression(e.target.value)}
            placeholder="Enter postfix expression"
        />
        <button onClick={evaluatePostfix}>Evaluate</button>
        {result !== '' && (
            <div>
               
                <p>Result: {result}</p>
                <label>
                    {postfixExpression} will evaluate to {operationHistory.map((operation, index) => (
                        <span key={index}>
                            {operation.operand1} {operation.operation} {operation.operand2}
                            {index !== operationHistory.length - 1 ? ", " : ""}
                        </span>
                    ))} = {result}
                </label>
            </div>
        )}
    </div>
    );
}

export default Practical;
