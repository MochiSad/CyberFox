import React from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { useAuth } from './authContext';
import { auth } from "../../services/firebaseConnection";

export function Logout() {
  const { isLoggedIn, logout } = useAuth();

  const handleLogout = () => {
    if (isLoggedIn) {
      logout();
      Alert.alert('Sucesso', 'Deslogou com sucesso!');
    } else {
      Alert.alert('Erro', 'Você não está logado.');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Firebase App - Logout</Text>
      <Button 
        title="Logout"
        onPress={handleLogout}
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