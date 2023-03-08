import React from 'react'
import './card.css'

export default function Card({
  text,
  game,
  type,
}) {
  return (
    <div className={`card ${!text ? 'card__no-background' : ''} transition card-${game}-${type}`}>
      {text ? (
        <div className="card_text">
          {text}
        </div>
      ) : null}
    </div>
  )
}
