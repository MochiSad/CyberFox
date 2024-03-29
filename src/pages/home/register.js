import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { useAuth } from './authContext';
import { auth } from "../../services/firebaseConnection";

export function Register({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function createUser() {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await sendEmailVerification(userCredential.user);
            Alert.alert('Sucesso', 'Cadastro realizado com sucesso! Verifique seu e-mail para confirmar o registro.');
            navigation.navigate('login'); // Navega para a tela de login após o registro
        } catch (error) {
            Alert.alert('Error', error.message);
        }
    }
    const redirectToLogin = () => {
        navigation.navigate('login'); // Redireciona para a tela de login
    };
    


    return (
        <View style={styles.container}>
            <Text>Firebase App - Register</Text>
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
                title="Register"
                onPress={createUser}
            />
            <Button 
                title="Vá para o Login"
                onPress={redirectToLogin}
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
