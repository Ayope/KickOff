import { Feather } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native-gesture-handler";
import useCustomNavigation from "../../hooks/useCustomNavigation";

const BackButton = () => {
    const { goBack } = useCustomNavigation();

    return(
        <TouchableOpacity onPress={() => goBack()} style={{marginBottom:25, marginRight:300}}>
            <Feather name="chevron-left" size={35} color="black" />
        </TouchableOpacity>
    );
}
  
export default BackButton