import React from 'react'
import Loader from 'react-loader-spinner'
import styled from 'styled-components'

const StyledLoadContainer = styled.div`
  display: grid;
  justify-content: center;
  align-content: center;
`
const Loading = () => {

  return (
    <StyledLoadContainer>
      <Loader
        type="TailSpin"
        color="#6D72D6"
        height={100}
        width={100}
        timeout={3000}
      />
    </StyledLoadContainer>
  )
}

export default Loading