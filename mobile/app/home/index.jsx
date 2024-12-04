import { FlatList, ScrollView, StyleSheet, Text, View, Image, Pressable } from "react-native";
import BottomBar from "../../components/bottomBar";
import TopBar from "../../components/topBar";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";

const Home = () => {
    const [albuns, setAlbuns] = useState([]);
    const [maisVistos, setMaisVistos] = useState([]);
    const [artistasAlbum, setArtistasAlbum] = useState({});
    const [artistas, setArtistas] = useState([]);
    const [sections, setSections] = useState([]);
    const router = useRouter();

    useEffect(() => {
        fetch('http://localhost:8000/album/')
            .then((resposta) => resposta.json())
            .then((dados) => {
                setAlbuns(dados);
                shuffleArray(dados);
                fetchArtistas(dados);
            })
            .catch(() => console.log('Aconteceu um erro ao buscar os dados.'));
    }, []);

    useEffect(() => {
        fetch('http://localhost:8000/artista/')
            .then((resposta) => resposta.json())
            .then((dados) => {
                setArtistas(dados);
            })
            .catch(() => console.log('Aconteceu um erro ao buscar os dados.'));
    }, []);

    const shuffleArray = (array) => {
        const dadosEmbaralhados = [...array];
        dadosEmbaralhados.sort(() => Math.random() - 0.5);
        setMaisVistos(dadosEmbaralhados);
    };

    const fetchArtistas = (albuns) => {
        const artistasIds = albuns.map(album => album.artista_id);

        artistasIds.forEach(id => {
            fetch(`http://localhost:8000/artista/${id}`)
                .then((res) => res.json())
                .then((artista) => {
                    setArtistasAlbum(prevState => ({
                        ...prevState,
                        [id]: artista.nome,
                    }));
                })
                .catch(() => console.log('Erro ao buscar o artista.'));
        });
    };

    useEffect(() => {
        setSections([
            {
                title: 'Recomendados',
                data: albuns.slice(0, 5), 
                type: 'album',
            },
            {
                title: 'Álbuns Mais Ouvidos',
                data: maisVistos.slice(0, 6), 
                type: 'album',
            },
            {
                title: 'Artistas Favoritos',
                data: artistas, 
                type: 'artista',
            },
        ]);
    }, [albuns, maisVistos, artistas]);

    const renderAlbumItem = (item) => (
        <Pressable
            style={styles.itemContainer}
            onPress={() => router.push(`/album/${item.id}`)} 
        >
            <Image
                style={[styles.img, { borderRadius: 4 }]}
                source={{ uri: item.coverImageUrl }}
            />
            <View style={styles.itemContainer}>
                <Text style={styles.album}>{item.title}</Text>
                {artistasAlbum[item.artista_id] && (
                    <Text style={styles.autor}>
                        {artistasAlbum[item.artista_id]}
                    </Text>
                )}
            </View>
        </Pressable>
    );

    const renderArtistItem = (item) => (
        <Pressable
            style={styles.itemContainer}
            onPress={() => router.push(`/artista/${item.id}`)}
        >
            <Image
                style={[styles.img, { borderRadius: 80 }]}
                source={{ uri: item.imageUrl }}
            />
            <View style={styles.itemContainer}>
                <Text style={styles.artista}>{item.nome}</Text>
            </View>
        </Pressable>
    );

    return (
        <View style={styles.container}>
            <TopBar title={'Spotifake'} icon={null} />
            <ScrollView style={styles.feed} showsVerticalScrollIndicator={false}>
                {sections.map((section) => (
                    <View key={section.title} style={styles.sectionContainer}>
                        <Text style={styles.header}>{section.title}</Text>
                        <FlatList
                            data={section.data}
                            horizontal
                            keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
                            renderItem={({ item }) => {
                                return section.type === 'album' 
                                    ? renderAlbumItem(item) 
                                    : renderArtistItem(item); 
                            }}
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.row}
                        />
                    </View>
                ))}
            </ScrollView>
            <BottomBar />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: '#1E1E2C', 
},
sectionContainer: {
    marginVertical: 12,
},
feed: {
    marginTop: 70,
    paddingBottom: 80,
},
row: {
    paddingHorizontal: 20,
    gap: 12,
},
img: {
    width: 130,
    height: 130,
    marginBottom: 6,
    borderRadius: 12, 
    borderWidth: 2,
    borderColor: '#FFD700', 
},
itemContainer: {
    alignItems: 'center',
    width: 130,
    borderRadius: 10,
    backgroundColor: '#2C2C3E', 
    padding: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
},
itemText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
    marginTop: 4,
},
header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFD700', 
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomWidth: 2,
    borderBottomColor: '#FFD700',
},
album: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
    height: 22,
    width: '100%',
    textAlign: 'left',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
},
artista: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
    height: 22,
    width: '100%',
    textAlign: 'center',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
},
autor: {
    color: "rgba(255,255,255,0.85)",
    fontSize: 12,
    textAlign: 'left',
    marginBottom: 6,
    width: '100%',
    fontStyle: 'italic',
},
});

export default Home;
