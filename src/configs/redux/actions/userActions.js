import axios from "axios"
import io from 'socket.io-client'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


toast.configure()

export const login = (data, setSocket, history) => async (dispatch) => {
  try {
    const dataBody = { email: data.email, password: data.password }
    const result = await axios.post(`${process.env.REACT_APP_API_URL}v1/user/login`, dataBody)
    const dataResult = result.data.data
    dispatch({ type: 'LOGIN_REQUEST', payload: dataResult })
    console.log(dataResult);


    localStorage.setItem('token', dataResult.token)

    const token = localStorage.getItem('token')
    console.log(token);
    toast('login successful..')
    const resultSocket = io('https://backend-chat-realtime-telegram.herokuapp.com', {
      query: {
        token: token
      }
    })
    setSocket(resultSocket)
    history.push('/chatroom')
  } catch (error) {
    // console.log(error.response);
    dispatch({ type: 'LOGIN_FAILURE', payload: error.response.data.error.message })
    toast(error)
    history.push('/login')
    // alert(error.response.data.error.message)
    // alert('tes')S
  }

}


//             .then((res) => {
//   toast('Login successfully..')
//   const result = res.data.data
//   const token = result.token
//   const username = result.username
//   const email = result.email
//   const phone = result.phone
//   const image = result.image
//   const id = result.id


//   localStorage.setItem('token', token)
//   localStorage.setItem('username', username)
//   localStorage.setItem('email', email)
//   localStorage.setItem('phone', phone)
//   localStorage.setItem('image', image)
//   localStorage.setItem('id', id)


// })
//   .catch((err) => {
//     // console.log(err);
//     toast('Login failed')
//   })

//     }


export const register = (initialValues, history) => (dispatch) => {
  axios
    .post(`${process.env.REACT_APP_API_URL}v1/user/register`, initialValues)
    .then((result) => {
      const dataResult = result.data.data
      console.log(dataResult)
      dispatch({ type: "REGISTER_SUCCESS", payload: dataResult });
      history.push('/login');
    })
    .catch((error) => {
      dispatch({ type: 'REGISTER_FAILURE', payload: error.response.data.error.message })
      history.push('/register')

    });
};

export const updateUser = (form, data) => (dispatch) => {
  const formData = new FormData()
  formData.append('username', form.username)
  formData.append('email', form.email)
  formData.append('phone', form.phone)
  formData.append('image', form.image)


  // formData.append('image', form.image)
  axios.put(`${process.env.REACT_APP_API_URL}v1/user/${data.id}`, formData)
    // axios.put('http://localhost:4000/v1/user/60236000', formData)
    // axios.put(`${process.env.REACT_APP_API_URL}v1/user/customer/${idUser}`, formData)

    .then((res) => {
      // const dataResult = res.data.data
      axios.get(`${process.env.REACT_APP_API_URL}v1/user/${data.id}`)
        .then((res) => {
          const dataResult = res.data.data
          console.log(dataResult)
          toast('success updated profile!')
          dispatch({ type: 'UPDATE_USER', payload: dataResult })
        })
        .catch((err) => {
          console.log(err)
        })
    })
    .catch((err) => {
      toast(err.message)

    })
}




// const formData = new FormData()
//         formData.append('username', form.username)
//         formData.append('email', form.email)
//         formData.append('image', form.image)
//         formData.append('phone', form.phone)


//         axios.put(`${process.env.REACT_APP_API_URL}v1/user/${iduser}`, formData)
//             // axios.put(`${process.env.REACT_APP_API_URL}user`, formData)

//             .then((res) => {
//                 // alert('success')
//                 // console.log(form.username)
//                 console.log(form.image)
//                 localStorage.setItem('username', form.username)
//                 localStorage.setItem('email', form.email)
//                 localStorage.setItem('phone', form.phone)
//                 // localStorage.setItem('image', form.image)
//                 axios.get(`${process.env.REACT_APP_API_URL}v1/user/${iduser}`)
//                 .then ((res) => {
//                     const data = res.data.data
//                     const ava = data[0].image
//                     console.log(data)
//                     localStorage.setItem('image', ava)

//                 })
//                 .catch((err) => {
//                     toast(err.message)
//                 })

//                 toast('success updated profile!')
//             })
//             .catch((err) => {
//                 toast(err.message)

//             })