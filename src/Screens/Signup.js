import {useEffect, useState } from 'react'
import { View, Text ,StyleSheet, Pressable} from 'react-native'
import InputForm from '../Components/InputForm'
import SubmitButton from '../Components/SubmitButton'
import { colors } from '../Global/colors'
import { useSignupMutation } from '../app/service/auth'
import { useDispatch } from 'react-redux'
import { setUser } from '../features/auth/authSlice'
import { signupSchema } from '../validations/signupSchema'
import { insertSession } from '../database'

const Signup = ({navigation}) => {
  const dispatch = useDispatch()
  const [triggerSignup,{data,isError,isSuccess,error,isLoading}] = useSignupMutation()
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [confirmPassword,setConfirmPassword] = useState("")
  const [emailError,setEmailError] = useState("")
  const [passwordError,setPasswordError] = useState("")
  const [confirmPasswordError,setConfirmPasswordError] = useState("")
  

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
    try {
        setEmailError("")
        setPasswordError("")
        setConfirmPasswordError("")
        signupSchema.validateSync({email,password,confirmPassword})
        triggerSignup({email,password})
    } catch (error) {
        switch(error.path){
          case "email":
            setEmailError(error.message)
            break
          case "password":
            setPasswordError(error.message)
            break
          case "confirmPassword":
            setConfirmPasswordError(error.message)
            break
          default:
            break

        }

    }
  }



  return (
    <View style={styles.main}>
      <View style={styles.container}>
          <Text style={styles.title} >Crear Usuario</Text>
          <InputForm
            label="Email"
            value={email}
            onChangeText={(t) => setEmail(t)}
            isSecure={false}
            error={emailError}
          />
          <InputForm
            label="Contraseña"
            value={password}
            onChangeText={(t) => setPassword(t)}
            isSecure={true}
            error={passwordError}
          />
           <InputForm
            label="Confirmar Contraseña"
            value={confirmPassword}
            onChangeText={(t) => setConfirmPassword(t)}
            isSecure={true}
            error={confirmPasswordError}

          />
          <SubmitButton title="Enviar" onPress={onSubmit}  
          />
          <Text style={styles.sub}>Ya tenes tu usuario?</Text>
          <Pressable onPress={()=> navigation.navigate("Login")}>
              <Text style={styles.subLink}>Iniciar Sesion</Text>
          </Pressable>
      </View>
    </View>
  )
}


export default  Signup


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
      borderColor:"black",
      gap:15,
      borderRadius:10,
      justifyContent:"center",
      alignItems:"center",
      paddingVertical:20,
      borderWidth: 3,
      borderColor: "black"
      
    },
    title:{
      fontSize:22,
      fontFamily: "Josefin"
    },
    sub:{
      fontSize:14
    },
    subLink:{
      fontSize:14,
      
      color:"blue"
    }
})
