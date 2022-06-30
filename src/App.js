import { useReducer } from "react";
import "./styles.css";
import DigitButton from "./DigitButton";//module has several named ///parameters
import OperationButton from "./OperationButton"


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
      currentOperand: `${state.currentOperand || ""}${payload.digit}`,
    }
  }

}

 function App() {
  //userReducer hook. ;-) 
  const [{currentOperand, previousOperand, operation }, dispatch] = useReducer(reducer, {})
  //line 30 default way to do it. Removed for enhancement.
  //dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit: 1} })
  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-operand">{previousOperand}{operation}</div>
        <div className="current-operand">{currentOperand}</div>
      </div>
      <OperationButton operation="/" dispatch={dispatch} />
      <OperationButton operation="DEL" dispatch={dispatch} />
     
      <button className="span-two">AC</button>
      <OperationButton operation="*" dispatch={dispatch} />
   
      <DigitButton digit="1" dispatch={dispatch} />
      <DigitButton digit="2" dispatch={dispatch} />
      <DigitButton digit="3" dispatch={dispatch} />
      <OperationButton operation="+" dispatch={dispatch} />
    
      <DigitButton digit="4" dispatch={dispatch} />
      <DigitButton digit="5" dispatch={dispatch} />
      <DigitButton digit="6" dispatch={dispatch} />
      <OperationButton operation="-" dispatch={dispatch} />

      <DigitButton digit="7" dispatch={dispatch} />
      <DigitButton digit="8" dispatch={dispatch} />
      <DigitButton digit="9" dispatch={dispatch} />
     
      <button className="span-two">=</button>
      <DigitButton digit="0" dispatch={dispatch} />
      <DigitButton digit="." dispatch={dispatch} />
    
    </div>
  )
}
export default App