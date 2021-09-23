import React, { useState, useEffect } from 'react'
import style from './chatroom.module.css'
import qs from 'query-string'
import axios from 'axios'
import ScrollToBottom from 'react-scroll-to-bottom';
import Email from '../../components/input/email/email';
import telegram from '../../assets/Telegram.png';
import searchicon from '../../assets/Search.png';
import ava from '../../assets/ava.png';
import pp from '../../assets/pp.png';
import send from '../../assets/send.png';
import { Link } from 'react-router-dom';
import pic1 from '../../assets/1.png';
import pic2 from '../../assets/2.png';
import pic3 from '../../assets/3.png';
import pic4 from '../../assets/4.png';
import pic5 from '../../assets/5.png';

const Contact = ({ socket, ...props }) => {
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    const [friends, setFriends] = useState([])
    const [friend, setFriend] = useState(null)
    const resultQuery = qs.parse(props.location.search)
    // const [count, setCout] = useState(0)

    useEffect(() => {
        if (socket && friend) {
            socket.off('msgFromBackend')
            socket.on('msgFromBackend', (data) => {
                console.log('sender id ', data.sender_id);
                console.log('friend id', friend.id);

                if (data.sender_id === friend.id) {
                    setMessages((currentValue) => [...currentValue, data])
                } else {
                    alert(`${data.receiver_id} -> ${data.message}`)
                }

            })

        }
    }, [socket, friend])

    // ini untuk get friends
    useEffect(() => {
        axios.get('http://localhost:4000/v1/user/', {
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then((res) => {
                const dataUsers = res.data.data
                setFriends(dataUsers)
            })
    }, [])

    useEffect(() => {
        if (friend) {
            axios.get(`http://localhost:4000/v1/history/${friend.id}`, {
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
        console.log('halo')

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


    const uname = localStorage.getItem('username');
    const mail = localStorage.getItem('email');
    const iduser = localStorage.getItem('id');

    const [username, setUsername] = useState({ uname })
    const [email, setEmail] = useState({ mail })
    const [phone, setPhone] = useState('')

    const handleUpdate = () => {
        const formData = new FormData()
        formData.append('username', username)
        formData.append('email', email)
        formData.append('phone', phone)


        axios.put(`http:localhost:4000/v1/user/${iduser}`, formData)

            .then((res) => {
                alert('success')
            })
            .catch(() => {
                alert('failed')
            })
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

    const inputProfile = {
        textAlign: 'center',
        fontSize: '14px',
        borderBottom: '1px solid gray',
        height: '20px'

    }

    const statuss = {
        marginBottom: '20px'
    }

    const detailProfile = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: '30px',
        width: '80%'

    }

    const right = {
        width: '70%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        border: '3px solid #7E98DF',
        borderLeft: '1px solid #7E98DF',
        alignItems: 'center'

    }

    // const chatballon1 = {
    //     marginLeft: 'auto
    // '
    //     width: 'fitContent',
    //     backgroundColor: 'lightgray',
    //     height: '40px',
    //     listStyle: 'none',
    //     borderRadius: '10px',
    //     padding: '10px'
    // }

    // const chatballon2 = {
    //     width: 'fitContent',
    //     backgroundColor: 'lightgray',
    //     height: '40px',
    //     listStyle: 'none',
    //     borderRadius: '10px',
    //     padding: '10px'
    // }




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
                                        <Link to="/chatroom"><img src={telegram} alt="" /></Link>
                                        {/* <button>=</button> */}
                                        <img className={style.avaaa} src={ava} alt="" />
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
                                            <li class={style.conlist} key={friend.id} onClick={() => setFriend(() => friend)}> <img src={ava} alt="" /> {friend.username}</li>
                                        )}

                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div style={right}>
                            <div style={detailProfile}>
                                <div className={style.avaprofile}>
                                    <img src={pp} alt="" />
                                </div>
                                <div style={statuss}><h5>Hey! I am using Telegram</h5></div>
                                <div className={style.nameprofile}>
                                    <Email style={inputProfile} name="username" value={'Friend name'} onChange={(e) => setUsername(e.target.value)} />

                                </div>
                                <div className={style.emailprofile}>
                                    <Email style={inputProfile} name="email" value={'friendemail@gmail'} onChange={(e) => setEmail(e.target.value)} />

                                </div>
                                <div className={style.phoneprofile}>
                                    <Email style={inputProfile} value="08137676234" name="phone" onChange={(e) => setPhone(e.target.value)} />

                                </div>
                                <div className={style.piccont}>
                                <img src={pic4} alt="" />
                                <img src={pic1} alt="" />
                                <img src={pic1} alt="" />
                                <img src={pic3} alt="" />
                                <img src={pic4} alt="" />
                                <img src={pic5} alt="" />
                                <img src={pic1} alt="" />
                                <img src={pic2} alt="" />
                                <img src={pic3} alt="" />
                                <img src={pic2} alt="" />
                                <img src={pic5} alt="" />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Contact



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