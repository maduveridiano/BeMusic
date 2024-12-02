import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { Image, Text, View, StyleSheet, Pressable, ScrollView, TouchableOpacity } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import BottomBar from "../../components/bottomBar";
import { LinearGradient } from "expo-linear-gradient";


const Musica = () => {
    const { id } = useLocalSearchParams();
    const [album, setAlbum] = useState([])
    const [musica, setMusica] = useState([])
    const [artista, setArtista] = useState([])
    const router = useRouter()
    const [pause, setPause] = useState(false)

    useEffect(() => {
        fetch(`http://localhost:8000/musica/${id}`)
            .then((resposta) => resposta.json())
            .then((dados) => { setMusica(dados); console.log(dados) })
            .catch(() => console.log('Aconteceu um erro ao buscar os dados.'));
    }, [])

    useEffect(() => {
        fetch(`http://localhost:8000/album/${musica.album_id}`)
            .then((resposta) => resposta.json())
            .then((dados) => { setAlbum(dados) })
            .catch(() => console.log('Aconteceu um erro ao buscar os dados.'));
    }, [musica])
    useEffect(() => {
        fetch(`http://localhost:8000/artista/${musica.artista_id}`)
            .then((resposta) => resposta.json())
            .then((dados) => { setArtista(dados) })
            .catch(() => console.log('Aconteceu um erro ao buscar os dados.'));
    }, [musica])


    return (
        <View style={styles.container}>
            <View style={styles.topBar}>
                <Text style={styles.topBarText}>{album.title}</Text>
            </View>
            <Pressable onPress={() => router.back()} style={styles.back}>
                <AntDesign name="left" size={26} color="white" />
            </Pressable>
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.topImage}>
                    <Image
                        source={{ uri: album.coverImageUrl }}
                        style={styles.albumImage}
                    />
                    <Text style={styles.albumMusica}>{musica.titulo}</Text>
                    <Text style={styles.albumName}>{artista.nome}</Text>
                    <LinearGradient
                        colors={['#303030', '#121212']}
                        style={styles.background}
                    />
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <View style={styles.line}></View>
                    <View style={{ flexDirection: 'row', paddingVertical: 12, gap: 12 }}>
                        <AntDesign name="stepbackward" size={38} color="white" />
                        <TouchableOpacity onPress={() => setPause(!pause)}>
                            {pause === false ? <AntDesign name="pausecircle" size={38} color="white" />
                                : <AntDesign name="play" size={38} color="white" />}
                        </TouchableOpacity>
                        <AntDesign name="stepforward" size={38} color="white" />
                    </View>
                </View>
            </ScrollView>
            <BottomBar />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212'
    },
    topBar: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: 60,
        backgroundColor: "transparent",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 10,
    },
    topBarText: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        color: 'white'
    },
    back: {
        position: 'absolute',
        top: 16,
        left: 8,
        zIndex: 10
    },
    scrollView: {
        marginTop: 0,
        paddingBottom: 90
    },
    scrollContent: {
        paddingBottom: 20,
    },
    topImage: {
        height: 475,
        justifyContent: 'center',
        alignItems: 'center'
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: -1,
        top: -1,
        height: '100%',
    },
    albumImage: {
        width: 250,
        height: 250,
        borderRadius: 4,
        zIndex: 10,
    },
    albumName: {
        position: 'absolute',
        fontSize: 20,
        width: '100%',
        fontWeight: "bold",
        textAlign: 'left',
        paddingHorizontal: 12,
        lineHeight: 48,
        marginVertical: 10,
        color: 'white',
        bottom: 0,
        zIndex: 10
    },
    albumMusica: {
        position: 'absolute',
        fontSize: 24,
        width: '100%',
        fontWeight: "bold",
        textAlign: 'left',
        paddingHorizontal: 12,
        lineHeight: 48,
        marginVertical: 10,
        color: 'white',
        bottom: 34,
        zIndex: 10
    },
    play: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 14
    },
    artistaInfo: {
        flexDirection: 'row',
        gap: 6,
        marginBottom: 3
    },
    artistaImage: {
        width: 20,
        height: 20,
        borderRadius: 100
    },
    artistaNome: {
        color: 'white'
    },
    albumInfo: {
        fontSize: 12,
        color: 'rgba(255,255,255,0.7)'
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginLeft: 10,
        marginVertical: 10,
        color: 'white'
    },
    listContainer: {
        paddingLeft: 10,
    },
    item: {
        padding: 6,
        marginRight: 10,
        borderRadius: 5,
        flexDirection: 'row',
        gap: 8,
        alignItems: 'center'
    },
    itemA: {
        padding: 4,
        borderRadius: 4,
        gap: 2,
        alignItems: 'center'
    },
    itemText: {
        fontSize: 16,
        color: 'white',
        fontWeight: '500'
    },
    itemAText: {
        fontSize: 16,
        color: 'white',
        fontWeight: '500',
        width: 120,
        textAlign: 'left'
    },
    itemIndex: {
        fontSize: 14,
        color: 'white',
        fontWeight: '400',
        width: 16,
        textAlign: 'center'
    },
    itemAYear: {
        fontSize: 14,
        color: 'white',
        fontWeight: '300',
        width: '100%',
        textAlign: 'left'
    },
    itemAImage: {
        width: 120,
        height: 120,
        borderRadius: 4,
    },
    itemCover: {
        width: 45,
        height: 45,
    },
    line: {
        width: '90%',
        height: 2,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default Musica;