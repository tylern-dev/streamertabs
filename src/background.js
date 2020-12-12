import { T_TKN } from './consts'
import { getFollows } from './api/userFollows'
;(function () {
  const userFollowsIds = []
  chrome.alarms.create('main-alarm', { delayInMinutes: 1, periodInMinutes: 1 })

  chrome.alarms.onAlarm.addListener(() => {
    console.log('test')

    chrome.storage.local.get([T_TKN], (result) => {
      console.log(result)
    })

    chrome.storage.local.get(['userId'], (result) => {
      console.log(result)
    })
  })

  // export const getLiveStreamsCountToSetBadge = (count) => {
  //   chrome.browserAction.setBadgeText({ text: toString(count) })
  // }

  chrome.runtime.onStartup.addListener(() => {
    // chrome.storage.local.get([T_TKN], (result) => {
    //   console.log(result)
    // })
    chrome.storage.local.get(['userId'], (result) => {
      if (result.userId) {
        getFollowsFromApi({ userId: result.userId })
        console.log('userFollowsIds', userFollowsIds)
      }
    })
    // fetch followed channels
    // fetch streams
    // display count of live streams on badge
    // store the live streams in an array.
  })

  function getFollowsFromApi({ userId, after }) {
    getFollows({ fromId: userId, after }).then(({ data, pagination }) => {
      const dataUserIds = data.map((d) => d.to_id)
      userFollowsIds.push([...dataUserIds])
      if (pagination?.cursor) {
        getFollowsFromApi({ userId, after: pagination?.cursor })
      }
    })
  }
})()

// in the alarm, poll the live streams and compare result against the previous live streams array. If there is a difference, then the difference is
// the stream that went. Override previous array with new array.
