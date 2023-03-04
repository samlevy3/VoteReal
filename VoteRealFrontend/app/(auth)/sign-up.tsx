import { StyleSheet, Pressable, useColorScheme } from "react-native";
import { Text, View, Button, TextInput } from '../../components/Themed';
import { useAuth } from "./provider";
import { useState } from "react";
import { Link } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import Colors from '../../constants/Colors';

export default function SignUp() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const colorScheme = useColorScheme();
    const { logIn, signUp } = useAuth();

    return (
        <View style={styles.container}>
        <Text style={styles.title}>Sign Up</Text>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        <TextInput 
            onChangeText={newText => setUsername(newText)}
            value={username}
            placeholder="Enter name"
        ></TextInput>
        <View style={{ width: "100%", flexDirection:'row' , alignItems: 'center', }}>
            <TextInput 
                onChangeText={newText => setUsername(newText)}
                value={username}
                placeholder="Enter voting address"
            ></TextInput>
            <Link href="/modal" asChild>
                <Pressable>
                {({ pressed }) => (
                    <FontAwesome
                    name="info-circle"
                    size={20}
                    color={Colors[colorScheme ?? 'light'].text}
                    style={{ opacity: pressed ? 0.5 : 1, marginBottom: 20  }}
                    />
                )}
                </Pressable>
            </Link>
        </View>
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
        <Button text="Submit" onPress={() => signUp({
          username: "slevy3",
          password: "12345",
          votes: [],
          currVote: {
            bill: "CB 123",
            vote: false, 
            summary: [],
            councilVotes: []
          },
          uuid: "1"
        })} ></Button>
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
  