import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react'
import { Wrap, WrapItem } from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'
import { Stack, HStack, VStack } from '@chakra-ui/react'
import { Spinner } from "@chakra-ui/react";

export const Perfil = () => {
    const {user, isAuthenticated, isLoading} = useAuth0();


    if(isLoading){
        return <div> <Spinner /> </div>



    }

    return(
        isAuthenticated &&(
            <div>
                 <WrapItem>
                 <Avatar name='imagenPerfil' src={user.picture} alt={user.name}/>
                 <Stack spacing={2}>
                 <Text fontSize='sm'>{user.name}</Text>
                <Text fontSize='xs'>{user.email}</Text>
                </Stack>
                </WrapItem>
            </div>
        )
    )
}