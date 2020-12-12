import { getFollows } from './api/userFollows'
;(function () {
  const userFollowsIds = []
  chrome.alarms.create('main-alarm', { delayInMinutes: 1, periodInMinutes: 1 })

  chrome.alarms.onAlarm.addListener((alarm) => {
    console.log('alarm', alarm)
    // if (alarm.name === 'no-user-id') {
    //   chrome.storage.local.get(['userId'], (result) => {
    //     if (result?.userId) {
    //       getFollowsFromApi({ userId: result.userId })
    //       chrome.alarms.clear('no-user-id')
    //     }
    //   })
    // }
    chrome.storage.local.get(['userId'], (result) => {
      if (result.userId && alarm.name === 'no-user-id') {
        getFollowsFromApi({ userId: result.userId })
        chrome.alarms.clear('no-user-id')
      } else if (!result.userId && !alarm.name === 'no-user-id') {
        chrome.alarms.create('no-user-id', { delayInMinutes: 1, periodInMinutes: 1 })
      }
    })
    // chrome.storage.local.get([T_TKN], (result) => {
    //   console.log(result)
    // })

    // chrome.storage.local.get([USER_FOLLOWS_IDS], (response) => console.log('response', response))
    console.log('userFollowsIds', userFollowsIds)
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
      } else {
        chrome.alarms.create('no-user-id', { delayInMinutes: 1, periodInMinutes: 1 })
      }
    })

    // fetch followed channels
    // fetch streams
    // display count of live streams on badge
    // store the live streams in an array.
  })

  function getFollowsFromApi({ userId, after }) {
    getFollows({ fromId: userId, after })
      .then(({ data, pagination }) => {
        const dataUserIds = data.map((d) => d.to_id)
        userFollowsIds.push([...dataUserIds])
        if (pagination?.cursor) {
          getFollowsFromApi({ userId, after: pagination?.cursor })
        }
      })
      .catch((error) => console.log(error))
  }

  // function getStreamsFromApi({}){

  // }
})()

// in the alarm, poll the live streams and compare result against the previous live streams array. If there is a difference, then the difference is
// the stream that went. Override previous array with new array.
