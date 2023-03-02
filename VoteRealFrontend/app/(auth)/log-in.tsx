import { StyleSheet } from "react-native";
import { Text, View, Button, TextInput } from '../../components/Themed';
import { useAuth } from "./provider";
import { useState } from "react";

export default function LogIn() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { logIn } = useAuth();

    return (
        <View style={styles.container}>
        <Text style={styles.title}>Log In</Text>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        <TextInput 
            onChangeText={newText => setUsername(newText)}
            value={username}
            placeholder="Enter username"
        ></TextInput>
        <TextInput 
            onChangeText={newText => setPassword(newText)}
            value={password}
            placeholder="Enter password"
        ></TextInput>
        <Button text="Submit" onPress={() => logIn({ username: username, password: password})} ></Button>
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        marginVertical: 30,
    },
    separator: {
        marginVertical: 10,
        height: 1,
        width: '80%',
    },
});
  