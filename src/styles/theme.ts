import {extendTheme} from "@chakra-ui/react"


export const theme = extendTheme({
    colors:{

    },
    fonts:{
        heading: "Noto Sans",
        body: "Noto Sans"

    },
    styles: {
        global: {
            body: {
                bg: "#f3efee",
                color:"#000",
            }
        }
    },
    headerButton:{
        bg: "#a0a0a0"
    }
    
})