import React, {useEffect, useState} from 'react'
import { db } from '../firebase'
import { doc, onSnapshot } from 'firebase/firestore'

const User = ({user1,user,selectUser,chat}) => {
  const [data,setData] = useState('')
  const user2 = user?.uid


  useEffect(()=>{
    const id = user1 > user2 ? `${user1+user2}` : `${user2+user1}`
    let unsub = onSnapshot(doc(db,'lastMsg',id), (doc)=>{
      setData(doc.data())
    })
    return ()=>unsub()
  },[])
  

  return (
    <>
      <div className={`user_wrapper ${chat.name===user.name && 'selected_user'}`} onClick={()=>selectUser(user)}>
          <div className='user_info'>
              <div className='user_detail'>
                  <img className='avatar' src={user.avatar || '#'} alt='avatar' />
                  <h4>{user.name}</h4>
                  {data?.from !== user1 && data?.unread && <small className='unread'>New</small>}
              </div>
              <div className={`user_status ${user.isOnline ? 'online' : 'offline'}`}></div>
          </div>
          {data && (
              <p className='truncate'>
                <strong>{data.from===user1 ? 'Me: ' : null}</strong>
                {data.text}
              </p>
          )}
      </div>
      <div  className={`sm_container ${chat.name===user.name && 'selected_user'}`}
        onClick={()=>selectUser(user)}>
        <img className='avatar sm_screen' src={user.avatar || '#'} alt='avatar' />
      </div>
    </>
  )
}

export default User