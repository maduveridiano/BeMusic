import { View, StyleSheet, Image, Animated } from 'react-native'
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef } from 'react';
import { useRouter } from 'expo-router';

const SplashScreen = () => {
    const router = useRouter()
    const fadeAnimation = useRef(new Animated.Value(0)).current

    const fadeIn = () => {
        Animated.timing(fadeAnimation, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
        }).start();
    }

    useEffect(() =>{
        fadeIn()
        const timer = setTimeout(() =>{
          router.push('/login')
        },3000)
        return() => clearTimeout(timer)
      }, [])
    return(
        <View style={styles.container}>
            <LinearGradient
                colors={['#121212', 'black']}
                style={styles.background}
            />
            <Animated.Image 
            style={[styles.logo, {
                opacity: fadeAnimation
            }]}
            source={require('../assets/images/spotifake.png')}
            />
        </View>
    )
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }, logo:{
        width: 300,
        height: 300
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '100%',
    }
})

export default SplashScreen