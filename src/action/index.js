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
                alert('login berhasil')
            const {id, username, f_name, l_name, email, avatar, age, gender} = res.data
            // console.log(res.data[0].username + " berhasil login");
            dispatch(
                {
                    type: 'LOGIN_SUCCESS', // untuk menentukan reducer mana yang akan memproses
                    payload: {
                        id,username, f_name, l_name, email, avatar, age, gender
                    } // berisi data yang akan di taruh di state
                }
            )
            // Save data kedalam cookie
            cookie.set('userName', {id,username,f_name,l_name,email,avatar,age,gender}, {path: '/'})
            }
        })
    }
}

export const keepLogin = (objUser) => {
    return {
        type: "LOGIN_SUCCESS",
        payload: {
            id: objUser.id,
            username: objUser.username,
            f_name: objUser.f_name, 
            l_name: objUser.l_name, 
            email: objUser.email, 
            avatar: objUser.avatar, 
            age: objUser.age, 
            gender: objUser.gender
        }
    }
}

export const updateProfile = (id) => {
    cookie.remove('userName')
    return (dispatch) => {
        axios.get(
            'http://localhost:2019/profile/'+id
        ).then( res => {
            if(typeof(res.data) == 'string'){
                // Print errornya
                alert('Error: ' + res.data)
            } else {
                alert('Update berhasil')
            const {id, username, f_name, l_name, email, avatar, age, gender} = res.data[0]
            // console.log(res.data[0].username + " berhasil login");
            dispatch(
                {
                    type: 'LOGIN_SUCCESS', // untuk menentukan reducer mana yang akan memproses
                    payload: {
                        id, username, f_name, l_name, email, avatar, age, gender
                    } // berisi data yang akan di taruh di state
                }
            )
            // Save data kedalam cookie
            cookie.set('userName', {id,username,f_name,l_name,email,avatar,age,gender}, {path:'/'})
            }
        })
    }
}

export const onLogoutUser = () => {
    cookie.remove('userName')
    return {
        type: "LOGOUT_SUCCESS"
    }
}

//////////// ADMIN /////////////////

export const onLoginAdmin = (username, password) => {
    return (dispatch) => {
        axios.post(
            'http://localhost:2019/admin/login',
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
                    type: 'LOGIN_ADMIN', // untuk menentukan reducer mana yang akan memproses
                    payload: {
                        id,username
                    } // berisi data yang akan di taruh di state
                }
            )
            // Save data kedalam cookie
            cookie.set('Admin', {id,username})
            }
        })
    }
}

export const keepAdmin = (objUser) => {
    return {
        type: "LOGIN_ADMIN",
        payload: {
            id: objUser.id,
            username: objUser.username
        }
    }
}

export const onLogoutAdmin = () => {
    cookie.remove('Admin')
    return {
        type: "LOGOUT_ADMIN"
    }
}