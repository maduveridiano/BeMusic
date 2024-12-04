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
  backgroundColor: '#121212',
  background: 'linear-gradient(135deg, #212121 0%, #121212 100%)',
},
topBar: {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  height: 70,
  backgroundColor: "#1E1E1E",  
  justifyContent: "center",
  alignItems: "center",
  zIndex: 10,

  shadowColor: '#000',
  shadowOpacity: 0.5,
  shadowRadius: 8,
  elevation: 4,
},
topBarText: {
  fontSize: 26,
  fontWeight: "bold",
  textAlign: "center",
  color: 'white',
  letterSpacing: 1, 
},
back: {
  position: 'absolute',
  top: 20,
  left: 12,
  zIndex: 10,
  padding: 10,
  backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  borderRadius: 30,
},
scrollView: {
  marginTop: 0,
  paddingBottom: 90,
},
scrollContent: {
  paddingBottom: 20,
},
topImage: {
  height: 300,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 10, 
  overflow: 'hidden',
},
background: {
  position: 'absolute',
  left: 0,
  right: 0,
  bottom: -1,
  top: -1,
  height: '100%',
  opacity: 0.7,  
},
albumImage: {
  width: 190,
  height: 190,
  borderRadius: 10,  
  zIndex: 10,
  borderWidth: 2,
  borderColor: '#fff',  
},
albumName: {
  position: 'absolute',
  fontSize: 32,
  fontWeight: "bold",
  textAlign: 'left',
  paddingHorizontal: 12,
  lineHeight: 48,
  marginVertical: 10,
  color: 'white',
  bottom: 0,
  zIndex: 10,
  textShadowColor: '#000', 
  textShadowOffset: { width: 1, height: 1 },
  textShadowRadius: 2,
},
play: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingHorizontal: 16,
  backgroundColor: 'rgba(0,0,0,0.6)',  
  paddingVertical: 12,
  borderRadius: 8,
  marginTop: 20,
},
artistaInfo: {
  flexDirection: 'row',
  gap: 8,
  marginBottom: 5,
  alignItems: 'center',
},
artistaImage: {
  width: 24,
  height: 24,
  borderRadius: 12,
  borderWidth: 1,
  borderColor: '#fff', 
},
artistaNome: {
  color: 'white',
  fontWeight: '500',
},
artistaImage: {
  width: 24,
  height: 24,
  borderRadius: 12,
  borderWidth: 1,
  borderColor: '#fff',
},
albumInfo: {
  fontSize: 14,
  color: 'rgba(255,255,255,0.7)',
  marginTop: 3,
},
sectionTitle: {
  fontSize: 22,
  fontWeight: "bold",
  marginLeft: 12,
  marginVertical: 12,
  color: 'white',
  letterSpacing: 0.8,  
},
listContainer: {
  paddingLeft: 12,
},
item: {
  padding: 8,
  marginRight: 12,
  borderRadius: 6,
  flexDirection: 'row',
  gap: 10,
  alignItems: 'center',
  backgroundColor: 'rgba(255,255,255,0.1)', 
  elevation: 2,
  shadowColor: '#000',
  shadowOpacity: 0.1,
  shadowRadius: 4,
},
itemA: {
  padding: 6,
  borderRadius: 6,
  gap: 3,
  alignItems: 'center',
},
itemText: {
  fontSize: 18,
  color: 'white',
  fontWeight: '500',
},
itemAText: {
  fontSize: 18,
  color: 'white',
  fontWeight: '500',
  width: 130,
  textAlign: 'left',
},
itemIndex: {
  fontSize: 16,
  color: 'white',
  fontWeight: '400',
  width: 20,
  textAlign: 'center',
},
itemAYear: {
  fontSize: 16,
  color: 'white',
  fontWeight: '300',
  width: '100%',
  textAlign: 'left',
},
itemAImage: {
  width: 130,
  height: 130,
  borderRadius: 8, 
  marginRight: 12,
},
itemCover: {
  width: 50,
  height: 50,
  borderRadius: 8, 
  borderWidth: 1,
  borderColor: '#fff',  
},

});

export default Album;