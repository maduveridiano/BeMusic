import { View, StyleSheet, Text } from "react-native"
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import CadastroForm from "../../components/cadastroForm";
import { useState } from "react";

const Cadastro = () => {
    
    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#121212', 'black']}
                style={styles.background}
            />
            <View style={styles.header}>
                <Text style={styles.title}>Cadastro</Text>
            </View>
            <CadastroForm />
            <Text style={styles.signUpPath}>Já tem uma conta? <Link href={'/login'} style={styles.link}>Conecte-se</Link></Text>
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
    shadowOpacity: 0.2,
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
signUpPath: {
    color: '#FFFFFF',
    fontSize: 14,
    marginTop: 10,
    fontStyle: 'italic', 
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
},
link: {
    color: '#00A2FF', 
    textDecorationLine: 'underline', 
    fontWeight: '500',
    marginTop: 5,
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1, 
},

}
)

export default Cadastro