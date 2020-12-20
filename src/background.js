import { NOTIFICATIONS, TWITCH_TV } from './consts'
import { getStreams } from './api/streams'
import { getFollows } from './api/userFollows'
;(function () {
  const stoppedNotifications = []
  const linkMap = {}

  chrome.alarms.create('main-alarm', { delayInMinutes: 1, periodInMinutes: 1 })

  chrome.notifications.onClicked.addListener((notifId) => {
    chrome.tabs.create({ url: `${TWITCH_TV}${linkMap[notifId]}` })
  })

  chrome.runtime.onUpdateAvailable.addListener(() => {
    chrome.runtime.reload()
  })

  chrome.alarms.onAlarm.addListener(() => {
    chrome.storage.local.get(['userId'], (result) => {
      if (result?.userId) {
        getFollowsFromApi({ userId: result.userId })
      }
    })
  })

  chrome.runtime.onStartup.addListener(() => {
    getStoppedNotifications()
    chrome.storage.local.get(['userId'], (result) => {
      if (result?.userId) {
        getFollowsFromApi({ userId: result.userId })
      }
    })
  })

  function getFollowsFromApi({ userId, after, prevUserIds = [] }) {
    getFollows({ fromId: userId, after })
      .then(({ data, pagination }) => {
        const userFollowsIds = [...prevUserIds]
        const dataUserIds = data.map((d) => d.to_id)
        userFollowsIds.push([...dataUserIds])
        if (pagination?.cursor) {
          getFollowsFromApi({ userId, after: pagination?.cursor, prevUserIds: userFollowsIds })
        } else {
          getStreamsFromApi({ userIds: userFollowsIds }).then((streams) => {
            const streamsFlattened = streams.flat()
            console.log(streamsFlattened)
            chrome.storage.local.get(['prevLiveStreams'], (res) => {
              if (res?.prevLiveStreams) {
                // compare the new live streams to the old one.
                const newLiveStreams = streamsFlattened.filter(
                  (newLiveStream) =>
                    !res.prevLiveStreams.some((prevStream) => prevStream.user_id === newLiveStream.user_id)
                )
                if (newLiveStreams.length > 0) {
                  newLiveStreams.forEach((stream) => {
                    // if the id is in stoppedNotifications, don't create notification
                    if (!stoppedNotifications.includes(stream.user_id)) {
                      chrome.notifications.create(
                        {
                          title: 'Twitch Tabs',
                          message: `${stream.user_name} is live!`,
                          type: 'basic',
                          iconUrl: 'logo192.png',
                        },
                        (notifId) => {
                          linkMap[notifId] = stream.user_name // allows notification to be clicked with stream in new tab
                        }
                      )
                    }
                  })
                }
              }
            })
            setLiveStreamsCountToSetBadge(streamsFlattened.length.toString())
            setLiveStreamIdsLocalStorage(streamsFlattened)
          })
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  function getStreamsFromApi({ userIds }) {
    const requests = userIds.map((userIdBatch) => {
      return getStreams({ userIds: userIdBatch })
        .then(({ data }) => data)
        .catch((error) => console.log(error))
    })
    return Promise.all(requests)
  }

  function setLiveStreamsCountToSetBadge(count) {
    chrome.browserAction.setBadgeText({ text: count })
  }

  function setLiveStreamIdsLocalStorage(streams) {
    const mappedStreamerIds = streams.map((stream) => stream)
    chrome.storage.local.set({ prevLiveStreams: mappedStreamerIds })
  }

  function getStoppedNotifications() {
    chrome.storage.sync.get([NOTIFICATIONS], (response) => {
      if (response[NOTIFICATIONS]) {
        stoppedNotifications.push(...response[NOTIFICATIONS])
      }
    })
  }
})()
