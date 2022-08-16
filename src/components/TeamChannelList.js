import React from 'react'
import { AddChannel } from '../assets'


const TeamChannelList = ({ children, error = false, loading, type ,isCreating, setIsCreating, setCreateType, setIsEditing, setToggleContainer}) => {
  if (error) {
    return type === 'team' ? (
      <div className='team-channel-list'>
        <p className="team-channel-list_message">
          Connection error, please waite a moment and try again.
        </p>
      </div>
    ) : null
  }

  if (loading) {
    return (
      <div className='team-channel-list'>
        <p className="team-channel-list_message loading">
          {type === 'team' ? 'Channels' : 'Messages'} loading...
        </p>
      </div>

    )
  }
  return (
    <div className='team-channel-list'>
      <div className="team-channel-list_header">
        <p className="team-channel-list_harder_title">
          {type === 'team' ? 'Channel' : 'Direct Messages'}
        
        <AddChannel 
        isCreating={isCreating}
        setIsCreating={setIsCreating}
        setCreateType={setCreateType}
        setIsEditing={setIsEditing}
        type={ type === 'team' ? 'team' : 'messaging'}
        setToggleContainer={setToggleContainer}
        /></p>
      </div>
      {children}
    </div>
  )
}

export default TeamChannelList