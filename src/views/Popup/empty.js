import React from 'react'
import styled from 'styled-components'
import {useFavorites} from '../hooks/useFavoritesProvider'

import {BsStarHalf} from 'react-icons/bs'

const StyledBsStarHalf = styled(BsStarHalf)`
  color: #6D72D6;
  font-size: 2em;

`

const StyledCopy = styled.span`
  color: #6D72D6;
  font-size: 1.5em;
`

const EmptyContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  justify-items: center;
  text-align: center;

`

const Empty = () => {
  const {favoriteStreams} = useFavorites()
  return (
    <EmptyContainer>
      <StyledBsStarHalf />
      {favoriteStreams.length > 0 
        ? <StyledCopy>None of your favorite streams are online...</StyledCopy> 
        : <StyledCopy>It's so empty here...</StyledCopy> }
        
    </EmptyContainer>
  )
}

export default Empty