import { NOTIFICATIONS } from '../../consts'
import React, { useState, useEffect, useContext } from 'react'
const NotificationContext = React.createContext({})

const NotificationProvider = ({ children }) => {
  const [stoppedNotifications, setStoppedNotifications] = useState([])

  const stopNotification = (id) => {
    chrome.storage.sync.get([NOTIFICATIONS], (response) => {
      if (response[NOTIFICATIONS]) {
        chrome.storage.sync.set({ [NOTIFICATIONS]: [...response[NOTIFICATIONS], id] })
        setStoppedNotifications((notificationIds) => [...notificationIds, id])
      }
    })
  }

  const startNotification = (id) => {
    chrome.storage.sync.get([NOTIFICATIONS], (response) => {
      if (response[NOTIFICATIONS]) {
        const stoppedNotifications = response[NOTIFICATIONS]
        const updatedNotifications = stoppedNotifications.filter((notificationId) => notificationId !== id)
        chrome.storage.sync.set({ [NOTIFICATIONS]: updatedNotifications })
        setStoppedNotifications(updatedNotifications)
      }
    })
  }

  useEffect(() => {
    chrome.storage.sync.get([NOTIFICATIONS], (response) => {
      if (response[NOTIFICATIONS]) {
        setStoppedNotifications(response[NOTIFICATIONS])
      } else {
        chrome.storage.sync.set({ [NOTIFICATIONS]: [] }) // set the key in storage if it doesn't exist
      }
    })
  }, [])
  const data = { stoppedNotifications, stopNotification, startNotification }
  return <NotificationContext.Provider value={data}>{children}</NotificationContext.Provider>
}

const useNotification = () => {
  const { stoppedNotifications, stopNotification, startNotification } = useContext(NotificationContext)
  return { stoppedNotifications, stopNotification, startNotification }
}

export { useNotification, NotificationProvider }
