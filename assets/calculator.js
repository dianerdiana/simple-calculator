const calculator = {
  displayNumber: '0',
  operator: null,
  firstNumber: null,
  waitingForSecondNumber: false,
}

const updateDisplay = () => {
  document.querySelector('#displayNumber').innerText = calculator.displayNumber
}

const clearCalculator = () => {
  calculator.displayNumber = '0'
  calculator.operator = null
  calculator.firstNumber = null
  calculator.waitingForSecondNumber = false
}

const inputDigit = (digit) => {
  if (calculator.displayNumber === '0') {
    calculator.displayNumber = digit
  } else {
    calculator.displayNumber += digit
  }
}

const buttons = document.querySelectorAll('.button')
for (let button of buttons) {
  button.addEventListener('click', (e) => {
    const target = e.target

    if (target.classList.contains('clear')) {
      clearCalculator()
      updateDisplay()
      return
    }

    if (target.classList.contains('negative')) {
      inverseNumber()
      updateDisplay()
      return
    }

    if (target.classList.contains('equals')) {
      performCalculator()
      updateDisplay()
      return
    }

    if (target.classList.contains('operator')) {
      handleOperator(target.innerText)
      return
    }

    inputDigit(target.innerText)
    updateDisplay()
  })
}

const inverseNumber = () => {
  if (calculator.displayNumber === '0') {
    return
  }

  calculator.displayNumber = calculator.displayNumber * -1
}

const handleOperator = (operator) => {
  if (!calculator.waitingForSecondNumber) {
    calculator.waitingForSecondNumber = true
    calculator.operator = operator
    calculator.firstNumber = calculator.displayNumber
    calculator.displayNumber = '0'
  } else {
    alert('operator has been used')
  }
}

const performCalculator = () => {
  if (calculator.firstNumber === null || calculator.operator === null) {
    alert("You don't set the operator")
    return
  }

  let result = 0
  if (calculator.operator === '+') {
    result =
      parseInt(calculator.firstNumber) + parseInt(calculator.displayNumber)
  } else {
    result =
      parseInt(calculator.firstNumber) - parseInt(calculator.displayNumber)
  }

  const history = {
    firstNumber: calculator.firstNumber,
    secondNumber: calculator.displayNumber,
    operator: calculator.operator,
    result: result,
  }

  putHistory(history)
  calculator.displayNumber = result
  renderHistory()
}
