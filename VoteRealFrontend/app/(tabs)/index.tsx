import { StyleSheet, ImageSourcePropType } from 'react-native';

import { Text, View } from '../../components/Themed';
import Carousel from 'react-native-snap-carousel';
import { useAuth } from '../(auth)/provider';
import { Dimensions } from 'react-native';
import Card from "react-native-card-component";
import React from 'react'
import PaginationDot from 'react-native-insta-pagination-dots'
import ICouncilMember from '../../models/ICouncilMember';
import * as Progress from 'react-native-progress';
import Ionicons from '@expo/vector-icons/Ionicons';


const councilMembers = require('../../assets/council-members.json');

const { height, width } = Dimensions.get('window');
const SPACING = 10;
const THUMB_SIZE = 80;

export default function TabOneScreen() {
  const { user } = useAuth();
  const [curPage] = React.useState(0);
  let stats: any[] = [];
  for (let councilMember of councilMembers) {
    stats.push(getStats(councilMember.name));
  }
  return (
    <View >
        <Carousel<ICouncilMember>
        layout='default'
        sliderWidth={width}
        data={ councilMembers }
        itemWidth={width} 
        renderItem={({ item, index }: { item: ICouncilMember, index: number }) => (  
          <Card containerStyle={{ height: "100%", padding: 10}}>
            <Card.Row center={true}>
              <Card.Col center={true} >
                <PaginationDot 
                    activeDotColor={'black'}
                    curPage={index}
                    maxPage={ councilMembers.length }
                    
                />
              </Card.Col>
            </Card.Row>
            <Card.Thumbnail
                source={{ uri: item.picture_uri }}
                style={{ height: 250, width: 250, marginTop: 10 }}
                align={'center'}
                // stretch
                // imageProps={{resizeMode: 'contain'}}
            />
            <Card.Content >
                <Card.Title
                  text={ item.name }
                  style={styles.title}
                />
                <Card.Row>
                  <Card.Col center={true}>
                    <Progress.Bar progress={stats[index].match} height={10} width={300} color={'#2ecc71'} unfilledColor={'#f64747'}/>
                  </Card.Col>
                </Card.Row>
                <Card.Row >
                  <Text style={styles.content} >
                    {Number(Number(stats[index].match * 100).toFixed(1)) > 60 && <Ionicons name="md-checkmark-circle" size={18} color="green" />}
                    {Number(Number(stats[index].match * 100).toFixed(1)) < 40 && <Ionicons name="alert-circle" size={18} color="red" />}
                    {Number(Number(stats[index].match * 100).toFixed(1)) >= 40 && Number(Number(stats[index].match * 100).toFixed(1)) <= 60 && <Ionicons name="alert-circle" size={18} color="orange" />}
                    You agree {Number(stats[index].match * 100).toFixed(1)}% of the time
                    </Text>
                  </Card.Row>
                  <Card.Row>
                    <Text style={styles.content}>
                      <Ionicons name="md-checkmark-circle" size={18} color="green" />
                      Agreed on {stats[index].agree} issue(s)                 
                    </Text>
                  </Card.Row>
                  <Card.Row>
                    <Text style={styles.content}>
                      <Ionicons name="alert-circle" size={18} color="red" />
                      Disagreed on {stats[index].disagree} issue(s)
                    </Text>
                  </Card.Row>
                <View style={styles.separator} lightColor="#eee" darkColor="#eee" />
                <Card.Row>
                  <Ionicons name="mail" size={18} />
                  <Text style={styles.contact}>{ " " + item.email}</Text>
                </Card.Row>
                <Card.Row>
                <Ionicons name="ios-megaphone" size={18}  />
                  <Text style={styles.contact}>{ " " + item.phone}</Text>
                </Card.Row>
            </Card.Content>
          </Card>
        )}
      />
    </View>
  );
}
        


function getStats(councilMember: string) {
  const { user } = useAuth();
  let total: number = 0; 
  let agree: number = 0;
  if (user.votes) {
    for (let vote of user.votes) {
      for (let cmVote of vote.councilVotes) {
        if (cmVote.councilMember == councilMember) {
          if (cmVote.vote == vote.vote) {
            agree++;
          }
          total++;
        }
      }
    }
  }
  return { agree: agree, disagree: total - agree, total: total, match: total != 0 ? agree / total : 0 }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  content: {
    fontSize: 18,
    textAlign: 'center',
    color: 'black',
    marginTop: 10,
  },
  contact: {
    fontSize: 18,
    textAlign: 'center',
    color: 'black',
  },
  separator: {
    marginVertical: 15,
    height: 1,
    width: '90%',
  },
});