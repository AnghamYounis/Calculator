"use strict";
class CalculatorUI {
    inputUser = null;
    result = null;
    numbersBtns = null;
    operatorsBtn = null;
    clearBtn = null;
    equalBtn = null;
    logBtn = null;
    selectList = null;
    deleteBtn = null;
    floatBtn = null;
    constructor() {
        this.bindButtons();
        this.calEng = new CalculatorEngine();
    }
    getNumbers() {
        var num = this.dataset.number;
        var value = "";
        value = cal.calEng.setNumber(num);
        cal.showInput(value);
    }
    getOperator() {
        var oper = this.dataset.operator;
        var value = "";
        value = cal.calEng.setOperator(oper);
        cal.showInput(value);
    }
    showInput(newVal) {
        cal.inputUser.innerHTML = newVal;
    }
    getFloatNumber() {
        var floatNum = this.dataset.float;
        var value = "";
        value = cal.calEng.setPoint(floatNum);
        cal.showInput(value);
    }
    bindButtons() {
        this.inputUser = document.getElementById("input");
        this.result = document.getElementById("result");
        this.numbersBtns = document.getElementsByClassName("number-button");
        this.operatorsBtn = document.getElementsByClassName("operator-button");
        this.clearBtn = document.getElementById("clearBtn");
        this.equalBtn = document.getElementById("equalBtn");
        this.logBtn = document.getElementById("logBtn");
        this.deleteBtn = document.getElementById("deleteBtn");
        this.floatBtn = document.getElementById("floatBtn");
        for (var i = 0; i < this.numbersBtns.length; i++) {
            this.numbersBtns[i].addEventListener("click", this.getNumbers);
        }
        for (var i = 0; i < this.operatorsBtn.length; i++) {
            this.operatorsBtn[i].addEventListener("click", this.getOperator);
        }
        this.equalBtn.addEventListener("click", this.getValues);
        this.clearBtn.addEventListener("click", this.clearAll);
        this.logBtn.addEventListener("click", this.showList);
        this.deleteBtn.addEventListener("click", this.deleteValue);
        this.floatBtn.addEventListener("click", this.getFloatNumber);
    }
    showList() {
        this.selectList = document.getElementById("list");
        this.selectList.style.visibility = "visible";
    }
    logData(count) {
        var listOption = document.createElement("option");
        var logList = "";
        logList = cal.calEng.logArray[count].firstNum + " " +
            cal.calEng.logArray[count].operator + " " +
            cal.calEng.logArray[count].secondNum + " = " +
            cal.calEng.logArray[count].result;
        var history = document.createTextNode(logList);
        listOption.appendChild(history);
        this.selectList = document.getElementById("list");
        this.selectList.appendChild(listOption);
    }
    getValues() {
        var result = cal.calEng.calculate();
        cal.result.innerHTML = result;
        var count = cal.calEng.index;
        cal.logData(count);
    }
    deleteValue() {
        var result = cal.calEng.deleteNum();
        cal.inputUser.innerHTML = result;
    }
    clearAll() {
        cal.inputUser.innerHTML = "";
        cal.result.innerHTML = "";
        cal.calEng.clear();
    }
}
/*New Class*/
class CalculatorEngine {
    firstNum = "";
    secondNum = "";
    operator = "";
    logArray = [];
    index = "";
	result = "";
    setNumber(number) {
        var result = "";
        if (this.operator === "") {
            this.firstNum += number;
            result = this.firstNum;
        } else {
            this.secondNum += number;
            result = this.secondNum;
        }
        return result;
    }
    setOperator(operator) {
        this.operator = operator;
        return this.operator;
    }
    setPoint(point) {
        var result = "";
        if (this.operator === "" && this.firstNum.includes(".") !== true) {
            this.firstNum += point;
            result = this.firstNum;
        } else if(this.operator !== "" && this.secondNum.includes(".") !== true) {
            this.secondNum += point;
            result = this.secondNum;
        }
        return result;
    }
    calculate() {
        switch (this.operator) {
            case '+':
				if (this.firstNum.includes(".") === true && this.secondNum.includes(".") === true) {
					this.result = (this.firstNum * 10 + this.secondNum * 10 ) / 10;
				} else {
					this.result = (parseFloat(this.firstNum) + parseFloat(this.secondNum)); 
				}
                break;
            case '-':
                this.result = (parseFloat(this.firstNum) - parseFloat(this.secondNum));
                break;
            case '*':
                this.result = (parseFloat(this.firstNum) * parseFloat(this.secondNum));
                break;
            case '/':
                this.result = (parseFloat(this.firstNum) / parseFloat(this.secondNum));
                break;
        }
        this.saveValues();
        return this.result;
    }
    deleteNum() {
        var newNum = "";
        if (this.firstNum.length > 0 && this.operator === "") {
            this.firstNum = this.firstNum.substring(0, this.firstNum.length - 1);
            newNum = this.firstNum;
        } else if (this.operator.length != 0 && this.secondNum.length == 0) {
            this.operator = this.operator.substring(0, 0);
            newNum = this.operator;
        } else if (this.secondNum.length > 0) {
            this.secondNum = this.secondNum.substring(0, this.secondNum.length - 1);
            newNum = this.secondNum;
        }
        return newNum;
    }
    clear() {
        this.firstNum = "";
        this.secondNum = "";
        this.operator = "";
        this.result = "";
    }
    saveValues() {
        var objData = {
            "firstNum": this.firstNum,
            "operator": this.operator,
            "secondNum": this.secondNum,
            "result": this.result,
        };
        this.logArray.push(objData);
        this.index = (this.logArray.length) - 1;
        return this.logArray;
    }
}
var cal = new CalculatorUI();