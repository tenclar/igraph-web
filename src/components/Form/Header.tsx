import { Flex, Text, Divider } from "@chakra-ui/react"
import { auto } from "@popperjs/core"

export function Header() {
    return (
        <>

            <Flex
                as="header"
                w={"100%"}
                maxWidth={1480}
                h={20}
                mx={auto}
                mt={4}
                px={6}
                align={"center"}>

                <Text fontSize={"3xl"} fontWeight={"bold"} letterSpacing={"tight"} mx={"auto"} textAlign={"center"}>
                    Atendimentos Gerais
                </Text>
            </Flex>
            <Divider my={4} />
        </>
    )
}