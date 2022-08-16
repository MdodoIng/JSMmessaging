import React, { useState } from 'react'
import { ChannelList, useChatContext} from 'stream-chat-react'
import Cookies from 'universal-cookie'

import { ChannelSearch, TeamChannelList, TeamChannelPreview} from './'
import HospitalIcon from '../assets/hospital.png'
import LogoutIcon from '../assets/logout.png'

const cookies = new Cookies();

const SideBar = ({ logout }) => (
  <div className="channel-list__sidebar">
    <div className="channel-list__sidebar__icon1">
      <div className="icon1__inner">
        <img src={HospitalIcon} alt="Hospital" width='30' />
      </div>
    </div>
    <div className="channel-list__sidebar__icon2">
      <div className="icon1__inner" onClick={logout}>
        <img src={LogoutIcon} alt="Hospital" width='30' />
      </div>
    </div>
  </div>
)

const CompanyHeader = () => (
  <div className="channel-list__header">
      <p className="channel-list__header__text">
        Medical Pager</p>
    </div>
)

const customChannelTeamFilter = (channels) => {
  return channels.filter((channel) => channel.type === 'team')
}
  

const customChannelMessageFilter =(channels) => {
  return channels.filter((channel) => channel.type === 'messaging')
}
  

const ChanelListContent= ({ isCreating, setIsCreating, setCreateType, setIsEditing, setToggleContainer}) => {

  const { client } = useChatContext();


  const logout = () => {
    cookies.remove('userId');   
    cookies.remove('username');
    cookies.remove('fullName');
    cookies.remove('avatarURL');
    cookies.remove('hashedPassword');
    cookies.remove('phoneNumber');
    cookies.remove("token");

    window.location.reload()
  }

  const filters = { members: { $in: [client.userID ]}};
  return (
    <>
      <SideBar logout={logout} />
      <div className='channel-list__list__wrapper'>
        <CompanyHeader />
        <ChannelSearch setToggleContainer={setToggleContainer}/>
        <ChannelList 
        filters={filters}
        channelRenderFilterFn={customChannelTeamFilter}
        List={(listProps) => (
          <TeamChannelList 
          {...listProps}
          type='team'
          isCreating={isCreating} 
          setIsCreating={setIsCreating}
          setCreateType={setCreateType}
          setIsEditing={setIsEditing}
          setToggleContainer={setToggleContainer}
          />
        )}
        Preview={(PreviewProps) => (
          <TeamChannelPreview

          setIsCreating={setIsCreating}
          setIsEditing={setIsEditing}
          setToggleContainer={setToggleContainer} 
            {...PreviewProps}
            type='team'
          />
        )}
        />
         <ChannelList 
        filters={filters}
        channelRenderFilterFn={customChannelMessageFilter}
        List={(listProps) => (
          <TeamChannelList 
          {...listProps}
          type='messaging'
          isCreating={isCreating}
          setIsCreating={setIsCreating}
          setCreateType={setCreateType}
          setIsEditing={setIsEditing}
          setToggleContainer={setToggleContainer}
          />
        )}
        Preview={(PreviewProps) => (
          <TeamChannelPreview 
          setIsCreating={setIsCreating}
          setIsEditing={setIsEditing}
          setToggleContainer={setToggleContainer}
            {...PreviewProps}
            type='messaging'
            
          />
        )}
        />
      </div>
    </>
  )}

  const ChanelListContainer = ( {setCreateType, setIsCreating, setIsEditing}) => {
    const [toggleContainer, setToggleContainer] = useState(false);

    return (
      <>
          <div className="channel-list__container">
            <ChanelListContent 
            setIsCreating={setIsCreating}
            setCreateType={setCreateType}
            setIsEditing={setIsEditing}
            />
          </div>
          <div className="channel-list__container-responsive"
          style={{ left: toggleContainer ? "0%" : "-89%", backgroundColor: "#005fff"}}
          >
            <div className="channel-list__container-toggle" onClick={()=> setToggleContainer((prevToggleContainer) => !prevToggleContainer)}> </div>

              <ChanelListContent 
              setIsCreating={setIsCreating}
              setCreateType={setCreateType}
              setIsEditing={setIsEditing}
              setToggleContainer={setToggleContainer}
              />
           
          </div>
      </>
    )
  }

export default ChanelListContainer 