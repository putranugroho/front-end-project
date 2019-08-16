import { combineReducers } from 'redux'


const init = {
    id: '',
    username: '', 
    f_name: '', 
    l_name: '', 
    email: '', 
    avatar: '', 
    age: '', 
    gender: ''
}

const AuthReducer = (data = init, action) => {
    switch (action.type) {
        case "LOGIN_SUCCESS":
            return {
                ...data,
                id: action.payload.id,
                username: action.payload.username,
                f_name: action.payload.f_name, 
                l_name: action.payload.l_name, 
                email: action.payload.email, 
                avatar: action.payload.avatar, 
                age: action.payload.age, 
                gender: action.payload.gender
            }

        case "LOGOUT_SUCCESS":
            return {
                ...data,
                id: "",
                username: ""
            }
    
        default:
            return data
    }
}


// combineReducers akan return sesuatu, yang akan di export
export default combineReducers(
    { 
        auth : AuthReducer
    }
)