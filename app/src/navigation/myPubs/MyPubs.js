import React, {useEffect} from 'react';
import {Dimensions, FlatList, Text, TouchableOpacity, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {theme} from '../../helpers/constants';
import LottieView from 'lottie-react-native';
import {useLazyQuery, useReactiveVar} from '@apollo/client';
import {MY_PUBS_QUERY} from '../../graphql/queries/Pubs';
import {pubs} from '../../helpers/variables';
import {Loader} from '../Loader';
import AddPub from './AddPub';
import {AddPubRoute} from '../../helpers/routes';
import PubCard from '../main/PubCard';

const MyPubsScreen = ({navigation}) => {
  const {top} = useSafeAreaInsets();
  const [pubQuery, {loading, data, error}] = useLazyQuery(MY_PUBS_QUERY, {
    fetchPolicy: 'no-cache',
  });
  const pubList = useReactiveVar(pubs);
  useEffect(() => {
    pubQuery();
  }, []);
  useEffect(() => {
    if (data) {
      pubs(data.myPubs);
    }
    if (error) {
      alert(JSON.stringify(error));
    }
  }, [data, error]);

  const emptyList = () => {
    return (
      <View style={style.wrapper}>
        <LottieView
          source={require('../../assets/animations/empty-stores.json')}
          loop={true}
          autoPlay={true}
          style={style.empty}
        />
        <View style={style.emptyWrapper}>
          <Text style={style.emptyText}>
            Seems like there you don't have any pubs.
          </Text>
          <TouchableOpacity style={style.addButton} onPress={addPress}>
            <Text style={style.addButtonText}>Try adding one</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  const addPress = () => {
    navigation.navigate(AddPubRoute);
  };
  return (
    <View style={[style.content, {paddingTop: top}]}>
      <View style={style.section}>
        <View style={style.title}>
          <Text style={style.titleText}>My Pubs</Text>
          <View style={style.row}>
            <AddPub onPress={addPress} />
          </View>
        </View>
        {loading && <Loader />}
        {pubList && (
          <FlatList
            data={pubList}
            refreshing={loading}
            style={style.flatList}
            contentContainerStyle={style.listContent}
            ListEmptyComponent={emptyList}
            onRefresh={() => {
              pubQuery();
            }}
            renderItem={({item: pub, index}) => (
              <PubCard
                key={index}
                navigation={navigation}
                index={index}
                pub={pub}
              />
            )}
          />
        )}
      </View>
    </View>
  );
};

const style = {
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  empty: {
    width: Dimensions.get('window').width - 40,
    alignSelf: 'center',
  },
  emptyWrapper: {alignItems: 'center'},
  emptyText: {fontSize: 20, fontWeight: 'bold', textAlign: 'center'},
  addButton: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    backgroundColor: theme.red,
    borderRadius: 12,
    marginTop: 20,
  },
  addButtonText: {fontSize: 12, fontWeight: 'bold', color: theme.white},
  content: {flex: 1, backgroundColor: theme.white},
  section: {
    flex: 1,
  },
  title: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    paddingTop: 20,
    alignItems: 'center',
    marginBottom: 20,
    justifyContent: 'space-between',
  },
  titleText: {fontSize: 34, fontWeight: 'bold'},
  flatList: {padding: 20},
  listContent: {paddingBottom: 20},
  row: {flexDirection: 'row'},
};
export default MyPubsScreen;
