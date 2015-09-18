'use strict';

/*========================================================||
||   External required sources                            ||
||========================================================*/

var React = require('react-native'),
  Firebase = require('firebase'),
  person = require('./PersonDB'),
  ref = new Firebase("https://katfish.firebaseio.com/"),

/*========================================================||
||   Locally defined variables                            ||
||========================================================*/

  styles = require('./styles'),
  userID,
  traits;

/*========================================================||
||   React native variables, used like HTML tags          ||
||========================================================*/

var {
 View,
 Text,
 Component,
 ListView,
 Image,
 TouchableHighlight,
 ScrollView
} = React;

/*========================================================||
||   The Tally of each individual                         ||
||========================================================*/

// var SearchNav = React.createClass ({

//   getInitialState() {
//   //this will be replaced with a function that gets the facebook id of the user who logs in
//   userID = person.id;

//   return {
//     selectedTab: 'search',
//     dataSource: new ListView.DataSource({
//       rowHasChanged: (r1, r2) => r1 !== r2,
//       cloneWithRows: (['row 1', 'row 2'])
//     }),
//     loaded: false,
//     traits : null
//   };
// },

// render() {
//   var that = this;
//   if (!this.state.loaded) {
//     ref.on("value", function(snapshot) {
//       that.setState({
//         traits: snapshot.val().pond[userID],
//         loaded:true});
//     });
//     return this.renderLoadingView();
//   }
//   traits = this.state.traits;
//   return this.renderTraits(traits);
// },

// renderLoadingView() {
//  return (
//    <View style={styles.container}>
//      <Text> Loading traits... </Text>
//    </View>
//   );
// },

// renderTraits(traitData) {

//   var lines = Object.keys(traitData).length,
//     traits = [],
//     countVotes = [],
//     vote,
//     count;

//   for(var key in traitData){
//     count = -1;
//     for (var vote in traitData[key]) { count++; }
//     if (key !== 'name' && key !== 'id' && count > 0) {
//       var vote = "votes";
//       if (count === 1) { vote = vote.replace(/s/,""); }
//       countVotes.push(count  + " " + vote + "                                ");
//       traits.push(key.replace(/\w/,function(s){return s.toUpperCase(); }) + "                      ");
//     }
//   }

//     return (
//       <View style={styles.container}>
//         <View style={styles.rightContainer}>
//           <Text numberOfLines={lines} style={styles.title}> {traits}</Text>
//         </View>
//         <View style={styles.rightContainer}>
//           <Text numberOfLines={lines} style={styles.title}> {countVotes}</Text>
//         </View>
//       </View>
//     )
//   }

// });

// module.exports = SearchNav;

/*========================================================||
||   This is the pond                                     ||
||========================================================*/

var SearchNav = React.createClass ({
  render() {
    window.SearchNav = this;
    if(!this.state){
      this.formatFriends();
      return this.renderLoadingView()
    }
    return (
      <View style={styles.featNavContainer}>
      <Image source={{uri: 'http://chrissalam.com/bash/fishing2.png'}} style={{backgroundColor: 'transparent', height: '600', width: '374'}}>
      <ScrollView>
      {this.state.names}
      </ScrollView>
      </Image>
      </View>
      )
  },

  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text>
          Take a look at the pond
        </Text>
      </View>
    );
  },

  clickHandler(friend){
    person.id = friend.id;
    person.name = friend.name;
    // window.Featured.setState({reloaded: true});
    window.FeaturedNav.setState({reloaded: true});
    window.Katfish.setState({
      selectedTab: 'featured'
    })
  },

  formatFriends(){
    var that = this,
    names = [],
    friends = window.Katfish.friends;

    for(var i = 0; i < friends.length; i++){
      if(friends[i].name){
        (function(friend){
          names.push(
            <TouchableHighlight style={{underlayColor: 'white'}}
            onPress={()=>{that.clickHandler(friend)}}>
            <Image source={{uri: 'http://graph.facebook.com/' + friend.id + '/picture?type=large'}}
            style={{margin: 20, width: 180, height: 180, borderRadius: 90, marginLeft:96, borderWidth:5, borderColor:'white'}}>
            <View style={styles.searchNavOverlay}>
            <Text style={styles.searchNavChoiceText}>{friends[i].name}</Text>
            </View>
            </Image>
            </TouchableHighlight>
          )
          that.setState({'names' : names})
        })(friends[i])
      }
    }
  }
});

module.exports = SearchNav;