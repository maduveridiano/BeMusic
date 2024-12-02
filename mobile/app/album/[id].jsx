import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { Animated, FlatList, Image, Text, View, StyleSheet, Pressable } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import BottomBar from "../../components/bottomBar";
import { LinearGradient } from "expo-linear-gradient";


const Album = () => {
  const scrollY = useRef(new Animated.Value(0)).current;

  const headerOpacity = scrollY.interpolate({
    inputRange: [195, 210],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  const { id } = useLocalSearchParams();
  const [album, setAlbum] = useState([])
  const [musicas, setMusicas] = useState([])
  const [artista, setArtista] = useState([])
  const router = useRouter()

  useEffect(() => {
    fetch(`http://localhost:8000/album/${id}`)
      .then((resposta) => resposta.json())
      .then((dados) => { setAlbum(dados); })
      .catch(() => console.log('Aconteceu um erro ao buscar os dados.'));
  }, [id])

  useEffect(() => {
    fetch(`http://localhost:8000/album/${id}/musicas`)
      .then((resposta) => resposta.json())
      .then((dados) => { setMusicas(dados) })
      .catch(() => console.log('Aconteceu um erro ao buscar os dados.'));
  }, [id])
  useEffect(() => {
    fetch(`http://localhost:8000/artista/${album.artista_id}`)
      .then((resposta) => resposta.json())
      .then((dados) => { setArtista(dados); console.log(dados) })
      .catch(() => console.log('Aconteceu um erro ao buscar os dados.'));
  }, [album])


  return (
    <View style={styles.container}>
      <Animated.View style={[styles.topBar, { opacity: headerOpacity }]}>
        <Text style={styles.topBarText}>{album.title}</Text>
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
            source={{ uri: album.coverImageUrl }}
            style={styles.albumImage}
          />
          <Text style={styles.albumName}>{album.title}</Text>
          <LinearGradient
            colors={['#303030', '#121212']}
            style={styles.background}
          />
        </View>
        <View style={styles.play}>
          <View>
            <Pressable style={styles.artistaInfo} onPress={() => router.push(`/artista/${artista.id}`)}>
              <Image
                style={styles.artistaImage}
                source={{ uri: artista.imageUrl }} />
              <Text style={styles.artistaNome}>{artista.nome}</Text>
            </Pressable>
            <Text style={styles.albumInfo}>{album.releaseYear}</Text>
          </View>
          <AntDesign name="play" size={40} color="#0077FF" />
        </View>
        <FlatList
          data={musicas}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <Pressable onPress={() => router.push(`/musica/${item.id}`)} style={styles.item}>
              <Text style={styles.itemIndex}>{index + 1} </Text>
              <Text style={styles.itemText}> {item.titulo}</Text>
            </Pressable>
          )}
          contentContainerStyle={styles.listContainer}
        />
        <Text style={styles.sectionTitle}>Mais de {artista.nome}</Text>
        <FlatList
          data={artista.Albums}
          horizontal
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Pressable style={styles.itemA} onPress={() => router.push(`/album/${item.id}`)}>
              <Image
                source={{ uri: item.coverImageUrl }}
                style={styles.itemAImage}
              />
              <View>
                <Text style={styles.itemAText}>{item.title}</Text>
                <Text style={styles.itemAYear}>{item.releaseYear}</Text>
              </View>
            </Pressable>
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />
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
    height: 270,
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
    width: 175,
    height: 175,
    borderRadius: 4,
    zIndex: 10,
  },
  albumName: {
    position: 'absolute',
    fontSize: 30,
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
  artistaImage:{
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
});

export default Album;