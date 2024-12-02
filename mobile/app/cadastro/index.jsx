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
        backgroundColor: '#d6d6d6'
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '100%',
    },
    header: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        top: 20,
        left: 0,
        position: 'absolute'
    },
    title: {
        color: 'white',
        fontSize: 26,
        fontWeight: 'bold'
    },
    signUpPath: {
        color: 'white',
    },
    link: {
        color: '#0077FF'
    }
}
)

export default Cadastro