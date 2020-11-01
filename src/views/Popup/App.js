import React, {useState} from 'react'
import styled from 'styled-components'
import SettingBtn from '../../icons/settings.svg'
import useLogin from '../hooks/useLogin'
import useTwitchUsers from '../hooks/useTwitchUsers'



const Header = styled.header`
  display: grid;
  grid-template-columns: 1fr 1fr;

`
const Title = styled.h1``

const Button = styled.button`
  margin: 16px;
  border: none;
  background-color: #fff;
  width: 48px;
  & :active {
      background-color: green;
    }
`
const ButtonGroup = styled.div`
  display: grid;
  align-items: center;
  justify-content: right;
`

const Image = styled.img``

const StreamerSection = styled.section`

`
const Container = styled.div`
  display: grid;
`

const App = () => {
  const {isLoggedIn, userData, handleLogout, handleUserLogin} = useLogin()
  const { userId } = userData
  const { userFollows } = useTwitchUsers({userId})

  console.log('isLoggedIn', isLoggedIn)
  console.log('user Data --->',userData)



  const handleOpenAllStreamerTabs = (streamerArray) => {
    streamerArray.forEach(streamer => {
      chrome.tabs.create({url: `https://twitch.tv/${streamer}`})
    })
  }

  const handleGoToOptionsPage = () => {
    if (chrome.runtime.openOptionsPage) {
      chrome.runtime.openOptionsPage();
    } else {
      window.open(chrome.runtime.getURL('options.html'));
    }
  }



  const streamers = ["pestily", "klean", "tweak"]
  return (
    <Container>
      <Header>
        <Title>Twitch Tabs</Title>
        <ButtonGroup>
          {/* <Button>Add</Button> */}
          <Button onClick={() => handleGoToOptionsPage()}><Image src={SettingBtn} alt="settings-button"/></Button>
        </ButtonGroup>
      </Header>

      <StreamerSection>
        <button onClick={() =>  handleOpenAllStreamerTabs(streamers) }>Open all</button>
        <button onClick={() => isLoggedIn ? handleLogout() : handleUserLogin()}>{isLoggedIn ? 'Logout' : 'Login to Twitch'}</button>
        <ul>

        </ul>
      </StreamerSection>
    </Container>

  )
}


export default App
