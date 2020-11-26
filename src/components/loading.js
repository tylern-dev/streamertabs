import React from 'react'
import Loader from 'react-loader-spinner'
import styled from 'styled-components'

const StyledLoadContainer = styled.div`
  display: grid;
  justify-content: center;
  align-content: center;
`
const Loading = ({height=100, width=100}) => {

  return (
    <StyledLoadContainer>
      <Loader
        type="TailSpin"
        color="#6D72D6"
        height={height}
        width={width}
      />
    </StyledLoadContainer>
  )
}

export default Loading