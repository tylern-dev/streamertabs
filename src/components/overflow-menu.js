import React, { useRef } from 'react'
import styled from 'styled-components'
import { FaEllipsisV } from 'react-icons/fa'
import { useDetectOutsideClick } from '../views/hooks/useDetectOutsideClick'
const StyledMetaButton = styled.button`
  background: none;
  outline: none;
  border: none;
  font-size: 2em;
`
const StyledEllipseButton = styled.button`
  background: none;
  outline: none;
  border: none;
`

const MenuItemContainer = styled.div`
  background: #ffffff;
  border-radius: 8px;
  position: absolute;
  top: 60px;
  right: 0;
  /* width: 100%; */
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
  /* opacity: 0; */
  /* visibility: hidden; */
  transform: translateY(-20px);
  transition: opacity 0.4s ease, transform 0.4s ease, visibility 0.4s;
`

const DropdownMenuContainer = styled.div`
  position: relative;
  display: inline-block;
`

const DropdownMenu = ({ menuItems, loading, className }) => {
  const dropdownRef = useRef(null)
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false)

  const handlOnClick = () => {
    setIsActive(!isActive)
  }

  return (
    <DropdownMenuContainer>
      <StyledEllipseButton className={className} onClick={handlOnClick}>
        <FaEllipsisV />
      </StyledEllipseButton>
      {isActive && menuItems.length > 0 && (
        <MenuItemContainer ref={dropdownRef}>
          {menuItems.map((btn, i) => (
            <StyledMetaButton key={i} onClick={() => btn.handleOnClick()}>
              {btn.text}
            </StyledMetaButton>
          ))}
        </MenuItemContainer>
      )}
    </DropdownMenuContainer>
  )
}

export default styled(DropdownMenu)``
