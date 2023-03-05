import React from 'react'
import './card.css'

export default function Card({
  text,
  game,
  type,
}) {
  return (
    <div className="card">
      <div className={`card-${game}-${type}`}>
        <div className="card_text">
          {text}
        </div>
      </div>
    </div>
  )
}
