import React from 'react'

import defImg from '../assets/default-avtar.webp'

const Sidebar = (props) => {
    const onlineUser = props.onlineUser
    const isOnline = onlineUser?.includes(props.user._id)
    return (
        <div className='Sidebar'>
           {props.index!==0? <hr />:''}
            <div className='sidebar my-2'>
                <span className={isOnline?'Online':''} > {props.user.profilePic? <img src={props.user.profilePic} alt="profilePic" /> : <img src={defImg} alt="profilePic" /> } </span><span>{props.user.fullName}</span>
            </div>
        </div>
    )
}

export default Sidebar