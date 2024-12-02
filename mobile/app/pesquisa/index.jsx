import { FlatList, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import BottomBar from "../../components/bottomBar";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRef } from "react";
import TopBar from "../../components/topBar";

const Card = ({nome}) => {
    return(
    <View style={styles.cardContainer}>
        <Text style={styles.p}>{nome}</Text>
    </View>
    )
  }
  
  const DATA = [
      {id: '1', nome: 'hip-hop'},
      {id: '2', nome: 'pop'},
      {id: '3', nome: 'Jazz'},
      {id: '4', nome: 'reggae'},
      {id: '5', nome: 'Souls'},
      {id: '6', nome: 'funk'},
      {id: '7', nome: 'classica'},
      {id: '8', nome: 'indiana'},
      {id: '9', nome: 'k-pop'},
      {id: '10', nome: 'sertanejo'},
      {id: '11', nome: 'samba'},
      {id: '12', nome: 'rock'},
      {id: '13', nome: 'metal'},
      {id: '14', nome: 'punk'},

  ]
const Pesquisa = () => {
    const inputRef = useRef(null);

  const evitarFoco = () => {
    if (inputRef.current) {
      inputRef.current.blur(); 
    }
  };


    return(
        <>
        <View style={styles.container}>
          <TopBar title={'Busca'} icon={null}/>
            <Pressable style={styles.searchBar}>
            <FontAwesome name="search" size={18} color="black" />
                <TextInput 
                ref={inputRef}
                style={styles.placeholder}
                placeholder="Oque você gostaria de ouvir?"
                onFocus={evitarFoco}/>
            </Pressable>
            <Text style={styles.subTitle}>
                Gêneros disponíveis
            </Text>
            <FlatList 
            data={DATA}
            showsVerticalScrollIndicator={false}
            style={styles.scrollView}
            contentContainerStyle={styles.flatListContent}
            numColumns={2}
            keyExtractor={item => item.id}
            renderItem={({item}) => <Card nome={item.nome}/>}
            />
        </View>
            <BottomBar />
            </>
    )
}

const styles = StyleSheet.create ({
    container: {
        flex: 1, 
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#121212'
    },
    searchBar: {
        backgroundColor: 'white',
        height: 38,
        minwidth: 260,
        width: '90%',
        maxWidth: 320,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingHorizontal: 16,
        gap: 16,
        marginTop: 80,
    },
    placeholder: {
        width: 200,
    },
    scrollView: {
        height: '100%',
        marginTop: 10,
    },
    flatListContent: {
        paddingBottom: 90
    },
    cardContainer: {
        width: 150,
        height: 90,
        margin: 7,
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 16,
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
    },
    subTitle: {
        fontSize: 26,
        fontWeight: 'bold',
        color: 'white',
        marginTop: 16
    },
    p:{
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold'
    }
})

export default Pesquisa;