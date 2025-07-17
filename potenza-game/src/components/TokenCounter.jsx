import { useState, useEffect } from 'react'
import star from '../assets/react.svg'
import '../App.css'

function TokenCounter({ tokens }) {
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    if (tokens >= 5) {
      setAnimate(true)
      setTimeout(() => setAnimate(false), 3000)
    }
  }, [tokens])

  return (
    <div className="token-counter">
      {Array.from({ length: Math.min(tokens, 5) }).map((_, i) => (
        <span key={i}>⭐</span>
      ))}
      {animate && <img src={star} className="reward" alt="reward" />}
    </div>
  )
}

export default TokenCounter
