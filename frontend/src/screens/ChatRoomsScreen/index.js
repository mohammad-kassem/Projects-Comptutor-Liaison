import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './styles'
import { useNavigation } from '@react-navigation/native'
import database from '@react-native-firebase/database'
import { useUser } from '../../Context/User'
import { filterRooms } from './controller'


export default function ChatRoomsScreen() {
	const navigation = useNavigation()
	const {user} = useUser()
	let [rooms, setRooms] = useState([])
	

	useEffect(function(){
		let arr = []
        database()
		.ref("rooms")
		.on('value', snapshot => {
			arr = []
			setRooms(arr)
			arr = [Object.entries(snapshot._snapshot.value)]
			setRooms(arr[0])
		})
      }, []);

	rooms = filterRooms(rooms, user)

	return (
		<>
		<Text style={styles.title}>Chat Rooms</Text>
		<View style={styles.roomContainer}>
			<FlatList data={rooms} renderItem={(roomData) =>{
                return(
					<TouchableOpacity style={styles.room} onPress={() => navigation.navigate("ChatStack", { screen: "ChatScreen",  params: { reciever: {"id": user.role_id === 1 ? roomData.item[0].split("-")[1] : roomData.item[0].split("-")[0]}},})}>
						{user.role_id === 1 ? 
						<>
						<View style={styles.imageContainer}>
							{roomData.item[1].tutorImage === '../../../assets/logo.png' ?
							<Image style={styles.profile} source={require('../../../assets/logo.png')}/>
							:<Image style={styles.profile} source={{uri: roomData.item[1].tutorImage}}/>}
						</View>
						<View style={styles.content}>
							<Text style={styles.contact}>{roomData.item[1].tutorName}</Text>
							<Text style={styles.message}>{roomData.item[1].lastMessage}</Text>
						</View>
						</>
						:
						<>
						<View style={styles.imageContainer}>
							{roomData.item[1].studentImage === '../../../assets/logo.png' ?
							<Image style={styles.profile} source={require('../../../assets/logo.png')}/>
							:<Image style={styles.profile} source={{uri: roomData.item[1].studentImage}}/>}
						</View>
						<View style={styles.content}>
							<Text style={styles.contact}>{roomData.item[1].studentName}</Text>
							<Text style={styles.message}>{roomData.item[1].lastMessage}</Text>
						</View>
						</>
					}
				 	</TouchableOpacity>
				)
			}}/>
			</View>
		</>
	)
}