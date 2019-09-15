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
            lastSign: '',
            lastResult: '',
            signs: ['+', '-', '*', '/', '+-']
        };
    } 

    isNumber = (val) => /^[0-9]$/.test(val);

    formatNumber = (val) => {}

    isSign = (val) =>  this.state.signs.some(sign => sign === val.trim());

    calculateResult = (calculationStr) => {
        const { signs } = this.state;
        if(calculationStr === '0') return '0';
        const arr = calculationStr.replace(new RegExp(''), ' $& ').split(' ');  
        console.log(arr);
        if(arr.length <= 1) return arr[0];

        let result = 0;
        return calculationStr;
    }

    handleClick = (text) => {
        const {  calculationStr, lastResult } = this.state;
        let newCalculationStr = calculationStr;
        let newLastResult = lastResult;
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
            this.setState({ lastSign: text });
        } else if (text === 'C'){
            newCalculationStr = '0';
        } else if (text === '='){
            
        }

        console.log(this.evil(calculationStr));
        this.setState({ calculationStr: newCalculationStr });
    }


    getDownDisplay = (calculationStr) => {
        if(calculationStr === '') return '';
        return calculationStr.substring(calculationStr.lastIndexOf(this.state.lastSign), -1);
    }

    getUpDisplay = (calculationStr) => {
        const { lastSign } = this.state;
        if(calculationStr === '' || lastSign === '') return '';
        
        return calculationStr.substring(0, calculationStr.lastIndexOf(lastSign) + 1);
    }

    render() {
        const { calculationStr } = this.state;
        const downDisplay = this.getDownDisplay(calculationStr);
        const upDisplay = this.getUpDisplay(calculationStr);

        return (
            <div className="calculator">
                <div className="display">
                    <div className="up">{ upDisplay }</div>
                    <div className="down">{ downDisplay }</div>
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
