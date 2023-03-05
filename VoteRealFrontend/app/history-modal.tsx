import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, FlatList } from 'react-native';
import { Text, View, Button } from '../components/Themed';
import { useSearchParams } from 'expo-router';
import ICouncilMemberVote from '../models/ICouncilMemberVote';
import { List, ListItem } from "react-native-elements";
import Card from "react-native-card-component";
import Ionicons from '@expo/vector-icons/Ionicons';
import IVote from '../models/IVote';


export default function HistoryModalScreen() {
  const { voteString } = useSearchParams();
  const vote: IVote= JSON.parse(voteString as string); 
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{vote.bill}</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Text style={styles.title}>You voted to {vote.vote ? "approve" : " dissaprove"} {vote.vote ? <Ionicons name="checkmark-circle-outline" size={20} color="green" /> : <Ionicons name="close-circle-outline" size={20} color="red" />}</Text>      
      <Card containerStyle={{backgroundColor: "black", borderWidth: 0}}>
        <Card.Content >                
          <FlatList<ICouncilMemberVote>
            data={vote.councilVotes}
            renderItem={({index, item}) =>     
              <Card.Row >
                <Card.Col>
                  <Text>{item.councilMember}</Text>
                </Card.Col>
                <Card.Col>
                  {item.vote ? <Ionicons name="checkmark-circle-outline" size={18} color="green" /> : <Ionicons name="close-circle-outline" size={18} color="red" />}
                </Card.Col>
              </Card.Row>              
            }
            />     
          </Card.Content> 
        </Card>
      <Text style={{fontSize: 18, padding: 10, marginTop: 3, fontWeight: "bold" }}>Legislation Status: {vote.decision ? "Adopted" : " Rejected"} {vote.decision ? <Ionicons name="checkmark-circle-outline" size={18} color="green" /> : <Ionicons name="close-circle-outline" size={18} color="red" />}</Text>      
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    fontSize: 20
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10
  },
  separator: {
    marginVertical: 20,
    height: 1,
    width: '80%',   
    alignSelf: 'center',
  },
  item: {
    padding: 20,
    fontSize: 15,
    marginTop: 5,
    backgroundColor: 'red'
  },
  list: {
    padding: 20, 
  }
});
