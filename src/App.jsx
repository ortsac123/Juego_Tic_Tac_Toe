import { useState } from 'react'
import './App.css'

const TURNS = {
  X: 'x',
  O: 'o'
}

const Squar = ({ children, index, updateBoard, isSelected }) => {


  const className = `square ${isSelected ? 'is-selected' : ''}`
  const handleClick = () => {
    updateBoard(index)
  }

  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  )
}

const WINTER = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

function App() {

  const [boarts, setBoarts] = useState(Array(9).fill(null))
  const [turn, setTurn] = useState(TURNS.O)
  const [winner, setWinner] = useState(null)


  const checkWinner = (boartCheck) => {
    for (const combination of WINTER) {
      const [a, b, c] = combination;
      if (boartCheck[a] &&
        boartCheck[a] == boartCheck[b] &&
        boartCheck[a] == boartCheck[c]) {
        return boartCheck[a];
      }
    }
    return null;

  }

  const updateBoard = (index) => {
    if (boarts[index] || winner) return

    const newBoart = [...boarts]
    newBoart[index] = turn
    setBoarts(newBoart)

    const newTurn = turn == TURNS.O ? TURNS.X : TURNS.O


    const newWinner = checkWinner(newBoart)
    if (newWinner) {

      setWinner(newWinner)

    }

    setTurn(newTurn)
  }

  const restartGame = () => {
    setBoarts(Array(9).fill(null))
    setWinner(null)
  }
  return (
    <main className='board'>
      <h1>Tic Tac Toe</h1>
      <section className='game'>
        {
          boarts.map((_, index) => {
            return (
              <Squar key={index} index={index} updateBoard={updateBoard}>
                {boarts[index]}
              </Squar>
            )
          })
        }
      </section>
      <section className='turn'>
        <Squar isSelected={turn == TURNS.X} >{TURNS.X}</Squar>
        <Squar isSelected={turn == TURNS.O} >{TURNS.O}</Squar>
      </section>
      <strong>
        <button onClick={restartGame} >Reiniciar juego</button>
      </strong>
    </main>

  )
}

export default App
