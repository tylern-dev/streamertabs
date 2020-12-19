import React from 'react'
import styled from 'styled-components'
import { Link, useLocation } from 'react-router-dom'
import { HiOutlineHome, HiHome, HiSearch, HiOutlineSearch } from 'react-icons/hi'
import { RiCameraLine, RiCameraOffLine, RiCameraOffFill, RiCameraFill, RiLogoutCircleRLine } from 'react-icons/ri'
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs'
// import { BiCog } from 'react-icons/bi'
const StyledNav = styled.nav`
  position: sticky;
  height: 502px;
  top: 98px;
`

const StyledMenuButton = styled.button`
  font-size: 3em;
  display: flex;
  margin: 0;
  padding: 4px;
  background-color: #26284a;
  color: #6d72d6;
  border: none;
  outline: none;

  transition: background-color 0.5s ease;

  :hover {
    cursor: pointer;
    background-color: #1b1b33;
  }

  :active {
    border: none;
    outline: none;
  }
`

const StyledFunctionBtnContainer = styled.div`
  display: grid;
  gap: 4px;
  margin-top: auto;
`

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  height: 100%;
`

const Menu = ({ handleLogout }) => {
  const { pathname } = useLocation()

  // const handleGoToOptionsPage = () => {
  //   if (chrome.runtime.openOptionsPage) {
  //     chrome.runtime.openOptionsPage()
  //   } else {
  //     window.open(chrome.runtime.getURL('options.html'))
  //   }
  // }
  return (
    <StyledNav>
      <MenuContainer>
        <Link to="/">
          <StyledMenuButton title="All">
            {pathname === '/' || pathname === '/popup.html' ? <HiHome /> : <HiOutlineHome />}
          </StyledMenuButton>
        </Link>
        <Link to="/search">
          <StyledMenuButton title="Search Twitch Channels">
            {pathname === '/search' ? <HiSearch /> : <HiOutlineSearch />}
          </StyledMenuButton>
        </Link>
        <Link to="/favorites">
          <StyledMenuButton title="Favorites">
            {pathname === '/favorites' ? <BsBookmarkFill /> : <BsBookmark />}
          </StyledMenuButton>
        </Link>
        <Link to="/live">
          <StyledMenuButton title="Live">{pathname === '/live' ? <RiCameraFill /> : <RiCameraLine />}</StyledMenuButton>
        </Link>
        <Link to="/offline">
          <StyledMenuButton title="Offline">
            {pathname === '/offline' ? <RiCameraOffFill /> : <RiCameraOffLine />}
          </StyledMenuButton>
        </Link>
        <StyledFunctionBtnContainer>
          {/* <StyledMenuButton title="Options" onClick={handleGoToOptionsPage}>
            <BiCog />
          </StyledMenuButton> */}
          <StyledMenuButton title="Logout" onClick={() => handleLogout()}>
            <RiLogoutCircleRLine />
          </StyledMenuButton>
        </StyledFunctionBtnContainer>
      </MenuContainer>
    </StyledNav>
  )
}

export default Menu
