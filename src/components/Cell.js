import styled from 'styled-components'

export const DEFAULT_CELL_WIDTH = 80
export const DEFAULT_CELL_HEIGHT = 30

const CellWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  width: ${DEFAULT_CELL_WIDTH}px;
  height: ${DEFAULT_CELL_HEIGHT}px;
  border-bottom: 2px solid #22283133;
  border-right: 2px solid #22283133;
  font-size: 1.6em;
  justify-content: ${(p) => (p.isIndicator ? 'center' : 'flex-start')};
  background: ${(p) =>
    p.isIndicator
      ? '#aaa'
      : p.selectedCell === p.location
      ? '#999'
      : 'transparent'};
  overflow: hidden;
`

const Cell = ({
  children,
  isIndicator,
  location,
  focusSetter,
  selectedCell
}) => {
  return (
    <CellWrapper
      isIndicator={isIndicator}
      selectedCell={selectedCell}
      location={location}
      onClick={() => focusSetter(location)}
    >
      {children}
    </CellWrapper>
  )
}

export default Cell
