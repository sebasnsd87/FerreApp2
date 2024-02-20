import {useState ,useEffect} from 'react'
import { View, Text ,StyleSheet, Pressable} from 'react-native'
import { colors } from '../Global/colors'
import InputForm from '../Components/InputForm'
import SubmitButton from '../Components/SubmitButton'
import { useLoginMutation } from '../app/service/auth'
import { useDispatch } from 'react-redux'
import { setUser } from '../features/auth/authSlice'
import { insertSession } from '../database' 




const Login = ({navigation}) => {
  const dispatch = useDispatch()
  const [triggerLogin,{data,isError,isSuccess,error,isLoading}] = useLoginMutation()
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")

  useEffect(()=>{
    if(isSuccess) {
      dispatch(setUser(data))
      insertSession(data)
        .then(result => console.log(result))
        .catch(err => console.log(err))
    }
    if(isError) console.log(error)
  },[data,isError,isSuccess])


  const onSubmit = () => {
    triggerLogin({email,password})
  }
  return (
    <View style={styles.main}>
      <View style={styles.container}>
          <Text style={styles.title} >Iniciar Sesion</Text>
          <InputForm
            label="Email"
            value={email}
            onChangeText={(t) => setEmail(t)}
            isSecure = {false}
            error=""
          />
          <InputForm
            label="Contraseña"
            value={password}
            onChangeText={(t) => setPassword(t)}
            isSecure={true}
            error=""
          />
          <SubmitButton onPress={onSubmit} title="Enviar"/>
          <Text style={styles.sub}>No obtuviste tu usuario?</Text>
          <Pressable onPress={()=> navigation.navigate("Signup")} >
              <Text style={styles.subLink}>Crear Usuario</Text>
          </Pressable>
      </View>
    </View>
  )
}


export default Login


const styles = StyleSheet.create({
    main:{
      flex:1,
      justifyContent:"center",
      alignItems:"center",
      backgroundColor: colors.green1
    },
    container:{
      width:"90%",
      backgroundColor:colors.green2,
      gap:15,
      borderRadius:10,
      borderColor:"black",
      borderWidth: 3,
      justifyContent:"center",
      alignItems:"center",
      paddingVertical:20
    },
    title:{
      fontSize:22,
      fontFamily: "Josefin"
  
    },
    sub:{
      fontSize:14,
      
    },
    subLink:{
      fontSize:14,
      
      color:"blue"
    }
})
