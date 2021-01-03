import React from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import Sheet from '../../components/Sheet'

const EditWrapper = styled.div`
  margin-top: 60px;
`

const Edit = () => {
  const { id } = useParams()

  return (
    <EditWrapper>
      <Sheet id={id} />
    </EditWrapper>
  )
}

export default Edit
