import { APP_ROUTES } from "@/constantes/app-router";
import { VirtualProvider } from "@/context/VirtualContext";
import { checkCustomRoutes } from "next/dist/lib/load-custom-routes";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

type PrivateRouteProps ={
    children: ReactNode;
}

export const PrivateRoute = ({children}: PrivateRouteProps) =>{
    const {push} = useRouter()

     const isUserAuthenticated = false

    useEffect(()=>{
        if(isUserAuthenticated){
            push(APP_ROUTES.public.login)
        }
    }, [isUserAuthenticated, push]);

    return(
        <>
            <VirtualProvider>
                {children}
            </VirtualProvider>
            
            {/* {isUserAuthenticated && null}
            {isUserAuthenticated && children} */}
        </>
    )
}