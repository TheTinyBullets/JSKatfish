'use strict';

/*========================================================||
||   External required sources                            ||
||========================================================*/

var React = require('react-native'),
  FBSDKLogin = require('react-native-fbsdklogin'),
  FBSDKCore = require('react-native-fbsdkcore'),
  person = require('./PersonDB'),
  Login = require('./Login'),
  Firebase = require('firebase'),
  styles = require('./styles'),
  ref = new Firebase("https://katfish.firebaseio.com/"),

/*========================================================||
||   Locally defined variables                            ||
||========================================================*/

  personRef;

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
} = React;

var {
  FBSDKGraphRequest,
  FBSDKGraphRequestManager,
  FBSDKAccessToken
} = FBSDKCore;

/*========================================================||
||   Adds the SearchNav view on top of Katfish            ||
||========================================================*/

var MoreNav = React.createClass ({

  render() {
    window.MoreNav = this;
    var that = this;
    if (this.state) {
       return this.renderTraits(this.state.traits);
     } else {
        ref.on("value", function(snapshot) {
          that.fireCall(snapshot.val().pond[window.Katfish.userID]);
        });
      return this.renderLoadingView();
    }
  // window.MoreNav = this;
  // var that = this;

  //   if (!this.state) {
  //         ref.on("value", function(snapshot) {
  //           that.setState({
  //             traits: snapshot.val().pond[window.Katfish.userID],
  //             loaded: true});
  //       });
  //       this.fireCall(this.state.traits);
  //     return this.renderLoadingView();
  //   }
  //     return this.renderTraits(this.state.traits);
},

clickHandler() {
  window.Login.state = null;
  window.Katfish.state = null;
},

renderLoadingView() {
  return (
    <View style={styles.container}>
      <Text> Loading traits... </Text>
    </View>
    );
},

renderTraits(list){
  return (
    <View style={styles.moreNavContainer}>
      <Image source={{uri: 'http://chrissalam.com/bash/palm-trees.jpg'}} style={{backgroundColor: 'transparent', height: '600', width: '360'}}>
        <Image source={{uri: 'http://graph.facebook.com/' + window.Katfish.userID + '/picture?type=large'}}
          style={{marginTop: 80, width: 200, height: 200, borderRadius: 100, marginBottom: 90, borderWidth:5, borderColor:'#83aed2'}} />
            <View>
              <Text numberOfLines={list.length} style={styles.title}>My friends say I am {list.slice(0,list.length-1).join(", ")} and {list.slice(list.length-1)}</Text>
            </View>
      </Image>
    </View>
    );
},

fireCall(temp){
  var that = this;
  var result = [[0,0]];

      for(var key in temp){
        if(key !== 'name' && key !== 'id'){
          if(result.length < 1) {
            result.push([key, Object.keys(temp[key]).length]);
          }
          else if(Object.keys(temp[key]).length >= result[result.length-1][1]){
            result.push([Object.keys(temp[key]).length, key ]);
          }
          else if(Object.keys(temp[key]).length >= result[0][1]){
            result.unshift([Object.keys(temp[key]).length, key]);
            result.sort();
          }
        }
      }

      result = result.reverse().splice(0,5);
      for(var i = 0; i < result.length; i++){
        result[i] = result[i][1]
      }
      that.setState({ traits : result })
    }

});

module.exports = MoreNav;

//