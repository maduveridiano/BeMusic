import { Pressable, StyleSheet, Text, View } from "react-native"
import Input from "./input"
import Button from "./button"
import { useState } from "react"
import { useRouter } from "expo-router"
import Ionicons from '@expo/vector-icons/Ionicons';

const CadastroForm = () => {
    const [formData, setFormData] = useState({
        nome: '',
        sobrenome: '',
        email: '',
        dataNascimento: '',
        senha: ''
    })

    const [senhaCorreta, setSenhaCorreta] = useState('')
    const [showPassword, setShowPassword] = useState(true)
    const router = useRouter()

    const handleInputChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleButton = async () => {
        if (!formData.nome || !formData.sobrenome || !formData.email || !formData.dataNascimento || !formData.senha || !senhaCorreta) {
            alert('Preencha todos os campos');
            return;
        }

        if (formData.senha !== senhaCorreta) {
            alert('Senha incorreta');
            return;
        }
        try {
            const response = await fetch('http://localhost:8000/autenticacao/registro/', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            console.log(response)
            if (!response.ok) {
                throw new Error(`Erro HTTP! Status: ${response.status}`);
            }
            if (response.ok) {
                router.push('/login')
            }

        } catch (error) {
            console.error('Erro:', error);
            return
        }

    };

    return (
        <View style={styles.form}>
            <Input
                label={'nome'}
                value={formData.nome}
                onChangeText={(value) => handleInputChange('nome', value)}
            />
            <Input
                label={'sobrenome'}
                value={formData.sobrenome}
                onChangeText={(value) => handleInputChange('sobrenome', value)}
            />
            <Input
                label={'email'}
                value={formData.email}
                onChangeText={(value) => handleInputChange('email', value)}
            />
            <Input
                label={'data de nascimento'}
                value={formData.dataNascimento}
                onChangeText={(value) => handleInputChange('dataNascimento', value)}
            />
            <Input
                label={'senha'}
                value={formData.senha}
                onChangeText={(value) => handleInputChange('senha', value)}
                secureTextEntry={showPassword}
            />
            <Input
                label={'confirmar senha'}
                value={senhaCorreta}
                onChangeText={setSenhaCorreta}
                secureTextEntry={showPassword}
            />
            <Pressable onPress={() => setShowPassword(!showPassword)} style={styles.showPassword}>
                {showPassword ? (
                    <>
                        <Ionicons name="eye-off-sharp" size={24} color="white" />
                        <Text style={styles.color}>mostrar senha</Text>
                    </>
                ) : (
                    <>
                        <Ionicons name="eye" size={24} color="white" />
                        <Text style={styles.color}>ocultar senha</Text>
                    </>
                )}
            </Pressable>
            <Button
                title={'Cadastrar'}
                onPress={handleButton} />
        </View>
    )
}

const styles = StyleSheet.create({
    form: {
        gap: 7,
    },
    color: {
        color: 'white',
        textAlign: 'center',
    },
    showPassword: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '90%',
        gap: 8
    },
})

export default CadastroForm;