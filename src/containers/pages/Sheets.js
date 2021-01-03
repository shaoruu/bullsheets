import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { BiSpreadsheet } from 'react-icons/bi'
import { useQuery } from '@apollo/client'
import { SHEETS_QUERY, SHEET_SUBSCRIPTION } from '../../graphql'
import Button from '../../components/Button'
import Input from '../../components/Input'

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
    border-color: #393e4666;
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
  margin-top: 60px;
`

const FormGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
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
  const results =  useQuery(SHEETS_QUERY)
  
  const { loading, error, data, subscribeToMore } =results || {}

  useEffect(() => {
    const unsubscribe = subscribeToMore?.({
      document: SHEET_SUBSCRIPTION,
      updateQuery(prev, { subscriptionData }) {
        if (!subscriptionData.data) return prev
  
        const {
          data: {
            sheet: { mutation, data }
          }
        } = subscriptionData
  
        const sheets = [...prev.sheets]
  
        switch (mutation) {
          case 'CREATED':
            sheets.push(data)
            return Object.assign({}, prev, {
              sheets: [...prev.sheets, data]
            })
          case 'UPDATED':
            break
          default:
            break
        }
  
        return prev
      }
    })

    return () => {
      unsubscribe()
    }
  }, [])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Something went wrong...</p>

  const { sheets } = data

  return (
    <SheetsWrapper>
      {sheets.map(({ id, name }, i) => (
        <SheetItem key={i} id={id} name={name}></SheetItem>
      ))}
      <FormGroup>
        <Input />
        afdasdfsadfasdfsadfasfasdfaskdjfhlalskjdfhaskldjfhasdfasdf
        <Button>ADD</Button>
      </FormGroup>
    </SheetsWrapper>
  )
}

export default Sheets
