// import { getStreams } from './api/streams'
import { getFollows } from './api/userFollows'
;(function () {
  // const streamOnlineCount = 0
  // let userFollowsIds = []
  chrome.alarms.create('main-alarm', { delayInMinutes: 1, periodInMinutes: 1 })

  chrome.alarms.onAlarm.addListener((alarm) => {
    console.log('alarm', alarm)

    // chrome.storage.local.get(['userId'], (result) => {
    //   if (result.userId && alarm.name === 'no-user-id') {
    //     getFollowsFromApi({ userId: result.userId })
    //     chrome.alarms.clear('no-user-id')
    //   } else if (!result.userId && !alarm.name === 'no-user-id') {
    //     chrome.alarms.create('no-user-id', { delayInMinutes: 1, periodInMinutes: 1 })
    //   }
    // })

    chrome.storage.local.get(['userId'], (result) => {
      if (result?.userId) {
        // if (userFollowsIds.length) userFollowsIds = []

        getFollowsFromApi({ userId: result.userId }).then((userIds) => console.log('userIDS!! ---> ', userIds))
      }
    })
  })

  // export const getLiveStreamsCountToSetBadge = (count) => {
  //   chrome.browserAction.setBadgeText({ text: toString(count) })
  // }

  chrome.runtime.onStartup.addListener(() => {
    chrome.storage.local.get(['userId'], (result) => {
      if (result.userId) {
        getFollowsFromApi({ userId: result.userId })
      }
      // else {
      //   chrome.alarms.create('no-user-id', { delayInMinutes: 1, periodInMinutes: 1 })
      // }
    })

    // fetch followed channels
    // fetch streams
    // display count of live streams on badge
    // store the live streams in an array.
  })

  function getFollowsFromApi({ userId, after, prevUserIds = [] }) {
    return new Promise((resolve, reject) => {
      const userFollowsIds = [...prevUserIds]
      getFollows({ fromId: userId, after })
        .then(({ data, pagination }) => {
          const dataUserIds = data.map((d) => d.to_id)

          userFollowsIds.push([...dataUserIds])
          if (pagination?.cursor) {
            getFollowsFromApi({ userId, after: pagination?.cursor, prevUserIds: userFollowsIds })
          }
        })
        .catch((error) => {
          console.log(error)
          reject(error)
        })

      resolve(userFollowsIds)
    })
  }

  // function getStreamsFromApi({}) {}
})()

// in the alarm, poll the live streams and compare result against the previous live streams array. If there is a difference, then the difference is
// the stream that went. Override previous array with new array.
