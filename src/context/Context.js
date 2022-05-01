import React,{createContext, useEffect, useState} from 'react'
import axios from 'axios'

export const contexto = createContext()

const Context = ({children}) => {

    const defaultInput = {
        title: "",
        description: "",
        author: "",
        date: new Date(),
        id: ""
    }

    const [data, setData] = useState([])
    const [inputs, setInputs] = useState(defaultInput)

    useEffect(() => {
    fetching()
    }, [])

    
    const fetching = async () => {
    const resp = await axios("https://crud-mern-ontiveros.herokuapp.com/api/notes")
    setData(resp.data)
    } 

    const valueContext = {
        data,
        fetching,
        inputs, 
        setInputs,
        defaultInput

    }

  return (
    <contexto.Provider value={valueContext}>
        {children}
    </contexto.Provider>
  )
}

export default Context