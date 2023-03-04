import { StyleSheet, FlatList } from 'react-native';
import { Text, View, Button, TextInput } from '../../components/Themed';
import { useAuth } from '../(auth)/provider';
import { ListItemButton, ListItemText } from '@mui/material';
import { useRouter, Link } from "expo-router";


export default function TabTwoScreen() {
    const { vote, user } = useAuth();
    const router = useRouter();

    return (
        <View style={styles.container}>
            <FlatList
                data={user.votes}
                renderItem={({item}) => 
                    <>            
                        <Text>:(</Text>                    
                    </>
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
});
