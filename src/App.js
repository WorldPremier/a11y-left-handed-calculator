import "./styles.css"
import { useReducer } from "react"
import DigitButton from "./DigitButton"

 export const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  CHOOSE_OPERATION: 'choose-operation',
  CLEAR: 'clear',
  DELETE_DIGIT: 'delete-digit',
  EVALUATE: 'evaluate'

}

function reducer(state, {type, payload}){
  switch(type) {
    case ACTIONS.ADD_DIGIT:
    return {
      ...state,
      currentOperand: `${currentOperand || ""}${payload.digit}`
    }
  }

}

function App() {
  //userReducer hook. ;-) 
  const [{currentOperand, previousOperand, operation }, dispatch] = useReducer(reducer, {})// takes empty state
  // dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit: 1 }})
  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-operand">{previousOperand}{operation}</div>
        <div className="current-operand">{currentOperand}</div>
      </div>
      {/* <DigitButton digit="/" dispatch={dispatch} /> */}
      <OperationButton digit="/" dispatch={dispatch} />
      <button>DEL</button>
      <button className="span-two">AC</button>
      <button>*</button>
      <button>1</button>
      <button>2</button>
      <button>3</button>
      <button>+</button>
      <button>4</button>
      <button>5</button>
      <button>6</button>
      <button>-</button>
      <button>7</button>
      <button>8</button>
      <button>9</button>
      <button className="span-two">=</button>
      <button>0</button>
      <button>.</button>
    </div>
  )
}
export default App