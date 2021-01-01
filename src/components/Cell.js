import { useRef, useState } from 'react'
import styled from 'styled-components'

export const DEFAULT_CELL_WIDTH = 80
export const DEFAULT_CELL_HEIGHT = 30

const CellWrapper = styled.div`
  max-width: ${DEFAULT_CELL_WIDTH}px;
  min-width: ${DEFAULT_CELL_WIDTH}px;
  height: ${DEFAULT_CELL_HEIGHT}px;
  border: 1px solid #22283133;
  font-size: 1.6em;
  display: inline-flex;
  justify-content: flex-start;
  align-items: center;
  
  background: ${(p) => (p.isIndicator ? '#ccc' : '#eee')};
  overflow: ${(p) => (p.isEditing ? 'unset' : 'hidden')};
  z-index: ${(p) => (p.isEditing ? '1000012312312' : '0')};

  ${(p) => !p.isIndicator && 'cursor: text;'}
  ${(p) => p.isEditing && 'border: 1px solid black;'}
`

const CellInput = styled.div`
  display: block;
  align-items: center;
  outline: none;
  height: 100%;
  
  background: ${(p) => (p.isIndicator ? '#ccc' : '#eee')};
  justify-content: ${(p) => (p.isIndicator ? 'center' : 'flex-start')};
  
  ${(p) => p.isIndicator && 'min-width: 100%;'}
  ${(p) => p.isIndicator && 'text-align: center;'}
`

const Cell = ({
  data,
  isIndicator,
  location,
  setCellData,
}) => {
  const inputRef = useRef(null)

  const [isEditing, setIsEditing] = useState(false)

  const innerHTML = data || ''

  return (
    <CellWrapper isIndicator={isIndicator} isEditing={isEditing} onClick={() => {
      if (inputRef.current)
        inputRef.current.focus()
    }}>
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
          if (e.key === 'Enter') {
            e.preventDefault()
            if (inputRef.current)
              inputRef.current.blur()
          }
        }}
      />
    </CellWrapper>
  )
}

export default Cell
