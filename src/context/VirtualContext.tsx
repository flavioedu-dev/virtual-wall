import { useCallback, useState, createContext,ChangeEvent, Dispatch, SetStateAction} from "react";

interface VirtualContextProps {
  infor: any;
  handleInforChange: Dispatch<SetStateAction<any>>; 
}

export const VirtualContext = createContext<VirtualContextProps>({
  infor: null,
  handleInforChange: () => {},
});

export const VirtualProvider = ({children}: {children:React.ReactNode}) => {

  const [infor, setInfor] = useState()

  const handleInforChange = useCallback((infor:any) =>{
     setInfor(infor);
  }, [])

  return(
    <VirtualContext.Provider value={{infor, handleInforChange}}>
      {children}
    </VirtualContext.Provider>
  )
}


  
