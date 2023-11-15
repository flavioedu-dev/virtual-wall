import { useCallback, useContext, useState } from "react";
import { createContext } from "react";

export interface posts {
  data?: Date,
  text?: string,
  doc?: string[],
  video?: string[],
  idUserP: string,
  idpost?: string,
  image?:string[]
  idwall:string
}

export interface wall {
  nameWall?: string;
  imgwall?: string;
  postagens?: posts[];
  user?: any[];
  idwall?:string
}

export interface group {
  [x: string]: any;
  nameGroup?: string,
  imageGroup?: string,
  wall?:wall[],
  codigo?: string
}

export interface namewall{
  namewall?: string;
  codGroup?: string;
}


export interface user{
  name: string,
  email: string,
  password: string,
  confirmPassword?: string,
  isAdmmin: boolean,
  group?: group,
  id?: string,
  nameWall?: namewall[],
  imgUser?: string,
  rota?: namewall,
}

interface VirtualContex {
  infor: user | null;
  handleNameChange: (inform: user) => void;
}

const UserContext = createContext<VirtualContex>({
  infor: null,
  handleNameChange: () => {},
})

export const UserProvider = ({children}: {children: React.ReactNode}) =>{
  const [infor, setInfor] = useState<user|null>(null)

  const handleNameChange = useCallback((inform:user)=>{
    setInfor(inform)
  }, [])

  return(
    <UserContext.Provider value={{infor, handleNameChange}}>
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = () => useContext(UserContext)