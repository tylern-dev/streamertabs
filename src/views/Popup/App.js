
import React, {useState} from 'react'
import styled from 'styled-components'
import SettingBtn from '../../icons/settings.svg'
import useLogin from '../hooks/useLogin'
import useTwitchUsers from '../hooks/useTwitchUsers'
import StreamInfo from './stream-info'



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
  const { userId, displayName, profileImageUrl } = userData
  const { userFollows, streams, userFollowsCursors } = useTwitchUsers({userId})

  // console.log('userFollows', userFollows)




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

  return (
    <Container>
      <Header>
        <Title>Twitch Tabs</Title>
        <ButtonGroup>
          {/* <Button>Add</Button> */}
          <Button onClick={() => handleGoToOptionsPage()}><Image src={SettingBtn} alt="settings-button"/></Button>
          <button onClick={() => isLoggedIn ? handleLogout() : handleUserLogin()}>{isLoggedIn ? 'Logout' : 'Login to Twitch'}</button>
        </ButtonGroup>
      </Header>

      <StreamerSection>
        {/* <button onClick={() =>  handleOpenAllStreamerTabs(streamers) }>Open all</button> */}


        {isLoggedIn &&
          <StreamInfo 
            displayName={displayName} 
            profileImageUrl={profileImageUrl} 
            userFollowsData={userFollows} 
            liveStreams={streams} 
            paginationCursor={userFollowsCursors}
          />
        }

      </StreamerSection>
    </Container>

  )
}


export default App
