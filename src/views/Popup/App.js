
import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import SettingBtn from '../../icons/settings.svg'
import useLogin from '../hooks/useLogin'
import Live from './live'
import Loading from '../../components/loading'
import OfflineStreams from './offline-streams'
import Favorites from './favorites'
import LoggedOut from './logged-out'
import { TwitchProvider } from '../hooks/useTwitchProvider'
import { FavoritesProvider } from '../hooks/useFavoritesProvider'
import UserHeader from '../../components/user-header'
import BmcButton from '../../components/bmc-button'
import Menu from './menu'

const Header = styled.header`
  display: grid;
  grid-template-columns: auto 1fr;
  background-color: #1B1B33;
  position: sticky;
  top:0;
  padding: 9px 0;
`

const ButtonGroup = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  align-items: center;
  justify-content: right;
`

const StreamerSection = styled.section`
  display: grid;
  gap: 16px;
`
const Container = styled.div`
  display: grid;
`

const routes = [
  {
    route: '/favorites',
    Component: Favorites,
    key: 'favorites'
  },
  {
    route: '/live',
    Component: Live,
    key: 'live'
  },
  {
    route: '/offline',
    Component: OfflineStreams,
    key: 'offline'
  }
]

const MainContainer = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 8px;
`




const App = () => {
  const [appRoute, setAppRoute] = useState('/all')
  const {isLoggedIn, userData, handleLogout, handleUserLogin} = useLogin()
  const { userId, displayName, profileImageUrl } = userData


  const handleGoToOptionsPage = () => {
    if (chrome.runtime.openOptionsPage) {
      chrome.runtime.openOptionsPage();
    } else {
      window.open(chrome.runtime.getURL('options.html'));
    }
  }

  const ShowAllSections = () =>
    <>
      <Favorites />
      <Live />
      <OfflineStreams />
    </>

  const handleChangeRoute = (route) => {
    setAppRoute(route)
    chrome.storage.local.set({lastTab: route})
  }

  useEffect(() => {
    chrome.storage.local.get(['lastTab'], ({lastTab}) => {
      if(!lastTab){
        setAppRoute('/all')
      } else {
        setAppRoute(lastTab)
      }
    })
  }, [])

  if(!isLoggedIn) return <LoggedOut handleLogin={handleUserLogin}/>

  return (
    <TwitchProvider userId={userId} isLoggedIn={isLoggedIn}>
      {({isLoading}) => (
      <FavoritesProvider>
        <Container>
          {isLoading
            ? <Loading />
            : (
              <>
                <Header>
                  <div>
                    {isLoggedIn &&
                      <UserHeader displayName={displayName} profileImageUrl={profileImageUrl}/>
                    }
                  </div>
                  <ButtonGroup>
                    <BmcButton />
                  </ButtonGroup>
                </Header>

                {isLoggedIn &&
                  <MainContainer>
                    <Menu activeRoute={appRoute} handleChangeRoute={handleChangeRoute} handleLogout={handleLogout}/>

                    <StreamerSection>
                      {appRoute === '/all' && <ShowAllSections />}
                      {routes.map(({Component, route, key})=> route === appRoute && <Component key={key} /> )}
                    </StreamerSection>

                  </MainContainer>
                }
                </>
              )
          }
        </Container>
      </FavoritesProvider>
      )}
    </TwitchProvider>

  )
}


export default App
