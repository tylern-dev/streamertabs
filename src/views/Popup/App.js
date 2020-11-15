
import React from 'react'
import styled from 'styled-components'
import SettingBtn from '../../icons/settings.svg'
import useLogin from '../hooks/useLogin'
import StreamInfo from './stream-info'
import Live from './live'
import OfflineStreams from './offline-streams'
import Favorites from './favorites'
import { TwitchProvider } from '../hooks/useTwitchProvider'
import { FavoritesProvider } from '../hooks/useFavoritesProvider'
import UserHeader from '../../components/user-header'
const Header = styled.header`
  display: grid;
  grid-template-columns: 1fr 1fr;

`
const Title = styled.h1`
  margin: 0;
  color: #fff;
  padding: 8px 0 0 8px;
`

const Button = styled.button`
  margin: 16px;
  border: none;
  background-color: #fff;
  width: 48px;

`
const ButtonGroup = styled.div`
  display: grid;
  grid-template-columns: auto auto;
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


  const handleGoToOptionsPage = () => {
    if (chrome.runtime.openOptionsPage) {
      chrome.runtime.openOptionsPage();
    } else {
      window.open(chrome.runtime.getURL('options.html'));
    }
  }

  return (
    <TwitchProvider userId={userId} isLoggedIn={isLoggedIn}>
      <FavoritesProvider>

        <Container>
          <Header>
            <div>
              <Title>Twitch Tabs</Title>
              {isLoggedIn &&
                <UserHeader displayName={displayName} profileImageUrl={profileImageUrl}/>
              }
            </div>
            <ButtonGroup>
              {/* <Button onClick={() => handleGoToOptionsPage()}></Button> */}
              <button onClick={() => isLoggedIn ? handleLogout() : handleUserLogin()}>{isLoggedIn ? 'Logout' : 'Login to Twitch'}</button>
            </ButtonGroup>
          </Header>


          {isLoggedIn &&
            <StreamerSection>
              <Favorites />
              <Live />
              <OfflineStreams />
            </StreamerSection>
          }
        </Container>
      </FavoritesProvider>
    </TwitchProvider>

  )
}


export default App
