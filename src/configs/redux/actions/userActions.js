import axios from "axios"
import io from 'socket.io-client'

// export const login = (data, history) => async (dispatch) => {
//   try {
//     const dataBody = { email: data.email, password: data.password }
//     const result = await axios.post('http://localhost:4000/v1/user/login', dataBody)
//     const dataResult = result.data.data
//     const token = dataResult.token
//     dispatch({ type: 'LOGIN_REQUEST', payload: dataResult })
//     console.log(dataResult);

//     localStorage.setItem('token', dataResult.token)
//     localStorage.setItem('role', dataResult.role)

//     const resultSocket = io('http://localhost:4000', {
//         query: {
//           token: token
//         }
//       })
//       setSocket(resultSocket)
//     // const token = localStorage.getItem('token')
//     // const role = localStorage.getItem('role')
//     console.log(token);
//     history.push('/chatroom')
//   } catch (error) {
//     // console.log(error.response);
//     dispatch({ type: 'LOGIN_FAILURE', payload: error.response.data.error.message })
//     history.push('/login')
//     // alert(error.response.data.error.message)
//     // alert('tes')S
//   }

// }

export const register = (data, history) => (dispatch) => {
  axios
    .post(`${process.env.REACT_APP_API_URL}user/register`, data)
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