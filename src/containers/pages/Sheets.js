import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { BiSpreadsheet } from 'react-icons/bi'

export const TEST_SHEETS = [
  {
    id: '123123',
    name: 'SHEET #1'
  },
  {
    id: '123124',
    name: 'SHEET #2'
  },
  {
    id: '123125',
    name: 'SHEET #3'
  },
  {
    id: '123126',
    name: 'SHEET #4'
  },
  {
    id: '123127',
    name: 'SHEET #5'
  }
]

const SheetWrapper = styled(Link)`
  border: 5px solid #393e46;
  border-radius: 10px;
  width: 100%;
  margin: 10px 0;
  display: inline-block;
  background: white;
  cursor: pointer;
  color: #79a3b1;
  text-decoration: none;

  &:hover {
    transform: scale(1.01);
  }
`

const SheetTitle = styled.h1`
  display: flex;
  align-items: center;
`

const SheetBody = styled.div``

const SheetsWrapper = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`

const SheetItem = ({ id, name }) => {
  return (
    <SheetWrapper to={'/edit/' + id}>
      <SheetTitle>
        <BiSpreadsheet />
        {name}
      </SheetTitle>
      <SheetBody></SheetBody>
    </SheetWrapper>
  )
}

const Sheets = () => {
  return (
    <SheetsWrapper>
      {TEST_SHEETS.map(({ id, name }, i) => (
        <SheetItem key={i} id={id} name={name}></SheetItem>
      ))}
    </SheetsWrapper>
  )
}

export default Sheets
