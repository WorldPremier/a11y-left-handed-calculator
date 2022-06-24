import "./styles.css"

function App() {
  return (
    <div className="calculator-grid">
      <div className="output">a11y 1.0
        <div className="previous-operand">Left Handed</div>
        <div className="current-operand">Calculator</div>
      </div>
      <button>/</button>
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