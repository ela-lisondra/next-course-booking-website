import {useContext, useEffect} from 'react'
import UserContext from '../../userContext'
import Router from 'next/router'

export default function Logout(){
    const {unsetUser} = useContext(UserContext)

    useEffect(()=>{
        
        unsetUser()

        //redirect the user to the login page
        Router.push('/login')
    }, [])
    return null
}