import React, { useRef } from 'react'
import styled from 'styled-components'
import { FaEllipsisV } from 'react-icons/fa'
import { useDetectOutsideClick } from '../views/hooks/useDetectOutsideClick'

const StyledMetaButton = styled.button`
  color: #6d72d6;
  background: none;
  outline: none;
  border: none;
  font-size: 1.2em;
  padding: 8px 16px;
  cursor: pointer;
  width: 100%;

  :hover {
    text-decoration: underline;
  }
`

const StyledEllipseButton = styled.button`
  background: none;
  outline: none;
  border: none;
  padding: 0;
`

const MenuItemContainer = styled.div`
  display: grid;
  gap: 4px;
  position: absolute;
  background: #1b1b33;
  border: 1px solid #6d72d6;
  top: 25px;
  right: 10px;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
`

const DropdownMenuContainer = styled.div`
  position: relative;
  display: inline-block;
  z-index: 1;
`

const DropdownMenu = ({ menuItems, loading, className, children }) => {
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
          {children}
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
