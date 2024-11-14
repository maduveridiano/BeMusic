import React, { useEffect, useState } from "react";
import { Text, TextInput, View, StyleSheet, Image, Pressable } from "react-native";
import InputPlace from "./inputPlace/InputPlace";
import {Link} from "expo-router"


export default Login = () => {

    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const fetchData = async () => {
        try {
            console.log(name, email, password)

            const response = await fetch('http://localhost:8000/login', {
                method: "POST",
                
                headers: {

                    Accept: 'application/json',
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify({
                    "email": email,
                    "senha": password
                })
            }
            ).then((response) => {
                if (response.status == 200)
                    alert('Usuário criado com sucesso')
            })
        } catch (error) {
            console.error("Erro: ", error)
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <View>
                <InputPlace value={email} onChangeTextHandler={setEmail} icon={"https://cdn3.iconfinder.com/data/icons/essential-pack-2/48/8-Email-256.png"} label={"Email"} />
                <InputPlace value={password} onChangeTextHandler={setPassword} icon={"https://cdn-icons-png.flaticon.com/512/696/696975.png"} label={"Senha"} />
                <Link href={"/telaCadastro"}><Text style={{fontSize: 12}}>Não possui uma conta? Cadastre-se</Text></Link>

            </View>

            <Pressable style={styles.button} onPress={fetchData}><Text style={{ color: '#ffffff' }}>Login</Text></Pressable>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFFFFF",
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 100
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold'
    },
    button: {
        backgroundColor: '#333333',
        width: 250,
        height: 40,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5
    }
})