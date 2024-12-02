import { View, Text, StyleSheet, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { usePathname, useRouter } from "expo-router";

const BottomBar = () => {
    const router = useRouter();
    const pathname = usePathname();

    const isActive = (router) => pathname === router;

    return (
        <View style={styles.bar}>
            <LinearGradient 
                style={styles.background}
                colors={['transparent', 'rgba(1, 1, 1, 0.8)','black']}
            />
            <Pressable 
                style={styles.iconBox}
                onPress={() => router.push('/home')}
            >
                <MaterialIcons 
                    name="home-filled" 
                    size={24} 
                    color={isActive('/home') ? 'white' : 'rgba(255, 255, 255, 0.6)'} 
                />
                <Text style={[styles.label, isActive('/home') && styles.activeLabel]}>
                    Home
                </Text>
            </Pressable>
            <Pressable 
                style={styles.iconBox}
                onPress={() => router.push('/pesquisa')}
            >
                <MaterialIcons 
                    name="search" 
                    size={24} 
                    color={isActive('/pesquisa') ? 'white' : 'rgba(255, 255, 255, 0.6)'} 
                />
                <Text style={[styles.label, isActive('/pesquisa') && styles.activeLabel]}>
                    Search
                </Text>
            </Pressable>
            <Pressable 
                style={styles.iconBox}
                onPress={() => router.push('/biblioteca')}
            >
                <MaterialIcons 
                    name="library-music" 
                    size={24} 
                    color={isActive('/biblioteca') ? 'white' : 'rgba(255, 255, 255, 0.6)'} 
                />
                <Text style={[styles.label, isActive('/biblioteca') && styles.activeLabel]}>
                    Library
                </Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    bar: {
        width: '100%',
        backgroundColor: 'transparent',
        height: 80,
        bottom: 0,
        left: 0,
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    iconBox: {
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        width: '33%',
    },
    label: {
        color: 'rgba(255, 255, 255, 0.6)',
        fontSize: 11,
    },
    activeLabel: {
        color: 'white', 
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: '100%',
    }
});

export default BottomBar;