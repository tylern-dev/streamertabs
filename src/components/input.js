import React from 'react'
import styled from 'styled-components'

const StyledInput = styled.input`
  width: 100%;
  height: 24px;
  border-radius: 5px;
  background-color: #26284A;
  color: #efefef;
  border:  1px solid transparent;

  :active {
    /* border: 1px solid #6D72D6; */
  }
  :focus {
    outline: none;
    border: 1px solid #6D72D6;
  }
`

const StyledButton = styled.button`

`

const StyledInputContainer = styled.div`

`

const Input = ({
  placeholder,
  type="text",
  disabled,
  className
}) => {

  return (

    <StyledInputContainer className={className}>
      <StyledInput placeholder={placeholder} type={type} disabled={disabled} />

    </StyledInputContainer>

  )
}

export default styled(Input)``