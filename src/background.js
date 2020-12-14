import { getStreams } from './api/streams'
import { getFollows } from './api/userFollows'
;(function () {
  chrome.alarms.create('main-alarm', { delayInMinutes: 1, periodInMinutes: 1 })
  chrome.alarms.onAlarm.addListener(() => {
    chrome.storage.local.get(['userId'], (result) => {
      if (result?.userId) {
        getFollowsFromApi({ userId: result.userId })
      }
    })
  })

  chrome.runtime.onUpdateAvailable.addListener(() => {
    chrome.runtime.reload()
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
            const streamsFlatten = streams.flat()
            console.log('Streams flatten and count after startup ', streamsFlatten, toString(streamsFlatten.length))
            setLiveStreamsCountToSetBadge(streamsFlatten.length.toString())
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
})()
