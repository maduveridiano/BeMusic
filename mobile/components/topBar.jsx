import { View, Text, StyleSheet, Pressable, Image, Animated } from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Link, router } from "expo-router";
import { useContext } from "react";
import { IdContext } from "../scripts/idContext";

const TopBar = ({ icon, title, icon2, style2 }) => {

    const { userInfo } = useContext(IdContext)

    return (
        <Animated.View style={[styles.bar, {style2}]}>
            {!icon ?
                <Pressable onPress={() => router.push('/perfil')}>
                    <Image
                        style={styles.img}
                        source={{ uri: userInfo.foto }} />
                </Pressable> : icon}
            <Text style={styles.title}>{title}</Text>
            <View style={styles.icon}>
                {icon2}
            </View>

        </Animated.View>
    );
};

const styles = StyleSheet.create({
    bar: {
        width: '100%',
        backgroundColor: 'transparent',
        top: 0,
        left: 0,
        position: 'absolute',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 40,
        padding: 10,
        paddingTop: 8
    },
    img: {
        width: 34,
        height: 34,
        borderRadius: 50
    },
    title: {
        color: 'white',
        fontSize: 32,
        fontWeight: 'bold',
    },
    icon: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default TopBar;