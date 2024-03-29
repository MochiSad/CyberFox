import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useAuth } from './authContext'; // Importe o hook useAuth
import { auth } from "../../services/firebaseConnection";

export function Login({ navigation }) {
    const { login } = useAuth(); // Use o hook useAuth para acessar o contexto de autenticação
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleLogin() { // Renomeie a função para evitar conflito com o nome do estado
        try {
            await login(email, password); // Use a função de login fornecida pelo contexto
        } catch (error) {
            Alert.alert('Error', error.message);
        }
    }

    async function handleLoginCheckEmail() {
        try {
            await handleLogin();
            const user = auth.currentUser;
            if (user.emailVerified) {
                Alert.alert('Success', 'Login successful!');
                navigation.navigate('logout'); // Navega para a tela de logout após o login
            } else {
                Alert.alert('Error', 'Please verify your email to login.');
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
                onPress={handleLoginCheckEmail} // Use a função de login atualizada
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
