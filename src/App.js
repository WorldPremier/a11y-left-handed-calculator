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
      if(state.overwrite){
        return {
          ...state,
          currentOperand: payload.digit,
          overwrite: false,
        }
      }
      if (payload.digit === "0" && state.currentOperand === "0") {
        return state
      }
      if (payload.digit ==="." && state.currentOperand.includes(".")) {
        return state
      }
    return {
      ...state,
      currentOperand: `${state.currentOperand || ""}${payload.digit}`,
    }
    case ACTIONS.CHOOSE_OPERATION:
      //current state set to default by nullifying. 
      if(state.currentOperand == null && state.previousOperand == null){
        return state
      }

      //use case when calculating two digits and entering second operand calculation and decide to change operand then operand gets reset by default i.e 5-3+* output:2* meaning if you meant to type multiplication instead of addition after enter 5 then the state will show * instead of + as output
      if(state.currentOperand == null ) {
        return {
          ...state,
          operation: payload.operation,
        }
      }

      //current operand is not included as its already slated into current state listed above.
      //At this point the current state will point to details entered when selecting a number button without
      //previous state by:
      //spreading state then setting operations to --> previous state; previous state --> current state
     
     
      // i.e.             ***************CALCULATOR-output-screen*************
      //                  *                                             56 + * 
      //                  *                                            65945 *
      //                  ****************************************************
      // Diagram 1.1

      if (state.previousOperand ==null){
        return {
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null,
        }
      }
//setting default actions 
      return {
        ...state,
        previousOperand: evaluate(state),
        operation: payload.operation,
        currentOperand: null
      }

    case ACTIONS.CLEAR:
      return {}
    
    case ACTIONS.DELETE_DIGIT:
      if(state.overwrite){
        return {
          ...state,
          overwrite: false,
          currentOperand: null
        }
      }
      if (state.currentOperand == null) return state
      if (state.previousOperand.length ===1){
        return {...state, currentOperand: null}
      }

      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1)//removing last digit instead of returning empty 
      }
    case ACTIONS.EVALUATE:
      if (
        state.operation == null ||
        state.currentOperand == null ||
        state.previousOperand == null
      ){
        return state
      }
      return {
        ...state,
        overwrite: true,
        previousOperand: null,
        operation: null,
        currentOperand: evaluate(state),

      }

  }
}

//convert string into numbers
function evaluate({ currentOperand, previousOperand, operation}){
  
  const prev = parseFloat(previousOperand)
  const current = parseFloat(currentOperand)
//isNaN = is not a number boolean attr
  if(isNaN(prev) || isNaN(current) ) return ""
  let computation = ""
  switch (operation){
    case "+":
      computation = prev + current
      break
    case "-":
      computation = prev - current
      break
    case "*":
      computation = prev * current
      break
    case "/":
      computation = prev / current
      break

  }
  return computation.toString()
}

const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
  maximumFractionDigits: 0,
})

function formatOperand(operand){
  if(operand == null) return
  const [integer, decimal] = operand.split('.')
  if(decimal == null) return INTEGER_FORMATTER.format(integer)
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`
}

 function App() {
  //userReducer hook. ;-) 
  const [{currentOperand, previousOperand, operation }, dispatch] = useReducer(reducer, {})

    // dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit: 1 }})
  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-operand">{formatOperand(previousOperand)}{operation}
        </div>
        <div className="current-operand">{formatOperand(currentOperand)}
        </div>
      </div>
     
      {/* <OperationButton operation="DEL" dispatch={dispatch} /> */}
      <OperationButton operation="/" dispatch={dispatch} />
     
      <button className="span-two"
        onClick={() => dispatch({ type: ACTIONS.CLEAR})}
      >
        AC
      </button>
      <button onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}>
          DEL
      </button>
        
     
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
     
      <button className="span-two" onClick={()=> dispatch({ type: ACTIONS.EVALUATE })}>=</button>
      <DigitButton digit="0" dispatch={dispatch} />
      <DigitButton digit="." dispatch={dispatch} />
    
    </div>
  )
}
export default App