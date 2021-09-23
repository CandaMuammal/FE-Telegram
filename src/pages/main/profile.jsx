import React, { useState, useEffect } from 'react'
import style from './chatroom.module.css'
import qs from 'query-string'
import axios from 'axios'
import ScrollToBottom from 'react-scroll-to-bottom';
import Email from '../../components/input/email/email';
import telegram from '../../assets/Telegram.png'
import searchicon from '../../assets/Search.png'
import ava from '../../assets/ava.png'
import pp from '../../assets/pp.png'
import send from '../../assets/send.png'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css"

toast.configure()
const Profile = ({ socket, ...props }) => {
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    const [friends, setFriends] = useState([])
    const [friend, setFriend] = useState(null)
    const resultQuery = qs.parse(props.location.search)
    

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
    const phoneNumber = localStorage.getItem('phone');
    const iduser = localStorage.getItem('id');
    const image = localStorage.getItem('image')
    console.log(iduser)


    const [form, setForm] = useState({
        username: uname,
        email: mail,
        phone: phoneNumber,
        image: image,
        imagePreview: null

    })
    const handleChange = (e) => {
        let data = { ...form }
        data[e.target.name] = e.target.value
        setForm(data)
    }

    // console.log(form.username)
    // console.log(form.email)
    // console.log(form.phone)


    const handleInputFile = (e) => {
        setForm({
            ...form,
            image: e.target.files[0],
            imagePreview: URL.createObjectURL(e.target.files[0])
        })
        console.log(e.target.files)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('username', form.username)
        formData.append('email', form.email)
        formData.append('image', form.image)
        formData.append('phone', form.phone)


        axios.put(`${process.env.REACT_APP_API_URL}user/${iduser}`, formData)
            // axios.put(`${process.env.REACT_APP_API_URL}user`, formData)

            .then((res) => {
                // alert('success')
                // console.log(form.username)
                console.log(form.image)
                localStorage.setItem('username', form.username)
                localStorage.setItem('email', form.email)
                localStorage.setItem('phone', form.phone)
                // localStorage.setItem('image', form.image)
                axios.get(`${process.env.REACT_APP_API_URL}user/${iduser}`)
                .then ((res) => {
                    const data = res.data.data
                    const ava = data[0].image
                    console.log(data)
                    localStorage.setItem('image', ava)
                    
                })
                .catch((err) => {
                    toast(err.message)
                })

                toast('success updated profile!')
            })
            .catch((err) => {
                toast(err.message)

            })
    }

    const handleLogout = () => {
        localStorage.clear();
        window.location.href = "/login"
    }

    const handleDelete = () => {
        confirmAlert({
            title: "Confirm",
            message: "Are you sure to delete your account?",
            buttons: [
                {
                    label: "Yes",
                    onClick: () =>
                        axios
                            .delete(`${process.env.REACT_APP_API_URL}user/${iduser}`, {
                                headers: {
                                    authorization: `Bearer ${localStorage.getItem('token')}`
                                },
                            })
                            .then((response) => {
                                toast('Bye, See you again!')
                                localStorage.clear();
                                window.location.href = "/login"
                            })
                            .catch((error) => {
                                toast(`${error.response.statusText}`);
                            }),
                },
                {
                    label: "No",
                    onClick: () => toast(`Cancel deleting account`),
                },
            ],
        });
    };

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
        fontSize: '20px',
        outline: 'none'
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
                                        <Link to="/chatroom"><img className={style.icon} src={telegram} alt="" /></Link>
                                        {/* <button>=</button> */}
                                        <img className={style.avaaa} src={image} alt="" />
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
                            <div className={style.detailprofile}>
                                <div className={style.avaprofile}>
                                    <input type="file" onChange={handleInputFile} />
                                    <img src={form.image} alt="" />
                                </div>
                                <div className={style.status}><h5>Hey! I am using Telegram</h5></div>
                                <div className={style.nameprofile}>
                                    <Email type="text" name="username" value={form.username} placeholder="Username" onChange={handleChange} />

                                </div>
                                <div className={style.emailprofile}>
                                    <Email type="text" name="email" value={form.email} placeholder="Email" onChange={handleChange} />

                                </div>
                                <div className={style.phoneprofile}>
                                    <Email type="text" name="phone" value={form.phone} placeholder="Phone Number" onChange={handleChange} />

                                </div>
                                <button onClick={handleSubmit}>Save</button>
                                <button onClick={handleLogout}>Logout</button>
                                <button onClick={handleDelete}>Delete Account</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile



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