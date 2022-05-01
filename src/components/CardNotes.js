import React from 'react'
import { useContexto } from '../hooks/useContexto'
import CardNote from './CardNote'

const CardNotes = () => {

    const {data} = useContexto()

  return (
    <>
        {data.map(dato => <CardNote dato={dato} key={dato._id}/> )}
    </>
  )
}

export default CardNotes