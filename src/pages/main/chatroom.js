import React, { useState, useEffect } from 'react'
import style from './chatroom.module.css'
import qs from 'query-string'
import axios from 'axios'
import ScrollToBottom from 'react-scroll-to-bottom';
import Email from '../../components/input/email/email';
import telegram from '../../assets/Telegram.png'
import searchicon from '../../assets/Search.png'
import ava from '../../assets/ava.png'
import send from '../../assets/send.png'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

toast.configure()
const Chatroom = ({ socket, ...props }) => {
    // const { addToast } = useToasts();

    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    const [friends, setFriends] = useState([])
    const [friend, setFriend] = useState(null)
    // const resultQuery = qs.parse(props.location.search)
    const avatar = localStorage.getItem('image')


    useEffect(() => {
        if (socket && friend) {
            socket.off('msgFromBackend')
            socket.on('msgFromBackend', (data) => {
                console.log('sender id ', data.sender_id);
                console.log('friend id', friend.id);

                if (data.sender_id === friend.id) {
                    setMessages((currentValue) => [...currentValue, data])
                } else {
                    // NotificationManager.info(`${data.messages}`);
                    toast(`Ada pesan baru! dari ${data.sender_id} `)
                }

            })

        }
    }, [socket, friend])


    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}v1/user`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then((res) => {
                const dataUsers = res.data.data
                setFriends(dataUsers)
                console.log(friends)
                
            })
    }, [])

    useEffect(() => {
        if (friend) {
            axios.get(`${process.env.REACT_APP_API_URL}v1/history/${friend.id}`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then((res) => {
                    const resultMsg = res.data.data
                    console.log(resultMsg);
                    setMessages(resultMsg)
                })
        }
    }, [friend])

    const handleSendMessage = () => {
        // console.log('halo')

        if (socket && message) {
            console.log(friend);
            socket.emit('sendMessage', {
                idReceiver: friend.id,
                messageBody: message
            }, (data) => {
                setMessages((currentValue) => [...currentValue, data])
            })
            setMessage('')
        }
    }




    const searchbar = {
        width: '90%',
        height: '30px',
        border: '1px solid gray',
        borderRadius: '5px'
    }

    const chatspace = {
        width: '90%',
        height: '50px',
        border: 'none',
        borderBottom: '3px solid gray',
        paddingLeft: '10px'
    }



    // console.log(friends)
    return (
        <>
            <div className={style.container}>
                <div className={style.body}>
                    <div className={style.bodycontent}>

                        <div className={style.left}>
                            <div className={style.contact}>
                                <div className={style.menuleft}>
                                    <div className={style.menubar}>
                                        <Link to="/chatroom"><img className={style.icon} src={telegram} alt="" /></Link>

                                        {/* <button>=</button> */}
                                        <Link to="/profile"><img className={style.avaaa} src={avatar} alt="" /></Link>
                                    </div>
                                    <div className={style.search}>
                                        <Email
                                            style={searchbar}
                                        />
                                        <img src={searchicon} alt="" />
                                    </div>

                                </div>
                                <div className={style.list}>
                                    <ul className={style.unlist}>
                                        {friends.map((friend) =>
                                            <li class={style.conlist} key={friend.id} onClick={() => setFriend(() => friend)}> <img src={friend.image} alt="" /> {friend.username}</li>
                                        )}

                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className={style.right}>
                            <div className={style.namecont}>

                                <div className={style.name}>
                                    {friend ? friend.username : ""}
                                </div>
                                <div className={style.sidebar}>
                                    <Link to=""><button>=</button></Link>
                                </div>
                            </div>
                            {friend && (<>

                                <div class={style.wrapperchat}>

                                    <ScrollToBottom className={style.scroll}>
                                        {messages.map((item) =>
                                            <div className={`${friend.id === item.receiver_id ? style.ballon1 : style.ballon2}`}> <p> {item.messages} <span>[{item.created_at}]</span></p></div>

                                        )}


                                    </ScrollToBottom>
                                </div>
                                <div className={style.send}>
                                    <Email type="textarea" style={chatspace} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type your message..." onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()} />
                                    <div className={style.sendbtn}>
                                        <button className={style.feature}><img src={send} alt="" /></button>
                                        <button onClick={handleSendMessage}>Send</button>
                                    </div>
                                </div>
                            </>)}
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Chatroom



{/* <div className={style.chattop}>
                                <div className={style.topmsg}>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus quibusdam porro dolorum, temporibus voluptas autem rem unde commodi aspernatur quas voluptatum accusamus perferendis! Atque suscipit eum velit ducimus, earum quis.</p>
                                </div>
                                <div className={style.bottommsg}>

                                </div>
                            </div>
                            <div className={style.chatbottom}>
                                <textarea name="chatinput" id="chatinput" placeholder="write something. . ." cols="30" rows="10" value=""></textarea>
                                <button >Send</button>
                            </div> */}