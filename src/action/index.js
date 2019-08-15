import axios from 'axios'
import cookies from 'universal-cookie'

const cookie = new cookies()

export const onLoginUser = (username, password) => {
    return (dispatch) => {
        axios.post(
            'http://localhost:2019/users/login',
            {
                username,
                password
            }
        ).then( res => {
            if(typeof(res.data) == 'string'){
                // Print errornya
                alert('Error: ' + res.data)
            } else {
            const {id, username} = res.data
            // console.log(res.data[0].username + " berhasil login");
            dispatch(
                {
                    type: 'LOGIN_SUCCESS', // untuk menentukan reducer mana yang akan memproses
                    payload: {
                        id,username
                    } // berisi data yang akan di taruh di state
                }
            )
            // Save data kedalam cookie
            cookie.set('userName', {id,username}, {path: '/'})
            }
        })
    }
}

export const keepLogin = (objUser) => {
    return {
        type: "LOGIN_SUCCESS",
        payload: {
            id: objUser.id,
            username: objUser.username
        }
    }
}

export const onLogoutUser = () => {
    cookie.remove('userName')
    return {
        type: "LOGOUT_SUCCESS"
    }
}