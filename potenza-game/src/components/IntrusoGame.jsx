import { useState, useEffect, useRef } from 'react'
import correctSound from '../assets/sounds/correct.mp3'
import tryAgainSound from '../assets/sounds/tryagain.mp3'
import apple from '../assets/images/apple.png'
import banana from '../assets/images/banana.png'
import orange from '../assets/images/orange.png'
import car from '../assets/images/car.png'

const images = [
  { src: apple, category: 'fruit' },
  { src: banana, category: 'fruit' },
  { src: orange, category: 'fruit' },
  { src: car, category: 'car' }
]

const shuffle = (arr) => arr.sort(() => Math.random() - 0.5)

function IntrusoGame({ onCorrect }) {
  const [items, setItems] = useState([])
  const [feedback, setFeedback] = useState(null)
  const correctAudio = useRef(new Audio(correctSound))
  const wrongAudio = useRef(new Audio(tryAgainSound))

  useEffect(() => {
    setItems(shuffle([...images]))
  }, [])

  const handleClick = (item) => {
    const isIntruder = item.category !== 'fruit'
    if (isIntruder) {
      correctAudio.current.play()
      setFeedback('correct')
      onCorrect()
    } else {
      wrongAudio.current.play()
      setFeedback('wrong')
      const stats = JSON.parse(localStorage.getItem('stats') || '{"correct":0,"wrong":0}')
      localStorage.setItem('stats', JSON.stringify({ ...stats, wrong: stats.wrong + 1 }))
    }
    setTimeout(() => {
      setFeedback(null)
      setItems(shuffle([...images]))
    }, 800)
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Trova l\'intruso</h2>
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        {items.map((img, idx) => (
          <img
            key={idx}
            src={img.src}
            alt={img.category}
            width={120}
            height={120}
            style={{ cursor: 'pointer' }}
            onClick={() => handleClick(img)}
          />
        ))}
      </div>
      {feedback === 'correct' && <div style={{ fontSize: '4rem', color: 'green' }}>😊</div>}
      {feedback === 'wrong' && <div style={{ fontSize: '4rem', color: 'orange' }}>🙁</div>}
    </div>
  )
}

export default IntrusoGame
