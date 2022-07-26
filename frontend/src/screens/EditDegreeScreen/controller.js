import axios from "axios";
import { ToastAndroid } from "react-native";
import { getToken } from "../../components/utility/Token";

export async function addDegree(inputDegree, user, setUser, navigation, setDegrees){
    const token = await getToken()
    axios({
        method: "post",
        url: "http://192.168.1.105:8000/api/v1/tutor/degree/add",
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        data: JSON.stringify(inputDegree) 
        })
    .then(function(response){
        user.degrees = [...user.degrees, response.data.degree]
        setUser(user)
        setDegrees(user.degrees)
        navigation.navigate("EditProfileScreen", {user: user})

    })
    .catch(function(error){
        console.log(error)
        let message = Object.values(error.response.data);
        ToastAndroid.show(message[0][0], ToastAndroid.SHORT)
    })
}
