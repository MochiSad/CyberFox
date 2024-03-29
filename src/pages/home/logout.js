import React from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from "../../services/firebaseConnection";

export function Logout() {
    async function logout() {
        try {
            await signOut(auth);
            Alert.alert('Success', 'Logout efetuado com sucesso!');
        } catch (error) {
            Alert.alert('Error', error.message);
        }
    }

    return (
        <View style={styles.container}>
            <Text>Firebase App - Logout</Text>
            <Button 
                title="Logout"
                onPress={logout}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});