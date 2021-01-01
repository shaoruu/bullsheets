import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import InvisibleInput from './InvisibleInput'

export const DEFAULT_CELL_WIDTH = 80
export const DEFAULT_CELL_HEIGHT = 30

const CellWrapper = styled.div`
  max-width: ${DEFAULT_CELL_WIDTH}px;
  min-width: ${DEFAULT_CELL_WIDTH}px;
  height: ${DEFAULT_CELL_HEIGHT}px;
  border-bottom: 2px solid #22283133;
  border-right: 2px solid #22283133;
  font-size: 1.6em;
  background: ${(p) => (p.isIndicator ? '#ccc' : '#eee')};
  overflow: ${(p) => (p.isEditing ? 'unset' : 'hidden')};
  display: inline-flex;
  justify-content: flex-start;
  align-items: center;
  z-index: ${(p) => (p.isEditing ? '1000012312312' : '0')};
`

const CellInput = styled.div`
  /* display: inline-flex; */
  display: block;
  align-items: center;
  background: ${(p) => (p.isIndicator ? '#ccc' : '#eee')};
  justify-content: ${(p) => (p.isIndicator ? 'center' : 'flex-start')};
  /* width: ${(p) => (p.isEditing ? 'fit-content' : '100%')}; */
  min-width: 100%;
  outline: none;
  height: 100%;
  /* overflow: auto; */
  white-space: nowrap;
  text-overflow: ellipsis;
  padding: 2px;

  ${(p) => (p.data ? '' : 'width: 100%')}

  &:hover {
    background: ${(p) => (p.isIndicator ? '#ccc' : '#ddd')};
  }
`

const Cell = ({
  data,
  isIndicator,
  location,
  selectedCell,
  setCellData,
  focusSetter
}) => {
  const inputRef = useRef(null)

  const [isEditing, setIsEditing] = useState(false)
  const [inputValue, setInputValue] = useState(data)

  const innerHTML = data || ''

  return (
    <CellWrapper isIndicator={isIndicator} isEditing={isEditing}>
      <CellInput
        ref={inputRef}
        data={innerHTML}
        isIndicator={isIndicator}
        contentEditable={!isIndicator}
        dangerouslySetInnerHTML={{ __html: innerHTML }}
        onFocus={() => setIsEditing(true)}
        onBlur={() => {
          setIsEditing(false)
          setCellData(location, inputRef.current.innerHTML)
        }}
        onKeyPress={(e) => {
          if (e.key === 'Enter') e.preventDefault()
        }}
      />
    </CellWrapper>
  )
}

export default Cell
