import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { Animated, FlatList, Image, Text, View, StyleSheet, Pressable } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import BottomBar from "../../components/bottomBar";
import { LinearGradient } from "expo-linear-gradient";


const Artista = () => {
    const scrollY = useRef(new Animated.Value(0)).current;

    const headerOpacity = scrollY.interpolate({
        inputRange: [195, 210],
        outputRange: [0, 1],
        extrapolate: "clamp",
    });

    const { id } = useLocalSearchParams();
    const [artista, setArtista] = useState([])
    const [artistaAlbuns, setArtistaAlbuns] = useState([])
    const router = useRouter()

    useEffect(() => {
        fetch(`http://localhost:8000/artista/${id}`)
            .then((resposta) => resposta.json())
            .then((dados) => setArtista(dados))
            .catch(() => console.log('Aconteceu um erro ao buscar os dados.'));
    }, [])

    useEffect(() => {
        fetch(`http://localhost:8000/artista/${id}/albums`)
            .then((resposta) => resposta.json())
            .then((dados) => {
                const allSongs = dados.reduce((acumulador, album) => {
                    const songsImg = album.Musicas.map(musica => ({
                        musica,
                        imagem: album.coverImageUrl
                    }));
                    return acumulador.concat(songsImg);
                }, []);
                const shuffleSongs = allSongs.sort(() => Math.random() - 0.5)
                const sliceSongs = shuffleSongs.slice(0, 5)
                setArtistaAlbuns(sliceSongs);
                console.log(sliceSongs)
            })
            .catch(() => console.log('Aconteceu um erro ao buscar os dados.'));
    }, [id])


    return (
        <View style={styles.container}>
            <Animated.View style={[styles.topBar, { opacity: headerOpacity }]}>
                <Text style={styles.topBarText}>{artista.nome}</Text>
            </Animated.View>
            <Pressable onPress={() => router.back()} style={styles.back}>
                <AntDesign name="left" size={26} color="white" />
            </Pressable>
            <Animated.ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: false }
                )}
                scrollEventThrottle={16}
            >
                <View style={styles.topImage}>
                    <Image
                        source={{ uri: artista.imageUrl }}
                        style={styles.artistImage}
                    />
                    <Text style={styles.artistName}>{artista.nome}</Text>
                    <LinearGradient
                        colors={['transparent','#121212' ]}
                        style={styles.background}
                    />
                </View>
                <Text style={styles.sectionTitle}>Músicas Populares</Text>
                <FlatList
                    data={artistaAlbuns}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item, index }) => (
                        <Pressable onPress={() => router.push(`/musica/${item.musica.id}`)} style={[styles.item, {zIndex: 20}]}>
                            <Text style={styles.itemIndex}>{index + 1} </Text>
                            <Image
                                style={styles.itemCover}
                                source={{ uri: item.imagem }} />
                            <Text style={styles.itemText}> {item.musica.titulo}</Text>
                        </Pressable >
                    )}
                    contentContainerStyle={styles.listContainer}
                />
                <Text style={styles.sectionTitle}>Discografia</Text>
                <FlatList
                    data={artista.Albums}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <Pressable style={styles.item}
                        onPress={() => router.push(`/album/${item.id}`)} >
                            <Image
                                source={{ uri: item.coverImageUrl }}
                                style={styles.itemImage}
                            />
                            <View>
                                <Text style={styles.itemText}>{item.title}</Text>
                                <Text style={styles.itemYear}>{item.releaseYear}</Text>
                            </View>
                        </Pressable>
                    )}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.listContainer}
                />
                <View style={styles.bioContainer}>
                    <Text style={styles.sectionTitle}>Sobre</Text>
                    <Text style={styles.bioText}>
                        {artista.bio}.
                    </Text>
                </View>
            </Animated.ScrollView>
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
        backgroundColor: "#080808",
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
        height: 270
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: -1,
        height: 220,
    },
    artistImage: {
        width: "100%",
        height: "100%",
    },
    artistName: {
        position: 'absolute',
        fontSize: 52,
        fontWeight: "bold",
        textAlign: 'left',
        paddingHorizontal: 12,
        lineHeight: 48,
        marginVertical: 10,
        color: 'white',
        bottom: 0,
        zIndex: 10
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
        backgroundColor: "#121212",
        padding: 6,
        marginRight: 10,
        borderRadius: 5,
        flexDirection: 'row',
        gap: 8,
        alignItems: 'center'
    },
    itemText: {
        fontSize: 16,
        color: 'white',
        fontWeight: '500'
    },
    itemIndex: {
        fontSize: 14,
        color: 'white',
        fontWeight: '400'
    },
    itemYear: {
        fontSize: 14,
        color: 'white',
        fontWeight: '300'
    },
    itemImage: {
        width: 70,
        height: 70,
        borderRadius: 4,
    },
    itemCover: {
        width: 45,
        height: 45,
    },
    bioContainer: {
        padding: 10,
    },
    bioText: {
        fontSize: 14,
        lineHeight: 24,
        color: 'white'
    },
});

export default Artista;
