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
    backgroundColor: '#1A1A1A', 
},
topBar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
},
topBarText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: '#FFD700',
},
back: {
    position: 'absolute',
    top: 16,
    left: 8,
    zIndex: 10,
},
scrollView: {
    marginTop: 0,
    paddingBottom: 90,
},
scrollContent: {
    paddingBottom: 20,
},
topImage: {
    height: 475,
    justifyContent: 'center',
    alignItems: 'center',
},
background: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: -1,
    top: -1,
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.8)',
},
albumImage: {
    width: 250,
    height: 250,
    borderRadius: 12,
    zIndex: 10,
    borderWidth: 2,
    borderColor: '#FFD700',
},
albumName: {
    position: 'absolute',
    fontSize: 20,
    fontWeight: "bold",
    textAlign: 'left',
    paddingHorizontal: 12,
    lineHeight: 28,
    marginVertical: 10,
    color: '#FFFFFF',
    bottom: 0,
    zIndex: 10,
},
albumMusica: {
    position: 'absolute',
    fontSize: 24,
    fontWeight: "bold",
    textAlign: 'left',
    paddingHorizontal: 12,
    lineHeight: 28,
    marginVertical: 10,
    color: '#FFFFFF',
    bottom: 34,
    zIndex: 10,
},
play: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 14,
},
artistaInfo: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 3,
},
artistaImage: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FFD700',
},
artistaNome: {
    color: '#FFFFFF',
    fontWeight: '500',
},
albumInfo: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
},
sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginLeft: 12,
    marginVertical: 12,
    color: '#FFD700',
},
listContainer: {
    paddingLeft: 12,
},
item: {
    padding: 6,
    marginRight: 10,
    borderRadius: 8,
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    backgroundColor: '#292929', 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
},
itemA: {
    padding: 4,
    borderRadius: 6,
    gap: 4,
    alignItems: 'center',
    backgroundColor: '#393939', 
},
itemText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '500',
},
itemAText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '500',
    width: 120,
    textAlign: 'left',
},
itemIndex: {
    fontSize: 14,
    color: '#FFD700',
    fontWeight: '600',
    width: 16,
    textAlign: 'center',
},
itemAYear: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
    width: '100%',
    textAlign: 'left',
},
itemAImage: {
    width: 120,
    height: 120,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#FFD700',
},
itemCover: {
    width: 45,
    height: 45,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#FFD700',
},
line: {
    width: '90%',
    height: 2,
    backgroundColor: '#FFD700', 
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
},

});

export default Musica;