/*========================================================||
||   The Tally of each friend                             ||
||========================================================*/

'use strict';

var React = require('react-native'),
  person = require('./PersonDB'),
  ref = new Firebase("https://katfish.firebaseio.com/"),
  styles = require('./styles');

var {
  View,
  Text,
  TouchableHighlight,
  ListView
} = React;

var TallyMoreNav = React.createClass ({

  getInitialState() {

    return {
      selectedTab: 'search',
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2,
        cloneWithRows: (['row 1', 'row 2'])
      }),
      loaded: false,
      traits : null
    };
  },

  render() {
    var that = this;
    if (!this.state.loaded) {
      ref.on("value", function(snapshot) {
        console.log(window.Katfish);
        that.setState({
          traits: snapshot.val().pond[window.Katfish.userID],
          loaded: true});
      });
      return this.renderLoadingView();
    }
    var traits = this.state.traits;
    console.log("traits",traits,window.Katfish.userID);
    return this.renderTraits(traits);
  },

 renderLoadingView() {
  return (
    <View style={styles.container}>
      <Text> Loading traits... </Text>
    </View>
   );
 },

 renderTraits(traitData) {

   var lines = Object.keys(traitData).length,
     traits = [],
     countVotes = [],
     vote,
     count;

   for(var key in traitData){
     count = -1;
     for (var vote in traitData[key]) { count++; }
     if (key !== 'name' && key !== 'id' && count > 0) {
       var vote = "votes";
       if (count === 1) { vote = vote.replace(/s/,""); }
       countVotes.push(count  + " " + vote + "                                ");
       traits.push(key.replace(/\w/,function(s){return s.toUpperCase(); }) + "                      ");
     }
   }

     return (
       <View style={styles.container}>
         <View style={styles.rightContainer}>
           <Text numberOfLines={lines} style={styles.title}>{traits}</Text>
         </View>
         <View style={styles.rightContainer}>
           <Text numberOfLines={lines} style={styles.title}>{countVotes}</Text>
         </View>
       </View>
     )
   }

 });

 module.exports = TallyMoreNav;