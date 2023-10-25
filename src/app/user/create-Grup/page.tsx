"use client"

import FormGrup from '@/components/createGrup/FormGrup/FormGrup'
import './create-grup.css'
import { useEffect } from 'react';
import { useVirtualContext } from '@/context/VirtualContext';

const CreateGrup = () => {

  const {infor, handleInforChange} = useVirtualContext()

  console.log(infor)

  return (
    <main className='all-Group'>
      {/* <FormGrup/> */}
    </main>
  )
}

export default CreateGrup
