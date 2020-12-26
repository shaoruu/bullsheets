import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import Sheet from '../../components/Sheet'

const EditWrapper = styled.div``

const Edit = () => {
  const { id } = useParams()

  return (
    <EditWrapper>
      <Sheet id={id} />
    </EditWrapper>
  )
}

export default Edit
