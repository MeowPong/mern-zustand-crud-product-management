import {
  Button,
  Container,
  Flex,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { CiSquarePlus, CiDark, CiLight } from "react-icons/ci";

function Navbar() {

  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Container maxW={"1140px"} px={4}>
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{
          base: "column",
          sm: "row",
        }}
      >
        <Text
          bgGradient="linear(to-l, #7928CA, #FF0080)"
          bgClip="text"
          fontSize={{ base: "22", sm: "28" }}
          fontWeight="bold"
          textAlign={"center"}
        >
          <Link to={"/"}>Product Store Management</Link>
        </Text>

        <Flex
          alignItems={"center"}
          justifyContent={"space-between"}
          flexDir={{
            base: "row",
            sm: "row"
          }}
          gap="2"
        >
          <Link to={"/create"}>
            <Button>
              <CiSquarePlus fontSize={20} />
            </Button>
          </Link>
          <Button onClick={toggleColorMode} >
            {colorMode === "light" ? <CiDark fontSize={20}/> : <CiLight fontSize={20}/>}
          </Button>
        </Flex>
      </Flex>
    </Container>
  );
}

export default Navbar;
