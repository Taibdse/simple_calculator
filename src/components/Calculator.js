import React from 'react';
import Square from './Square';

class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares : [
                'CE', 'C', 'back', '/', 
                '7', '8', '9','*' , 
                '4', '5', '6', '-', 
                '1', '2', '3', '+',
                '+-', '0', '.', '='
            ],
            calculationStr: '0',
            signs: ['+', '-', '*', '/'],
            result: ''
        };
    } 

    isNumber = (val) => /^[0-9]$/.test(val);

    formatNumber = (val) => {}

    isSign = (val) =>  this.state.signs.some(sign => sign === val.trim());

    handleClick = (text) => {
        const {  calculationStr, result } = this.state;
        
        let newCalculationStr = calculationStr;
        let newResult = result;

        if(this.isNumber(text)){
            if(calculationStr === '0') newCalculationStr = text;
            else newCalculationStr = calculationStr + text;
        } else if(this.isSign(text)) {
            if(calculationStr === '0') return;
            if(this.isSign(calculationStr.slice(-1))) {
                newCalculationStr = calculationStr.substring(0, calculationStr.length - 1) + text;
            } else {
                newCalculationStr = calculationStr + text;
            }
        } else if (text === 'C'){
            newCalculationStr = '0';
            newResult = '';
        } else if (text === '='){
            try {
                newResult = eval(calculationStr);
            } catch (error) {
                alert('Calculation error!!');
            }
        } else if(text === 'back'){
            if(calculationStr.length === '0') return;
            newCalculationStr = calculationStr.substring(0, calculationStr.length - 1);
            if(newCalculationStr === '') newCalculationStr = '0';
        } else if(text === '.'){
            if(calculationStr === '0') return;
            if(!this.isSign(calculationStr[calculationStr.length - 1])){
                newCalculationStr = calculationStr + '.';
            }
        } else if(text === 'CE'){
            if(calculationStr === '0') return;
            for(let i = calculationStr.length - 1; i >= 0; i--){
                if(this.isSign(calculationStr[i])) {
                    newCalculationStr = calculationStr.substring(0, i + 1);
                    break;
                }
            }
        }

        if(newCalculationStr.length > 30) return;

        this.setState({ 
            calculationStr: newCalculationStr, 
            result: newResult 
        });
    }


    render() {
        const { calculationStr, result } = this.state;
     
        return (
            <div className="calculator">
                <div className="display">
                    <div className="calculation">{ calculationStr }</div>
                    <div className="result">{ result }</div>
                </div>
                <div className="keyboard">
                    { this.state.squares.map((square, index) => (
                        <Square key={index} text={square} handleClick={this.handleClick}/>
                    )) }
                </div>
            </div>
        );
    }
}


export default Calculator;
