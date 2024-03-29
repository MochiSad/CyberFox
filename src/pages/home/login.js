import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../../services/firebaseConnection";

export function Login({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function login() {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            if (user.emailVerified) {
                Alert.alert('Sucesso', 'Login efetuado com sucesso!');
                navigation.navigate('logout'); // Navega para a tela de logout após o login
            } else {
                Alert.alert('Erro', 'Por favor, verifique seu e-mail para fazer login.');
            }
        } catch (error) {
            Alert.alert('Error', error.message);
        }
    }

    return (
        <View style={styles.container}>
            <Text>Firebase App - Login</Text>
            <TextInput 
                placeholder='Email'
                placeholderTextColor="#313131"
                value={email}
                onChangeText={value => setEmail(value)}
                style={styles.input}
            />
            <TextInput 
                placeholder='Password'
                placeholderTextColor="#313131"
                value={password}
                onChangeText={value => setPassword(value)}
                style={styles.input}
                secureTextEntry
            />
            <Button 
                title="Login"
                onPress={login}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: '#313131',
        marginTop: 10,
        width: '80%',
        height: 50,
    }
});