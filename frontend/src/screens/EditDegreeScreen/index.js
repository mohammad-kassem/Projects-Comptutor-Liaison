import { View, Text, KeyboardAvoidingView, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import OnBoardingTitle from '../../components/OnBoardingTitle'
import OnBoardingPrompt from '../../components/OnBoardingPrompt'
import { TextInput } from 'react-native-gesture-handler'
import FullWidthButton from '../../components/FullWidthButton'
import { addDegree, getUniversities } from './controller'
import { useNavigation } from '@react-navigation/native'
import Container from '../../components/Container'
import SaveCancelButtons from '../../components/SaveCancelButtons'
import styles from './styles'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { useUser } from '../../Context/User'
import { Dropdown } from 'react-native-element-dropdown'

export default function EditDegreeScreen( {route} ) {
	const {user, setUser} = useUser()
	const setDegrees = route.params.setDegrees
    const [university, setUniversity] = useState("")
    const [degree, setDegree] = useState("")
	const [universities, setUniversities] = useState([])
    const navigation = useNavigation()

	useEffect(function(){
        getUniversities(setUniversities);
      }, []);

	  return (
		<KeyboardAvoidingView keyboardVerticalOffset={-250} behavior="padding">
			<ScrollView>
					<View style={styles.titleContainer}>
						<Text style={styles.title}>Add a Degree</Text>	
					</View>
					<Container>
					<Text style={styles.fieldTitle}>University</Text>
					<Dropdown
					style={styles.dropdown}
					selectedTextStyle={styles.selectedTextStyle}
					data={universities}
					maxHeight={300}
					labelField="label"
					valueField="value"
					placeholder="Select a university"
					value={university}
					onChange={item => {
						setUniversity(item.value);
					}}
					/>
					<Text style={styles.fieldTitle}>Degree</Text>
					<TextInput style={styles.field} placeholder="Degree" onChangeText={(enteredText)=>{setDegree(enteredText)}}/>
					<View style={styles.buttonsContainer}>
						<FullWidthButton text="Save Changes" onHandlePress={()=>addDegree({university, degree}, user, setUser, navigation, setDegrees)}/>
					</View>
					</Container>
			</ScrollView>
		</KeyboardAvoidingView>
	)
}