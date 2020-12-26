import styled from 'styled-components'

export default styled.button`
  background: #222831;
  color: #eee;
  padding: 8px 16px;
  cursor: pointer;
  border-radius: 4px;
  border: 4px #393e46;
  text-transform: uppercase;
  border-style: outset;

  &:hover {
    background: #393e46;
  }

  &:active {
    background: #393e46dd;
    border-color: #393e4688;
  }

  &:focus {
    outline: none;
  }

  &:disabled {
    background: #eee;
    border-color: #393e4633;
    color: #393e4666;
    cursor: not-allowed;
  }
`
