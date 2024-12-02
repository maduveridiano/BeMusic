import { useContext, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View, Modal, TouchableOpacity } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import * as ImagePicker from 'expo-image-picker'
import Button from "../../components/button";
import Input from "../../components/input";
import { useRouter } from "expo-router";
import { IdContext } from "../../scripts/idContext";
import BottomBar from "../../components/bottomBar";


const Perfil = () => {
    const { userInfo, setUserInfo, desconectarUser } = useContext(IdContext)
    const [image, setImage] = useState(userInfo.foto)
    const [visibilidadeModal, setVisibilidadeModal] = useState(false)
    const [novaSenha, setNovaSenha] = useState('')
    const [confirmarNovaSenha, setConfirmarNovaSenha] = useState('')
    const [secureTextEntry, setSecureTextEntry] = useState(true)
    const router = useRouter()

    const getImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaType,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.canceled) {
            setImage(result.assets[0].uri);
            handleSetImage(result.assets[0].uri)
        }
    }

    const handleSetImage = async (url) => {
        try {
            const data = {
                "file": url,
                "upload_preset": 'ml_default',
            };
            const res = await fetch('https://api.cloudinary.com/v1_1/duo8nbu2l/upload', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const result = await res.json();
            console.log(result.url)
            setUserInfo({ ...userInfo, foto: result.url });
            saveImageInBackEnd(result.url)
        } catch (error) {
            console.err(error);
        }
    };

    const saveImageInBackEnd = async (url) => {
        try {
            const response = await fetch(`http://localhost:8000/usuario/${userInfo.email}/salvar_foto`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ foto: url })
            });
            if (response.status === 404) {
                alert('erro no email')
            }
        } catch (erro) {
            console.log(erro);
            return;
        }
    }

    const fecharModal = () => {
        setNovaSenha('')
        setConfirmarNovaSenha('')
        setSecureTextEntry(true)
        setVisibilidadeModal(!visibilidadeModal)
    }

    const changePassword = async () => {
        if (novaSenha.length < 3) {
            alert('A senha deve ter pelo menos 3 caracteres')
            return
        }
        if (novaSenha !== confirmarNovaSenha) {
            alert('As senhas não coincidem!')
            return
        }
        try {
            const resposta = await fetch(`http://localhost:8000/autenticacao/${userInfo.email}/nova_senha`, {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ senha: novaSenha })
            });
            fecharModal()
        } catch (error) {
            console.error('ERROR:', error)
        }
    }

    const desconectarConta = () => {
        desconectarUser()
        router.push('/login')
    }

    const excluirConta = async () => {
        try {
            const response = await fetch(`http://localhost:8000/usuario/${userInfo.email}/deletar_usuario`, {
                method: 'DELETE',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
            });
            if (response.ok) {
                desconectarConta()
            }
        } catch (error) {
            console.error('ERROR:', error)
        }
    }

    return (
        <View style={styles.container}>
            <Pressable onPress={() => router.back()} style={styles.back}>
                <AntDesign name="left" size={26} color="white" />
            </Pressable>
            <Pressable onPress={getImage}>
                <Image
                    style={styles.foto}
                    source={{ uri: image }} />
            </Pressable>
            <Text style={styles.name}>
                {userInfo.nome}
            </Text>
            <Text style={styles.email}>
                {userInfo.email}
            </Text>
            <View style={styles.center}>
                <Button title={'mudar senha'} onPress={() => setVisibilidadeModal(true)} />
                <Button title={'Desconectar'} onPress={desconectarConta} />
                <Button title={'Apagar conta'} onPress={excluirConta} />
            </View>
            <Modal
                animationType="slide"
                transparent='true'
                visible={visibilidadeModal}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalView}>
                        <Text style={styles.title}>Alterar a senha</Text>
                        <Input
                            label={'nova senha'}
                            value={novaSenha}
                            onChangeText={setNovaSenha}
                            secureTextEntry={secureTextEntry}
                        />
                        <Input
                            label={'confirmar nova senha'}
                            value={confirmarNovaSenha}
                            onChangeText={setConfirmarNovaSenha}
                            secureTextEntry={secureTextEntry}
                        />
                        <Pressable onPress={() => setSecureTextEntry(!secureTextEntry)} style={styles.showPassword}>
                            {secureTextEntry ? (
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
                        <TouchableOpacity
                            onPress={changePassword}
                            style={styles.button} activeOpacity={0.8}
                        >
                            <Text style={styles.color}>Enviar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={fecharModal}
                            style={styles.button} activeOpacity={0.8}
                        >
                            <Text style={styles.color}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <BottomBar />
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#121212'
    },
    foto: {
        width: 140,
        height: 140,
        borderRadius: 80,
        marginTop: 80
    },
    name: {
        color: 'white',
        fontSize: 28,
        fontWeight: 'bold',
        marginTop: 20,
    },
    email: {
        color: '#A1A1A1',
        fontSize: 18,
        marginTop: 5,
    },
    center: {
        marginTop: 24,
        gap: 6
    },
    title: {
        color: 'white',
        fontSize: 24,
        fontWeight: '600',
        marginBottom: 20,
    },
    color: {
        color: 'white',
        textAlign: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "rgba(0,0,0, 0.5)",
    },
    modalView: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#121212',
        width: '90%',
        padding: 16,
        borderRadius: 12,
        elevation: 10,
    },
    showPassword: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '90%',
        marginTop: 10,
        gap: 8
    },
    button: {
        height: 36,
        minWidth: 250,
        width: '90%',
        maxWidth: 320,
        backgroundColor: '#0077FF',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 6,
        marginVertical: 8,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    back: {
        position: 'absolute',
        top: 16,
        left: 8,
    }
})

export default Perfil