// import io from 'socket.io-client'
// import {useEffect} from 'react'
// function App() {
//   useEffect(() => {
//     const socket = io('http://localhost:4000')
//     console.log(socket);
//   }, [])
//   return (
//     <div className="App">
//       <h1>Socket berhasil</h1>
//     </div>
//   );
// }

// export default App;

import io from 'socket.io-client'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {useEffect, useState} from 'react'
import Login from './pages/auth/login/login'
import Register from './pages/auth/register/register'
import ForgotPass from './pages/auth/forgotpassword/forgot'
// import Teslogin from './pages/main/teslogin'
// import Teschat from './pages/main/teschat'
import Chatroom from './pages/main/chatroom'
import Profile from './pages/main/profile'
// import Contact from './pages/main/contact'
import PublicRoute from './configs/route/publicRoute'



function App() {
  const [socket, setSocket] = useState(null)
  const setupSocket = ()=>{
    const token = localStorage.getItem('token')
    
    // ini saya gunakan ketika browser di refresh
    if(token && !socket){
      const resultSocket = io('https://backend-chat-realtime-telegram.herokuapp.com',{
        query: {
          token: localStorage.getItem('token')
        }
      })
      setSocket(resultSocket)
    }
  }

  useEffect(() => {
    setupSocket()
    // socket.emit('sendMsgToBack', 'hallo my name is ')
  }, [])

  return(
    <BrowserRouter>
      <Switch>
        {/* <PublicRoute exact path="/login" component={Login} />
        <PublicRoute exact path="/signup" component={Signup} /> */}
        <Route exact path="/login" render={(props) => <Login {...props} setSocket={setSocket} />} />
        <Route exact path="/" render={(props) => <Login {...props} setSocket={setSocket} />} />
        {/* <Route exact path="/" component={Login} /> */}
        <Route exact path="/register" component={Register} />
        <Route exact path="/forgot" component={ForgotPass} />
        <Route exact path="/chatroom"  render={(props) => <Chatroom {...props} socket={socket} />}/>
        <Route exact path="/register" component={Register} />
        <Route exact path="/profile" component={Profile} />
        {/* <Route exact path="/contact" component={Contact} /> */}

      </Switch>
    </BrowserRouter>
  )
}

export default App
