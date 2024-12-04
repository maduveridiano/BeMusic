import { View, StyleSheet, Text, TouchableOpacity } from "react-native"
import { LinearGradient } from "expo-linear-gradient";
import LoginForm from "../../components/loginForm";
import { Link, useRouter } from "expo-router";
import { useContext } from "react";
import { IdContext } from "../../scripts/idContext";

const login = () => {
    const router = useRouter()
    const { userInfo, setUserInfo } = useContext(IdContext)

    const semSenha = () => {
        setUserInfo({
            ...userInfo,
            nome: 'admin',
            email: 'admin@gmail.com',
            foto: "https://res.cloudinary.com/duo8nbu2l/image/upload/v1732039695/bkuozj0eb4iefrsbjoda.jpg"
        })
        router.push('/home')
    }

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#121212', 'black']}
                style={styles.background}
            />
            <View style={styles.header}>
                <Text style={styles.title}>Entrar</Text>
            </View>
            <LoginForm />
            <Text style={styles.signUpPath}>Não tem uma conta? <Link href={'/cadastro'} style={styles.link}>Cadastre-se</Link></Text>
            <TouchableOpacity
                onPress={semSenha}
                activeOpacity={0.5}
                style={styles.passwordButton}>
                <Text style={styles.forgotPassword}>sem senha</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F4F4F8', 
},
background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
    backgroundColor: '#0077FF', 
    opacity: 0.8, 
},
header: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    top: 20,
    left: 0,
    position: 'absolute',
    paddingVertical: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4, 
},
title: {
    color: '#FFD700',
    fontSize: 28,
    fontWeight: 'bold',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4, 
},
passwordButton: {
    backgroundColor: '#FFFFFF', 
    width: 90,
    height: 32, 
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    marginTop: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
},
forgotPassword: {
    color: '#FF4C4C',
    fontSize: 12, 
    fontStyle: 'italic',
},
signUpPath: {
    color: '#FFFFFF',
    marginTop: 6,
    fontSize: 14, 
    fontWeight: '500',
},
link: {
    color: '#00A2FF', 
    textDecorationLine: 'underline', 
    fontWeight: '500',
    marginTop: 5,
},

}
)

export default login