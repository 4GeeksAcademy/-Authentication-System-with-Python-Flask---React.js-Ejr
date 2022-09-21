import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button, ButtonGroup } from '@chakra-ui/react'

export const BotonLogout = () => {
    const {logout} = useAuth0();


    return <Button onClick={() => logout({returnTo: window.location.origin})}>Desconectarse</Button>
                
}