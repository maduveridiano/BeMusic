import React, { useState } from "react";
import { Text, TextInput, View, StyleSheet, Pressable, ImageBackground } from "react-native";
import LinearGradient from 'react-native-linear-gradient';

export default Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const fetchData = async () => {
        try {
            console.log(email, password);

            const response = await fetch('', {
                method: "POST",
                headers: {
                    Accept: 'application/json',
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify({
                    "email": email,
                    "password": password
                })
            });
            
            if (response.status === 200) {
                alert('Usuário criado com sucesso');
            } else {
                alert('Erro ao criar usuário');
            }
        } catch (error) {
            console.error("Erro: ", error);
        }
    }

    return (
        <ImageBackground source={require('../../assets/images/Background.png')} style={styles.background}>
            <View style={styles.overlay}>
                <Text style={styles.title}>BeMusic</Text>
                <View style={styles.inputContainer}>
                    <TextInput 
                        style={styles.input} 
                        placeholder="Email ou Usuário" 
                        placeholderTextColor="#ccc"
                        value={email}
                        onChangeText={setEmail}
                    />
                    <TextInput 
                        style={styles.input} 
                        placeholder="Senha" 
                        placeholderTextColor="#ccc"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />
                </View>
                <Pressable onPress={fetchData}>
                    <LinearGradient 
                        colors={['#6200ea', '#3700b3']} 
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Entre em sua conta</Text>
                    </LinearGradient>
                </Pressable>
                <Text style={styles.linkText}>
                    Caiu aqui de <Text style={styles.highlight}>paraquedas?</Text> Crie sua conta <Text style={styles.highlight}>aqui</Text>
                </Text>
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
        width: '90%',
        borderRadius: 15,
        padding: 20,
        alignItems: 'center'
    },
    title: {
        color: '#FFFFFF',
        fontSize: 36,
        fontWeight: 'bold',
        marginBottom: 20
    },
    inputContainer: {
        width: '100%',
        marginBottom: 20,
    },
    input: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        height: 50,
        paddingHorizontal: 15,
        marginBottom: 15,
        color: '#000',
    },
    button: {
        width: 250,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    linkText: {
        color: '#FFFFFF',
        marginTop: 20,
        textAlign: 'center'
    },
    highlight: {
        color: '#6200ea',
        textDecorationLine: 'underline'
    }
});
