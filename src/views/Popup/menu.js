import React from 'react'
import styled from 'styled-components'
import { HiOutlineHome, HiHome, HiOutlineStar, HiStar,  } from 'react-icons/hi'
import {BiVideoOff, BiVideo } from 'react-icons/bi'
import { RiCameraLine, RiCameraOffLine, RiCameraOffFill, RiCameraFill, RiLogoutCircleRLine } from 'react-icons/ri'

const StyledNav = styled.nav`
  position: sticky;
  /* display: grid; */
  /* grid-template-columns: 1fr; */
  /* align-content: start; */
  /* gap: 4px; */
  height: 546px;
  top: 54px;

`

const StyledMenuButton = styled.button`
  font-size: 3em;
  display: flex;
  margin: 0;
  padding: 4px;
  background: #26284A;
  color: #6D72D6;
  border: none; 
  outline: none;

  :hover {
    cursor: pointer;
  }

  :active {
    border: none;
    outline: none;
  }

`

const StyledLogOutButton = styled(StyledMenuButton)`
  margin-top: auto;
`

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  height: 100%;
`

const Menu = ({activeRoute, handleChangeRoute, handleLogout}) => {
  return (
    <StyledNav>
      <MenuContainer>
        <StyledMenuButton title="All" onClick={() => handleChangeRoute('/all')}>
          {activeRoute === '/all' ? <HiHome /> : <HiOutlineHome />}
        </StyledMenuButton>
        <StyledMenuButton title="Favorites" onClick={() => handleChangeRoute('/favorites')}>
          {activeRoute === '/favorites' ? <HiStar /> : <HiOutlineStar />}
        </StyledMenuButton>
        <StyledMenuButton title="Live" onClick={() => handleChangeRoute('/live')}>
          {activeRoute === '/live' ? <RiCameraFill /> : <RiCameraLine />} 
        </StyledMenuButton>
        <StyledMenuButton title="Offline" onClick={() => handleChangeRoute('/offline')}>
          {activeRoute === '/offline' ? <RiCameraOffFill /> : <RiCameraOffLine />}
        </StyledMenuButton>
        <StyledLogOutButton onClick={() => handleLogout()}>
          <RiLogoutCircleRLine />
        </StyledLogOutButton>

      </MenuContainer>
    </StyledNav>
  )
}

export default Menu