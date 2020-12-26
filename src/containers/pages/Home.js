import { useState } from 'react'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'
import Button from '../../components/Button'
import Input from '../../components/Input'
import useUserContext from '../../utils/useUserContext'

const HomeWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const FormWrapper = styled.div`
  border: 5px solid #00adb5;
  border-radius: 10px;
  width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 20px;
`

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  margin: 10px 0;
`

const FormLabel = styled.p``

const StyledTitle = styled.h1`
  & span {
    text-decoration: underline;
    font-style: italic;
  }
`

const Home = ({ history }) => {
  const { username, setUsername } = useUserContext()

  const [inputUsername, setInputUsername] = useState('')

  const switchUser = () => {
    setUsername('')
  }

  if (username) {
    return (
      <HomeWrapper>
        <FormWrapper>
          <StyledTitle>
            Hi, <span>{username}</span>.
          </StyledTitle>
          <FormGroup>
            <Button onClick={switchUser}>Switch User</Button>
          </FormGroup>
        </FormWrapper>
      </HomeWrapper>
    )
  }

  const startSheet = () => {
    setUsername(inputUsername)

    history.push('/sheets')
  }

  return (
    <HomeWrapper>
      <FormWrapper>
        <StyledTitle>Welcome to BS!</StyledTitle>
        <FormGroup>
          <FormLabel>Username</FormLabel>
          <Input
            maxLength="16"
            value={inputUsername}
            placeholder="Enter a username with max length of 16"
            onChange={(e) => setInputUsername(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Button disabled={!inputUsername} onClick={startSheet}>
            Start
          </Button>
        </FormGroup>
      </FormWrapper>
    </HomeWrapper>
  )
}

export default withRouter(Home)
