import React from 'react'
import FileUploader from './file-uploader.js'
import Card from './card.js'
import './app.css'

function App() {
  const [cards, setCards] = React.useState([])

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

  return (
    <div className="App">
      <header className="App-header no-print">
        <a className="logo-container" href="https://www.ninjaprint.se">
          <img className="logo-source" src="logo.png" />
        </a>
        {!cards.length ? (
          <FileUploader onSelect={handleSelect}>
            <div className="button">Välj fil</div>
          </FileUploader>
        ) : null}
        {cards.length ? (
          <div className="button" onClick={handlePrint}>Printa</div>
        ) : null}
        {cards.length ? (
          <div className="button button__secondary" onClick={handleClear}>Rensa</div>
        ) : null}
        <label class="form-control">
          <input type="radio" name="radio" checked />
          Egenskaper
        </label>
        <label class="form-control">
          <input type="radio" name="radio" />
          Röd flagga
        </label>
      </header>
      <div className="cards">
        {cards.map((text, i) => (
          <div className="card-set">
            <Card game="swipe" type="red-flag" text={text} />
            <Card game="swipe" type="red-flag" />
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
