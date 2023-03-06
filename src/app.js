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
      <header className={`app-header animate no-print ${hasCards ? 'app-header__fixed' : ''}`}>
        {!cards.length ? (
          <FileUploader onSelect={handleSelect}>
            <div className="button">välj fil</div>
          </FileUploader>
        ) : null}
        {cards.length ? (
          <div className="button" onClick={handlePrint}>Printa</div>
        ) : null}
        {cards.length ? (
          <div className="button button__secondary" onClick={handleClear}>Rensa</div>
        ) : null}
        <form id="form" onChange={(data) => handleTypeChange(data)}>
          <label className="form-control">
            <input
              type="radio"
              id="typeA"
              name="type"
              value="a"
              defaultChecked={type === 'a' ? true : false}
            />
            egenskaper
          </label>
          <label className="form-control">
            <input
              type="radio"
              id="typeB"
              name="type"
              value="b"
              defaultChecked={type === 'b' ? true : false}
            />
            röd flagga
          </label>
        </form>
      </header>
      <a className="logo-container no-print" href="https://www.ninjaprint.se">
        <img className="logo-source" src="logo.png" />
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
        <div className="description">
          Filen som laddas upp måste vara i formatet <b>csv</b>.
        </div>
      )}
    </div>
  )
}

export default App
