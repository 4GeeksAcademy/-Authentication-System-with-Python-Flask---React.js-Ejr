import React from "react";
import {
  Box,
  Input,
  Text,
  Image,
  Stack,
  Center,
  color,
  Button,
  Link,
  AspectRatio,
} from "@chakra-ui/react";
import { Context } from "../store/appContext";
import { useContext } from "react";
import SidebarWithHeader from "../component/sideBar.jsx";
import { useParams, useNavigate } from "react-router-dom";

export default function ClaseCurso() {
  const { store, actions } = useContext(Context);
  const params = useParams();
  const navigate = useNavigate();
  const navigateLastVideo = () => {
    navigate(`/ruta/${store.clases[params.theid].id - 1}`);
  };
  const navigateNextVideo = () => {
    navigate(`/ruta/${store.clases[params.theid].id + 1}`);
  };
  return (
    <Box display="flex">
      <SidebarWithHeader />
      <Stack spacing={1} direction="row">
        <Box>
          {/* video */}
          <Box>
            <AspectRatio w={1150} h={500} ratio={1}>
              <iframe
                src={store.clases[params.theid].link}
                frameborder="0"
                webkitallowfullscreen
                mozallowfullscreen
                allowfullscreen
              ></iframe>
            </AspectRatio>
          </Box>
          <Box>
            <Box display="flex" pl="20" pt="10" justifyContent="space-between">
              <Box display="flex">
                <Image
                  boxSize="40px"
                  src="https://static.platzi.com/media/learningpath/badges/7a2ccf8b-e35a-48c1-a1d5-42595d5f68db.jpg"
                />
                <Box pl={2}>
                  <Text fontWeight={700}>Blockchain 101</Text>
                  <Text fontWeight={300}>Cripto Academy</Text>
                </Box>
              </Box>
              <Stack direction="row" pr={20}>
                {/* <Link to={"/ruta/" + (store.clases[params.theid].id - 1)}> */}
                <Button onClick={navigateLastVideo}>last</Button>
                {/* </Link> */}
                <Button onClick={navigateNextVideo}>Next</Button>
              </Stack>
            </Box>
            <Stack direction="row" justifyContent="space-between">
              <Text fontWeight={700} fontSize="2xl" pl={20} py={7}>
                {store.clases[params.theid].titulo}
              </Text>
              <Box>
                <Text fontWeight={700} fontSize="lg" pr={20} pt={6}>
                  Links Utiles
                </Text>
              </Box>
            </Stack>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
}
