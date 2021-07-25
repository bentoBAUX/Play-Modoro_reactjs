import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import moment from "moment"



export default class Timer extends React.Component {
  navigationOptions={
    headerLeft: ()=> null,
  }

  state={
    eventDate:moment.duration().add({days:3,hours:21,minutes:18,seconds:17}), // add 9 full days
    days:0,
    hours:0,
    mins:0,
    secs:0
  }

  componentDidMount(){
    this.updateTimer()
  }
  updateTimer=()=>{
    
    const x = setInterval(()=>{
      let { eventDate} = this.state

      if(eventDate <=0){
        clearInterval(x)
      }else {
        eventDate = eventDate.subtract(1,"s")
        const days = eventDate.days()
        const hours = eventDate.hours()
        const mins = eventDate.minutes()
        const secs = eventDate.seconds()
        
        this.setState({
          days,
          hours,
          mins,
          secs,
          eventDate
        })
      }
    },1000)

  }
  render(){
    const {navigate} = this.props.navigation;

    const { days, hours, mins, secs } = this.state
    return (
      <View style={styles.container}> 
        
        <View style={styles.playButton}>
          <Text style={{fontWeight:"bold",fontSize:20, color:"#fff"}}>{`${days} : ${hours} : ${mins}`}</Text>
        </View>

      </View> 
    );
  }

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playButton: {
    elevation:100,
    width: 170,
    height: 170,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    backgroundColor: '#1e1e1e',
  },
});