import React from 'react'
import FileUploader from './file-uploader.js'
import Card from './card.js'
import './app.css'

function App() {
  const [cards, setCards] = React.useState([])
  const [type, setType] = React.useState('a')

  const handleSelect = React.useCallback((file) => {
    /** Remove empty lines */
    const cards = file.split('\r\n').filter(row => (
      row.replace(/ /g, '') !== ''
    ))
    setCards(cards)
  }, [])

  const handleClear = React.useCallback(() => {
    setCards([])
  }, [])

  const handlePrint = React.useCallback(() => {
    window.print()
  }, [])

  const handleTypeChange = React.useCallback((data) => {
    const value = document.querySelector("#form").elements.type.value
    setType(value)
  }, [])

  const hasCards = cards.length

  return (
    <div className={`app ${!hasCards ? 'app__center' : ''}`}>
      <header className={`app-header transition no-print ${hasCards ? 'app-header__fixed' : ''}`}>
        {!cards.length ? (
          <FileUploader onSelect={handleSelect}>
            <div className="button transition">välj fil</div>
          </FileUploader>
        ) : null}
        {hasCards ? (
          <div className="button transition" onClick={handlePrint}>printa</div>
        ) : null}
        {hasCards ? (
          <div className="button transition button__secondary" onClick={handleClear}>rensa</div>
        ) : null}
        <form id="form" onChange={(data) => handleTypeChange(data)}>
          <label className="label">
            <input
              type="radio"
              name="type"
              value="a"
              defaultChecked={type === 'a' ? true : false}
              className="transition"
            />
            egenskaper
          </label>
          <label className="label">
            <input
              type="radio"
              name="type"
              value="b"
              defaultChecked={type === 'b' ? true : false}
              className="transition"
            />
            röda flaggor
          </label>
        </form>
      </header>
      <a className="logo-container no-print" href="https://www.ninjaprint.se">
        <img alt="logo" className="logo-source" src="logo.png" />
      </a>
      {hasCards ? (
        <div className="cards">
          {cards.slice(0, 100).map((text, i) => (
            <div className="card-set">
              <Card game="swipe" type={type} text={text} />
              <Card game="swipe" type={type} />
            </div>
          ))}
        </div>
      ) : (
        <div className="description transition">
          Filen som laddas upp måste vara i formatet <b>csv</b>.
        </div>
      )}
    </div>
  )
}

export default App
