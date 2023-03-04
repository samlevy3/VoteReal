import { StyleSheet, useColorScheme } from 'react-native';
import { Text, View, Button, TextInput } from '../../components/Themed';
import { useAuth } from '../(auth)/provider';
import Carousel from 'react-native-snap-carousel';
import { Dimensions } from 'react-native';
import Card from "react-native-card-component";
import React from 'react'
import PaginationDot from 'react-native-insta-pagination-dots'

const { height, width } = Dimensions.get('window');
const SPACING = 10;
const THUMB_SIZE = 80;

export default function Vote() {
  const { vote, user } = useAuth();
  
  return (
    <View >
       <Carousel
        layout='default'
        sliderWidth={width}
        data={ user.currVote ? user.currVote?.summary : [] }
        itemWidth={width} 
        renderItem={({ item, index }: { item: string, index: number }) => (  
          <Card containerStyle={{height: "100%",  alignItems: 'center'}}>
            <Card.Content >
                <Card.Title
                  text={ "" + user.currVote?.bill }
                  style={styles.title}
                />
                <Card.Row center={true}>
                  <Card.Col center={true}>
                    <PaginationDot 
                        activeDotColor={'black'}
                        curPage={index}
                        maxPage={user.currVote ? user.currVote?.summary.length : 0}
                    />
                  </Card.Col>
                </Card.Row>
                <Card.Row center={true}>
                  <Text style={styles.content}>{item}</Text>
                </Card.Row>
                {index == (user.currVote ? user.currVote?.summary.length - 1 : 0) ? 
                  <Card.Row >
                    <Card.Col>
                      <Button text="Yes" onPress={() => {
                          vote(user, true); 
                        }}>
                      </Button>
                    </Card.Col>
                    <Card.Col>
                      <Button text="No" onPress={() => {
                          vote(user, false); 
                        }}>
                      </Button>
                    </Card.Col>
                  </Card.Row>
                : null}
            </Card.Content>
          </Card>
        )}
      />      
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
    textAlign: 'center',
    marginBottom: 20
  },
  content: {
    fontSize: 20,
    textAlign: 'center',
    color: 'black',
    lineHeight: 30,
    marginVertical: 10
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
