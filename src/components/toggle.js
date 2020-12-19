import React from 'react'
import ToggleButton from 'react-toggle-button'
import { RiNotification4Line, RiNotificationOffLine } from 'react-icons/ri'

const Toggle = ({ onToggle, title = 'Notifications', value }) => {
  return (
    <ToggleButton
      title={title}
      inactiveLabel={<RiNotificationOffLine />}
      activeLabel={<RiNotification4Line />}
      value={value}
      onToggle={onToggle}
    />
  )
}

export default Toggle
