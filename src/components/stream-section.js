import React from 'react'
import styled from 'styled-components'
const StyledSectionHeading = styled.h1`
  color: #fefefe;
`
const StyledStreamSection = styled.section`
  
`
const StreamSection = ({section, count, children}) => {

    return (
      <StyledStreamSection>
        <StyledSectionHeading>{`${section} (${count})`}</StyledSectionHeading>
        {children}
      </StyledStreamSection>
    )
}

export default StreamSection