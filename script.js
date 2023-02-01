const previousOperationText = document.querySelector("#previous-operation")
const currentOperationText = document.querySelector("#current-operation")
const buttons = document.querySelectorAll("#buttons-container button")

class RGBCalculator {
    constructor(previousOperationText, currentOperationText) {
        this.previousOperationText = previousOperationText
        this.currentOperationText = currentOperationText
        this.currentOperation = ""
    }

    addDigit(digit) {
        if (digit === "." && this.currentOperationText.innerText.includes(".")) {
            return;
        }
        this.currentOperation = digit
        this.updateScreen()
    }

    processOperation(operation) {

        //check if current is empty
        if (this.currentOperationText.innerText === "" && operation !== "C") {
            //Change operation
            if (this.previousOperationText.innerText !== "") {
                this.changeOperation(operation)
            }
            return;
        }

        let operationValue
        let previous = +this.previousOperationText.innerText.split(" ")[0]
        let current = +this.currentOperationText.innerText

        switch (operation) {
            case "+":
                operationValue = previous + current
                this.updateScreen(operationValue, operation, current, previous)
                break;
            case "-":
                operationValue = previous - current
                this.updateScreen(operationValue, operation, current, previous)
                break;
            case "/":
                operationValue = previous / current
                this.updateScreen(operationValue, operation, current, previous)
                break;
            case "*":
                operationValue = previous * current
                this.updateScreen(operationValue, operation, current, previous)
                break;
            case "DEL":
                this.processDelOperation()
                break;
            case "CE":
                this.clearOperation()
                break;
            case "C":
                this.clearAllOperation()
                break;
            case "=":
                this.processEqualOperation()
                break;
            default:
                return;
        }
    }

    updateScreen(operationValue = null,
        operation = null,
        current = null,
        previous = null) {
        console.log(operationValue, operation, current, previous)

        if (operationValue === null) {
            this.currentOperationText.innerText += this.currentOperation
        } else {
            if (previous === 0) {
                operationValue = current
            }
            this.previousOperationText.innerText = `${operationValue} ${operation}`
            this.currentOperationText.innerText = ""
        }
    }
    // change math operation
    changeOperation(operation) {
        const mathOperations = ["*", "/", "+", "-"]
        if (!mathOperations.includes(operation)) {
            return
        }
        this.previousOperationText.innerText = this.previousOperationText.innerText.slice(0, -1) + operation
    }

    //Del the last digit
    processDelOperation() {
        this.currentOperationText.innerText = this.currentOperationText.innerText.slice(0, -1)
    }

    //clear operation
    clearOperation() {
        this.currentOperationText.innerText = ""
    }

    //clear all operation
    clearAllOperation() {
        this.currentOperationText.innerText = ""
        this.previousOperationText.innerText = ""
    }

    //Process an operation
    processEqualOperation() {
        const operation = previousOperationText.innerText.split(" ")[1]
        this.processOperation(operation)
    }
}

const calc = new RGBCalculator(previousOperationText, currentOperationText)

//checking numbers
buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const value = e.target.innerText
        if (+value >= 0 || value === ".") {
            calc.addDigit(value)
        } else {
            calc.processOperation(value)
        }
    })
})