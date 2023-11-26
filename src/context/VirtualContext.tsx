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

export interface member{
  id: string,
  category: string,
  created_at: string,
  userId: string,
  groupId: string
}

export interface wall {
  name?: string;
  imgMural?: string;
  category?: string;
  postagens?: posts[];
  id?:string
  groupId: string
}

export interface group {
  [x: string]: any;
  name?: string,
  imgGroup?: string,
  wall?:wall[],
  groupCode?: number,
  id?: string,
  created_at?: string,
  userId: string
}

export interface namewall{
  namewall?: string;
  codGroup?: string;
}

export interface user{
  name: string,
  username?: string,
  email: string,
  password: string,
  confirmPassword?: string,
  isAdmin: boolean,
  group?: group,
  id?: string,
  nameWall?: namewall[],
  rota?: namewall,
  profile_image?: string,
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