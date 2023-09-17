
const VirtualContext = React.createContext<any | null>(null)
import React, { useState, ReactNode, SetStateAction, Dispatch } from 'react';

interface VirtualProviderProps {
  children: ReactNode; // Tipo ReactNode é usado para tipar a propriedade children
}

const VirtualProvider: React.FC<VirtualProviderProps> = ({children}) => {

    const [event, setEvent] = useState<any | null>(null)

  return (
    <VirtualContext.Provider value={{event, setEvent}}>
        {children}
    </VirtualContext.Provider>
  )
}

export {VirtualContext, VirtualProvider}