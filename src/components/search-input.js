import React, {useState} from 'react'
import styled from 'styled-components'
import { HiOutlineSearch } from 'react-icons/hi'
import { useSearch } from '../views/hooks/useSearchProvider'
const StyledInput = styled.input`
  width: 100%;
  height: 24px;
  border-radius: 5px 0 0 5px;
  background-color: #26284A;
  color: #efefef;
  border:  1px solid transparent;
  :focus {
    outline: none;
    border: 1px solid #6D72D6;
  }
`

const StyledInputContainer = styled.div`
  display: flex;
`

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  color: #1B1B33;
  background: #6D72D6;
  border-radius: 0 5px 5px 0;
  border: none;
  margin: 0;
  outline: 0;

  :hover{
    cursor: pointer;
  }
  :active {
    background-color: #26284A;
    color: #6D72D6;
  }
`

const StyledForm = styled.form`
  display: inline-flex;
  width: 100%;
`

const Input = ({
  placeholder,
  type="text",
  disabled,
  className
}) => {
  const { handleSearchTwitch } = useSearch()

  const handleSubmit = (event) => {
    event.preventDefault()

    const elementsArray = [...event.target.elements]
    const formData = elementsArray.reduce((acc, elem) => {
      if(elem.id){
        acc[elem.id] = elem.value
      }
      return acc
    }, {})

    handleSearchTwitch({query: formData?.search})
  }

  return (
    <StyledInputContainer className={className}>
      <StyledForm onSubmit={handleSubmit} >
        <StyledInput name="search" id="search" placeholder={placeholder} type={type} disabled={disabled} />
        <StyledButton type="submit" ><HiOutlineSearch /></StyledButton>
      </StyledForm>
    </StyledInputContainer>

  )
}

export default styled(Input)``