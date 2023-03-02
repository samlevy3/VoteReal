import { StyleSheet, Pressable, useColorScheme } from "react-native";
import { Text, View, Button } from '../../components/Themed';
import { Link } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Colors from '../../constants/Colors';


export default function SignIn() {
  const colorScheme = useColorScheme();

  return (
    <View style={styles.container}>
    <Text style={styles.title}>VoteReal</Text>
    <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
    <Link href="/log-in" asChild>
        <Button text="Log In" ></Button>
    </Link>
    <Link href="/sign-up" asChild>
        <Button text="Sign Up" ></Button>
    </Link>
  </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});
  