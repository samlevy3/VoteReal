import { StyleSheet, FlatList } from 'react-native';
import { Text, View, Button, TextInput } from '../../components/Themed';
import { useAuth } from '../(auth)/provider';
import { ListItemButton, ListItemText, ListItem } from '@mui/material';
import { useRouter, Link } from "expo-router";
import IVote from "../../models/IVote";
import Ionicons from '@expo/vector-icons/Ionicons';



export default function TabTwoScreen() {
    const { vote, user } = useAuth();
    const router = useRouter();

    return (
        <View style={styles.container}>
            <FlatList<IVote>
                data={user.votes}
                renderItem={({item}) => 
                <View style={styles.list}>
                  <Link href={{ pathname: "/history-modal", params: { voteString: JSON.stringify(item) }}} style={{fontSize: 20,}} >
                    <Text >{item.bill}</Text>
                  </Link>  
                </View>                   
                }
            />     
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  list: {
    padding: 20, 
    backgroundColor: "#121212",
    borderBottomColor: "white",
    borderBottomWidth: 1
  }
});
