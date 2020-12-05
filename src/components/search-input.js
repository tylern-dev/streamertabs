import React, {useCallback, useEffect, useState} from 'react'
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom'
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
  const [searchTerm, setSearchTerm] = useState('')
  const history = useHistory()
  const location = useLocation()


console.log('history', history)

  const handleChange = (event) => {

    setSearchTerm(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    history.push('/search')
    handleSearchTwitch({query: searchTerm})
  }

  return (
    <StyledInputContainer className={className}>
      <StyledForm onSubmit={handleSubmit} >
        <StyledInput name="search" onChange={handleChange} value={searchTerm} placeholder={placeholder} type={type} disabled={disabled} />
        <StyledButton type="submit" ><HiOutlineSearch /></StyledButton>
      </StyledForm>
    </StyledInputContainer>

  )
}

export default styled(Input)``