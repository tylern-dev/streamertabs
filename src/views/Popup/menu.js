import React from 'react'
import styled from 'styled-components'
import { HiOutlineHome, HiOutlineStar,  } from 'react-icons/hi'
import {BiVideoOff, BiVideo } from 'react-icons/bi'

const StyledNav = styled.nav`
position: sticky;
  display: grid;
  grid-template-columns: 1fr;
  align-content: start;
  gap: 4px;
`

const MenuButton = styled.button`
  font-size: 3em;
  display: flex;
  margin: 0;
  padding: 4px;
  background: #26284A;
  color: #6D72D6;
  border: none;

`
const Menu = ({appRoute, handleChangeRoute}) => {

  return (
    <StyledNav>
      <MenuButton onClick={() => handleChangeRoute('/all')}><HiOutlineHome /></MenuButton>
      <MenuButton onClick={() => handleChangeRoute('/favorites')}><HiOutlineStar /></MenuButton>
      <MenuButton onClick={() => handleChangeRoute('/live')}><BiVideo /></MenuButton>
      <MenuButton onClick={() => handleChangeRoute('/offline')}><BiVideoOff /></MenuButton>
    </StyledNav>
  )
}

export default Menu