import { StyleSheet } from "react-native";
import { SIZES } from "../../constants/theme";

const styles = StyleSheet.create({ 

    image : {
        resizeMode:'cover',
        width: SIZES.width,
        height: SIZES.height,
    },
    

    stack :{
        bottom: 0,
        position: "absolute",
        marginBottom: 60,
        marginHorizontal: 20,

    }

})

export default styles