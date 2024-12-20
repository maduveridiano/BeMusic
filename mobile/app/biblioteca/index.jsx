import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import BottomBar from "../../components/bottomBar";
import TopBar from "../../components/topBar";

const Item = ({nome, source, tipo}) => {
    return(
        <View style={styles.itemContainer}>
            <Image 
            style={[styles.img,{ borderRadius: tipo === 'artista'? 50 : 4} ]}
            source={{ uri : source}}
            />
            <View style={styles.info}>
            <Text style={ styles.nome}>{nome}</Text>
            <Text style={ styles.tipo}>{tipo}</Text>
            </View>
        </View>
    )
}

const DATA = [
    {id: '1', tipo: 'artista', nome:'Travis Scott', img:'https://i.scdn.co/image/ab6761610000e5eb19c2790744c792d05570bb71'},
    {id: '2', tipo: 'artista', nome:'Frank Ocean', img:'https://upload.wikimedia.org/wikipedia/commons/e/e3/Frank_Ocean_2022_Blonded.jpg'},
    {id: '3', tipo: 'artista', nome:'Kendrick Lamar', img:'https://i.scdn.co/image/ab6761610000e5eb437b9e2a82505b3d93ff1022'},
    {id: '4', tipo: 'playlist', nome:'musicas favoritas', img:'https://thisis-images.spotifycdn.com/37i9dQZF1DZ06evO0vGf4I-default.jpg'},
    {id: '5', tipo: 'playlist', nome:'hip-hop 2010', img:'https://static.vecteezy.com/ti/vetor-gratis/t1/6470700-de-hip-hop-gratis-vetor.jpg'}
]

const Biblioteca = () => {
    return (
        <View style={styles.container}>
           <TopBar title={'Biblioteca'}  icon2={<AntDesign name="plus" size={28} color="white" />}/>
            <FlatList 
            data={DATA}
            showsVerticalScrollIndicator={false}
            style={styles.scrollView}
            contentContainerStyle={styles.flatListContent}
            keyExtractor={item => item.id}
            renderItem={({item}) => <Item nome={item.nome} source={item.img} tipo={item.tipo}/>}
            />
            <BottomBar />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#1E1E2C', 
},
title: {
    color: '#FFD700',
    fontSize: 32,
    fontWeight: 'bold',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4, 
    marginTop: 20,
},
scrollView: {
    height: '100%',
    width: '100%',
    marginTop: 80,
    paddingHorizontal: 16, 
},
flatListContent: {
    paddingBottom: 90,
},
itemContainer: {
    minWidth: 300,
    width: '100%',
    maxWidth: 420,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    marginBottom: 14,
    backgroundColor: '#2C2C3E', 
    borderRadius: 10, 
    padding: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
},
img: {
    width: 60,
    height: 60,
    borderRadius: 8, 
    borderWidth: 1,
    borderColor: '#FFD700', 
},
info: {
    width: "90%",
    maxWidth: 240,
},
nome: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2, 
},
tipo: {
    color: 'rgba(255,255,255,0.85)', 
    fontSize: 12,
    fontStyle: 'italic', 
},

})

export default Biblioteca;