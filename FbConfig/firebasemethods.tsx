import { onAuthStateChanged, createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, } from 'firebase/auth'
import { getDatabase, onValue, ref, set,push} from 'firebase/database'
import { app } from './firebaseconfig'
// import { useState } from 'react'

const auth = getAuth(app)
const db = getDatabase(app)


export const fbSignup = (body: any) => {
    return new Promise((resolve, reject) => {
        if (!body.email || !body.password) {
            reject('Email And Password Is Required')
        } else {
            createUserWithEmailAndPassword(auth, body.email, body.password).then((res) => {
                const id = res.user.uid
                body.id = id
                const reference = ref(db, `users/${id}`)
                set(reference, body)
            }).then((response) => {
                resolve('User Created Successfully')
            }).catch((error) => {
                reject(error)
            }).catch((err) => {
                reject(err)
            })
        }
    })
}

// const [getId, setGetId] = useState<any>({})

export const fbLogin = (body: any) => {
    return new Promise((resolve, reject) => {
        if (!body.email || !body.password) {
            reject('Email And Password Is Required')
        } else {
            signInWithEmailAndPassword(auth, body.email, body.password).then((res) => {
                const id = res.user.uid
                // setGetId(id)
                const reference = ref(db, `users/${id}`)
                onValue(reference, (data) => {
                    if (data.exists()) {
                        resolve(data.val())
                    } else {
                        reject('Data Not Found')
                    }
                })
            }).catch((err) => {
                reject('You Are Not Signed Up.Please SignUp Your Account Then Login.')
            })
        }
    })
}

export const fbAuth = () => {
    return new Promise((resolve, reject) => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/auth.user
                const uid = user.uid;
                // ...
                resolve(uid)
            } else {
                // User is signed out
                // ...
                reject('No user logged in')
            }
        })
    })
}

export const fbSend = (nodeName: string, body: any) => {
    return new Promise((resolve, reject) => {

        const Taskid = push(ref(db, `${nodeName}/`)).key
        // body.id = Taskid
        const reference = ref(db, `${nodeName}/${Taskid}`)
        set(reference, body).then(res => {
            resolve('Data Send Successfully')
        }).catch(err => {
            reject(err)
        })
    })
}

// export const fbGet = (nodeName: string, id?: any) => {
//     return new Promise((resolve, reject) => {
//         const reference = ref(db, `${nodeName}/${id ? id : ""}`)
//         onValue(reference, (data) => {
//             if (data.exists()) {
//                 resolve(Object.values(data.val()))
//             } else {
//                 reject('No Data Getted')
//             }
//         })
//     })

// }
export const fbGet = (nodeName: string, id?: any) => {
    return new Promise((resolve, reject) => {
        const reference = ref(db, `${nodeName}/${id ? id : ""}`)
        onValue(reference, (data) => {
            if (data.exists()) {
                resolve(Object.values(data.val()))
            } else {
                reject('No Data Getted')
            }
        })
    })

}


