import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Link, useLocation } from 'react-router-dom'
import { HiOutlineHome, HiHome, HiOutlineStar, HiStar, HiSearch, HiOutlineSearch } from 'react-icons/hi'
import { RiCameraLine, RiCameraOffLine, RiCameraOffFill, RiCameraFill, RiLogoutCircleRLine } from 'react-icons/ri'
import { useSearch } from '../hooks/useSearchProvider'

const StyledNav = styled.nav`
  position: sticky;
  /* display: grid; */
  /* grid-template-columns: 1fr; */
  /* align-content: start; */
  /* gap: 4px; */
  height: 508px;
  top: 92px;
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

const StyledLogOutButton = styled(StyledMenuButton)`
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
  const { handleClearSearch, searchedTerm } = useSearch()

  useEffect(() => {
    if (pathname !== '/search' && searchedTerm) {
      console.log('here in clear search')
      handleClearSearch()
    }
  }, [handleClearSearch, pathname, searchedTerm])

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
            {pathname === '/favorites' ? <HiStar /> : <HiOutlineStar />}
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
        <StyledLogOutButton onClick={() => handleLogout()}>
          <RiLogoutCircleRLine />
        </StyledLogOutButton>
      </MenuContainer>
    </StyledNav>
  )
}

export default Menu
