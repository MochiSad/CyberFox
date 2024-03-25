import React, { useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Button,
    ScrollView,
    Alert
} from 'react-native'

import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut,
    sendEmailVerification 
} from 'firebase/auth'

import { auth } from "../../services/firebaseConnection"

export function Home() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function createUser() {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await sendEmailVerification(userCredential.user);
            Alert.alert('Sucesso', 'Cadastro realizado com sucesso! Verifique seu e-mail para confirmar o registro.');
        } catch (error) {
            Alert.alert('Erro', error.message);
        }
    }

    async function login() {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            
            if (user.emailVerified) {
                Alert.alert('Sucesso', 'Login realizado com sucesso!');
            } else {
                await signOut(auth);
                Alert.alert('Erro', 'Por favor, verifique seu e-mail para fazer login.');
            }
        } catch (error) {
            Alert.alert('Erro', error.message);
        }
    }

    async function logout() {
        try {
            const user = auth.currentUser;
            if (user) {
                await signOut(auth);
                Alert.alert('Sucesso', 'Logout realizado com sucesso!');
            } else {
                Alert.alert('Erro', 'Nenhum usuário está logado.');
            }
        } catch (error) {
            Alert.alert('Erro', error.message);
        }
    }


    return (
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps='handled'>
            <Text>Firebase App</Text>
            <TextInput 
                placeholder='email'
                placeholderTextColor="#313131"
                value={email}
                onChangeText={value => setEmail(value)}
                style={styles.input}
            />
            <TextInput 
                placeholder='password'
                placeholderTextColor="#313131"
                value={password}
                onChangeText={value => setPassword(value)}
                style={[styles.input, {marginBottom: 10}]}
            />
            <Button 
                title="CADASTRAR"
                onPress={createUser}
                
            />
            <Button 
                title="ENTRAR"
                onPress={login}
                
            />
            <Button 
                title="SAIR"
                onPress={logout}
                
            />
        </ScrollView>
    )
   
}

const styles = StyleSheet.create({
    container: {
        marginTop: 300,
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: '#313131',
        marginTop: 5,
        width: '80%',
        height: 50,
    }

})