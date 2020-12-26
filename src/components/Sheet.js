import styled from 'styled-components'
import { TEST_SHEETS } from '../containers/pages/Sheets'
import { useWindowSize, useScroll, useScrolling } from 'react-use'
import Cell, { DEFAULT_CELL_HEIGHT, DEFAULT_CELL_WIDTH } from './Cell'
import { useRef, useState } from 'react'
import romanize from '../utils/romanize'
import InvisibleInput from './InvisibleInput'

const TEST_SHEET_CELLS = [
  { row: 1, col: 1, data: '123123' },
  { row: 2, col: 1, data: '1235123' },
  { row: 3, col: 1, data: '123123' },
  { row: 1, col: 2, data: '13253123' },
  { row: 1, col: 3, data: '123123' },
  { row: 2, col: 4, data: '123123' },
  { row: 5, col: 5, data: '1231231' },
  { row: 1, col: 6, data: '1231223' },
  { row: 7, col: 3, data: '1263123' },
  { row: 9, col: 1, data: '1232123' }
]

const SheetWrapper = styled.div`
  font-size: 0.7em;
`

const SheetMetaForm = styled.div`
  position: sticky;
  top: 60px;
`

const SheetTitle = styled.h1`
  background: #393e46;
  color: #eeeeee;
  padding: 5px;
`

const EnterField = styled.div`
  background: #eee;
  display: block;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 1rem;
  padding: 5px;

  &::before {
    content: '=';
    margin-right: 5px;
  }
`

const SheetContainer = styled.div`
  overflow: auto;
`

const SheetRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
`

const getCellData = (r, c) =>
  TEST_SHEET_CELLS.find((tsc) => tsc.row === r && tsc.col === c) || undefined

const setupCells = (rowCount, colCount, selectedCell, focusSetter) => {
  const cells = []

  for (let i = 0; i < rowCount; i++) {
    const row = []

    for (let j = 0; j < colCount; j++) {
      let cell

      if (i === 0)
        cell = (
          <Cell
            key={'cell' + i + j}
            isIndicator={true}
            location={i + ' ' + j}
            selectedCell={selectedCell}
            focusSetter={focusSetter}
          >
            {j !== 0 && romanize(j)}
          </Cell>
        )
      else if (j === 0)
        cell = (
          <Cell
            key={'cell' + i + j}
            isIndicator={true}
            location={i + ' ' + j}
            selectedCell={selectedCell}
            focusSetter={focusSetter}
          >
            {i}
          </Cell>
        )
      else {
        const cellData = getCellData(i, j)

        cell = (
          <Cell
            key={'cell' + i + j}
            location={i + ' ' + j}
            selectedCell={selectedCell}
            focusSetter={focusSetter}
          >
            {cellData ? cellData.data : ''}
          </Cell>
        )
      }

      row.push(cell)
    }

    cells.push(row)
  }

  return cells
}

const Sheet = ({ id }) => {
  const [selectedCell, setSelectedCell] = useState(undefined)

  const selectedCellData = selectedCell
    ? getCellData(...selectedCell.split(' ').map((n) => parseInt(n, 10)))
    : undefined

  const scrollRef = useRef(null)
  const inputRef = useRef(null)

  const [isEditing, setIsEditing] = useState(false)
  const [inputValue, setInputValue] = useState(
    selectedCellData ? selectedCellData.data : ''
  )

  const { width, height } = useWindowSize()
  const { y } = useScroll(scrollRef)

  console.log(y)

  const [offsetX, setOffsetX] = useState(0)
  const [offsetY, setOffsetY] = useState(0)

  const { name } = TEST_SHEETS.find((s) => s.id === id)

  const rowCount = Math.ceil(height / DEFAULT_CELL_HEIGHT)
  const colCount = Math.ceil(width / DEFAULT_CELL_WIDTH)

  const cells = setupCells(rowCount, colCount, selectedCell, (c) => {
    setSelectedCell(c)
    inputRef.current.focus()
  })

  const handleSheetRename = (e) => {
    setIsEditing(false)
    TEST_SHEETS.find((ts) => ts.id === id).name = e.target.value
  }

  const handleCellData = (e) => {
    const { value } = e.target
    const [r, c] = selectedCell.split(' ').map((n) => parseInt(n, 10))
    const data = getCellData(r, c)

    if (!data) {
      const newData = {
        row: r,
        col: c,
        data: value
      }

      TEST_SHEET_CELLS.push(newData)
    } else {
      data.data = value
    }
  }

  return (
    <SheetWrapper>
      <SheetMetaForm>
        <SheetTitle onDoubleClick={() => setIsEditing(true)}>
          {isEditing ? (
            <InvisibleInput
              defaultValue={name}
              onKeyPress={(e) => {
                if (e.key === 'Enter') handleSheetRename(e)
              }}
              onBlur={handleSheetRename}
            />
          ) : (
            name
          )}
        </SheetTitle>
        <EnterField>
          <InvisibleInput
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleCellData(e)

                inputRef.current.blur()

                setInputValue('')
                setSelectedCell(undefined)
              }
            }}
          />
        </EnterField>
      </SheetMetaForm>
      <SheetContainer ref={scrollRef}>
        {cells.map((row, i) => (
          <SheetRow key={'sheetrow' + i}>{row}</SheetRow>
        ))}
      </SheetContainer>
    </SheetWrapper>
  )
}

export default Sheet
