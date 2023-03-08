import React from 'react'
import Card from './card.js'
import './cards.css'

export default function Cards({
  items,
  type,
}) {
  const [printPages, setPrintPages] = React.useState([])
  const cards = React.useRef([])

  /** 3 cards per row */
  const rows = React.useMemo(() => {
    const itemCount = items.length * 2
    return (
      Array.from({ length: Math.ceil(itemCount / 3) }, (_, row) => (
        Array.from({ length: 3 }, () => Card)
      ))
    )
  }, [items])

  /** 12 cards per page */
  const pages = React.useMemo(() => {
    const itemCount = items.length * 2
    return (
      Array.from({ length: Math.ceil(itemCount / 12) }, (_, page) => (
        /** 4 rows per page */
        Array.from({ length: 4 }, (_, pos) => rows[page * 4 + pos] || null)
      ))
    )
  }, [items, rows])

  const pushEven = React.useCallback((text) => {
    cards.current.push(() => <Card game="swipe" type={type} text={text} />)
    cards.current.push(() => <Card game="swipe" type={type} />)
  }, [type])

  const pushOdd = React.useCallback((text) => {
    cards.current.push(() => <Card game="swipe" type={type} />)
    cards.current.push(() => <Card game="swipe" type={type} text={text} />)
  }, [type])

  React.useEffect(() => {
    cards.current = []
    /** Populate cards with items and backfaces */
    items.forEach((text, i) => {
      const pageIndex = Math.floor(i / 6)
      if (pageIndex % 2) {
        pushEven(text)
      } else {
        pushOdd(text)
      }
    })
  }, [items, type, pushEven, pushOdd])

  React.useEffect(() => {
    /** Add card components to rows */
    cards.current?.forEach((component, i) => {
      const r = Math.floor(i / 3)
      if (rows[r]) {
        rows[r][i % 3] = component
      }
    })
    setPrintPages(pages)
  }, [pages, rows])

  return (
    <div className="cards">
      {/** Print */}
      {printPages.map((page, p) => (
        <div key={`print-card-page-${p}`} className={`card-page page-${type} print`}>
          {page.map((row, r) => (
            <div key={`print-card-row-${r}`} className="card-row">
              {row?.map((Item, i) => (
                Item ? <Item key={`print-card-item-${i}`} /> : null
              ))}
            </div>
          ))}
        </div>
      ))}
      {/** Display */}
      <div className="card-list no-print">
        {items.map((text, i) => (
          <Card key={`card-item-${i}`} game="swipe" type={type} text={text} />
        ))}
      </div>
    </div>
  )
}
