import { Link } from 'react-router-dom'
import Logo from '../assets/logo.svg'
import styled from 'styled-components'
import useUserContext from '../utils/useUserContext'

const NavBarWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 60px;
  width: 100%;
  background: #222831;
  border-bottom: 5px solid #00adb5;
  position: fixed;
  top: 0;
  z-index: 100000;
`

const StyledLink = styled(Link)`
  font-size: 1.2rem;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color: #eee;
  padding: 0 20px;
  transition: all 0.2s;

  &:hover {
    background: #393e46;
    color: #eee;
  }
`

const StyledLogoLink = styled(StyledLink)`
  font-weight: 800;
`

const StyledLogo = styled.img`
  margin-right: 20px;
  height: 100%;
`

const NavBar = () => {
  const { username } = useUserContext()

  return (
    <NavBarWrapper>
      <StyledLogoLink to="/">
        <StyledLogo src={Logo} alt="logo" />
        BULLSHEET
      </StyledLogoLink>

      {username && <StyledLink to="/sheets">Sheets</StyledLink>}
    </NavBarWrapper>
  )
}

export default NavBar
