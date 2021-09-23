// reducer user

const initialState = {
    username: 'juliet',
    email: 'juliet@gmail.com',
    phoneNumber: 9283415,
    password: '',
    role: '1',
    profile: {},
    error: null
  }
 const userReducer = (state = initialState, action) => {
  
    switch (action.type) {
      case 'LOGIN_REQUEST':
        return {
          ...state,
          profile: action.payload,
        }
      case 'LOGIN_FAILURE':
        return {
          ...state,
          error: action.payload
        }
      case "REGISTER_SUCCESS":
        return {
          ...state,
          profile: action.payload
        }
        case 'REGISTER_FAILURE':
        return {
          ...state,
          error: action.payload
        }
      default:
        return state
    }
  
  }
  
  export default userReducer