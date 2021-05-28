import React, {useRef} from 'react';
import {View} from 'react-native';
import {GREEN_COLOR} from '../../helpers/constants';

export const LeaderBoardScreen = () => {
  const LottieRef = useRef(null);
  return (
    <View style={{backgroundColor: GREEN_COLOR, flex: 1}}>
      {/*<View style={{backgroundColor: DARK_COLOR, borderBottomRightRadius: 40, borderBottomLeftRadius: 40}}>*/}
      {/*    <SafeAreaView style={{padding: 20, flexDirection: 'row'}}>*/}
      {/*        <Ripple onPress={() => {*/}
      {/*            LottieRef.current.play();*/}
      {/*        }} style={{width: 100, height: 100, backgroundColor: GREEN_COLOR, borderRadius: 500}}>*/}
      {/*            <LottieView ref={LottieRef} source={require('../../assets/animations/panda.json')}*/}
      {/*                        style={{width: '100%', height: '100%'}} loop={false} progress={undefined}/>*/}
      {/*        </Ripple>*/}
      {/*        <View style={{alignSelf: 'center', marginLeft: 10, flex:1}}>*/}
      {/*            <Text style={{color: '#fff', fontSize: 20, fontWeight: '700'}}>Radu Emilian</Text>*/}
      {/*            <Text style={{color: '#fff', fontSize: 10, fontWeight: '200'}}>Level 5</Text>*/}
      {/*            <Progress.Bar progress={0.5} width={200} color={'rgba(122,216,185,100)'}*/}
      {/*                          style={{marginTop: 5}}/>*/}
      {/*            <View style={{width: '100%', justifyContent: 'space-between', flexDirection: 'row'}}>*/}
      {/*                <Text style={{color: '#fff', fontSize: 10, fontWeight: '200'}}>0</Text>*/}
      {/*                <Text style={{color: '#fff', fontSize: 10, fontWeight: '200'}}>500</Text>*/}
      {/*            </View>*/}

      {/*        </View>*/}
      {/*    </SafeAreaView>*/}
      {/*</View>*/}
      {/*<ScrollView contentContainerStyle={{flex: 1, padding: 20}}*/}
      {/*            style={{backgroundColor: GREEN_COLOR, minHeight: 250}}>*/}
      {/*    <Ripple*/}
      {/*        style={{*/}
      {/*            backgroundColor: DARK_COLOR,*/}
      {/*            padding: 10,*/}
      {/*            borderRadius: 10,*/}
      {/*            overflow: 'hidden',*/}
      {/*        }}><Text>Salut</Text></Ripple>*/}
      {/*</ScrollView>*/}
    </View>
  );
};
