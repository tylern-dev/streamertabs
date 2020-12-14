import { getStreams } from './api/streams'
import { getFollows } from './api/userFollows'
;(function () {
  chrome.alarms.create('main-alarm', { delayInMinutes: 1, periodInMinutes: 1 })

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
    chrome.storage.local.get(['userId'], (result) => {
      if (result?.userId) {
        getFollowsFromApi({ userId: result.userId })
      }
    })
    // fetch followed channels
    // fetch streams
    // display count of live streams on badge
    // store the live streams in an array.
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
            chrome.storage.local.get(['prevLiveStreams'], (res) => {
              if (res?.prevLiveStreams) {
                // compare the new live streams to the old one.
                const newLiveStreams = streamsFlattened.filter(
                  (newLiveStream) =>
                    !res.prevLiveStreams.some((prevStream) => prevStream.user_id === newLiveStream.user_id)
                )
                console.log('new LiveStream that just went live', newLiveStreams)
                console.log('streamsFlattened', streamsFlattened)
                if (newLiveStreams.length > 0) {
                  newLiveStreams.forEach((stream) =>
                    chrome.notifications.create({
                      title: 'Twitch Tabs',
                      message: `${stream.user_name} went live!`,
                      type: 'basic',
                      iconUrl: 'logo192.png',
                    })
                  )
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
})()
