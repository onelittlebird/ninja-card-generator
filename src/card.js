import React from 'react'
import './card.css'

export default function Card({
  text,
  game,
  type,
}) {
  return (
    <div className={`card transition card-${game}-${type}`}>
      {text ? (
        <div className="card_text">
          {text}
        </div>
      ) : (
        <img alt="" className={`card-${game}-image`} src={`${game}-card-${type}.png`} />
      )}
    </div>
  )
}
