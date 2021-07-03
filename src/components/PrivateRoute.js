import React from 'react'
import { useSelector } from 'react-redux'
import { Route, useHistory } from 'react-router-dom'

export default ({ children, ...rest }) => {
    const history = useHistory()
    const token = useSelector(state => state.user.token)
    /* Se o token não existir volta para a página de login */
    if(!token || token == ''){
        history.push('/login')
        return null
    }

    return <Route {...rest}>{children}</Route>
}