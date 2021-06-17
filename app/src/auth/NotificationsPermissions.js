import React, {useState} from 'react';
import {AsyncStorage, ScrollView, Text, View} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import {
  BIG_FONT_SIZE,
  DARK_COLOR,
  GREEN_COLOR,
  theme,
} from '../helpers/constants';
import {SafeAreaView} from 'react-native-safe-area-context';
import Ripple from 'react-native-material-ripple';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LottieView from 'lottie-react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import {lightVibration} from '../helpers/vibrations';
import OneSignal from 'react-native-onesignal';
import {useReactiveVar} from '@apollo/client';
import {user} from '../helpers/variables';

export const NotificationsPermissions = ({navigation, setCheckPerm}) => {
  const [showModal, setShowModal] = useState(false);
  const usr = useReactiveVar(user);
  const onPress = () => {
    OneSignal.promptForPushNotificationsWithUserResponse((response) => {
      if (response && usr?.email) {
        AsyncStorage.setItem('notificationPerm', 'true');
      }
    });
  };
  return (
    <View style={{backgroundColor: theme.white, flex: 1}}>
      <SafeAreaView
        style={{padding: 20, paddingBottom: 0, flexDirection: 'row'}}>
        <Ripple
          style={{alignSelf: 'center', marginRight: 10}}
          onPress={() => {
            lightVibration();
            navigation.goBack();
          }}>
          <Icon name={'arrow-back'} color={theme.dark} size={30} />
        </Ripple>
        <Text
          style={{
            fontSize: BIG_FONT_SIZE,
            color: theme.dark,
            fontWeight: 'bold',
          }}>
          Notification
        </Text>
      </SafeAreaView>
      <View
        style={{
          backgroundColor: theme.dark,
          borderTopLeftRadius: 60,
          borderRadius: 60,
          flex: 1,
          padding: 20,
          marginLeft: 20,
          marginRight: 20,
          paddingTop: 0,
          paddingBottom: 0,
        }}>
        <LottieView
          source={require('../assets/animations/notifications.json')}
          autoPlay
          loop
          style={{height: '100%', width: '100%', alignSelf: 'center'}}
        />
      </View>
      <SafeAreaView style={{alignSelf: 'flex-start', width: '100%'}}>
        <Text
          style={{
            color: theme.dark,
            textAlign: 'center',
            padding: 10,
            fontSize: 16,
          }}>
          In order to keep you updated we need notifications permissions
        </Text>
        <Ripple
          rippleColor={'#fff'}
          onPress={onPress}
          style={{
            backgroundColor: theme.dark,
            borderRadius: 5,
            width: 250,
            height: 50,
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'center',
            overflow: 'hidden',
            alignSelf: 'center',
          }}>
          <Ionicons name={'location'} color={theme.white} size={20} />
          <Text style={{color: theme.white, marginLeft: 10}}>
            Allow notifications permissions
          </Text>
        </Ripple>
        <Ripple
          onPress={() => {
            setShowModal(true);
          }}>
          <Text
            style={{
              color: theme.dark,
              textAlign: 'center',
              padding: 10,
              marginTop: 20,
              fontSize: 12,
            }}>
            How is my permission used?
          </Text>
        </Ripple>
      </SafeAreaView>
      <Modal
        isVisible={showModal}
        swipeDirection={'down'}
        propagateSwipe={true}
        onSwipeComplete={() => {
          setShowModal(false);
        }}
        style={{flex: 1, margin: 0}}
        onBackdropPress={() => {
          setShowModal(false);
        }}>
        <View
          contentContainerStyle={{alignItems: 'center'}}
          style={{
            backgroundColor: '#fff',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            marginTop: '20%',
            overflow: 'hidden',
          }}>
          <View style={{backgroundColor: GREEN_COLOR}}>
            <Ripple
              rippleColor={DARK_COLOR}
              onPress={() => setShowModal(false)}
              style={{
                alignItems: 'center',
                padding: 15,
                flexDirection: 'row',
                alignSelf: 'flex-start',
              }}>
              <Icon name={'arrow-back'} color={DARK_COLOR} size={15} />
              <Text
                style={{fontWeight: '700', color: DARK_COLOR, marginLeft: 5}}>
                Go back
              </Text>
            </Ripple>
          </View>
          <ScrollView
            style={{
              padding: 20,
            }}
            contentContainerStyle={{alignItems: 'center'}}>
            <SafeAreaView
              style={{paddingBottom: 50}}
              onStartShouldSetResponder={() => true}>
              <Text>
                The standard Lorem Ipsum passage, used since the 1500s "Lorem
                ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum."
                Section 1.10.32 of "de Finibus Bonorum et Malorum", written by
                Cicero in 45 BC "Sed ut perspiciatis unde omnis iste natus error
                sit voluptatem accusantium doloremque laudantium, totam rem
                aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
                architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam
                voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed
                quia consequuntur magni dolores eos qui ratione voluptatem sequi
                nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor
                sit amet, consectetur, adipisci velit, sed quia non numquam eius
                modi tempora incidunt ut labore et dolore magnam aliquam quaerat
                voluptatem. Ut enim ad minima veniam, quis nostrum
                exercitationem ullam corporis suscipit laboriosam, nisi ut
                aliquid ex ea commodi consequatur? Quis autem vel eum iure
                reprehenderit qui in ea voluptate velit esse quam nihil
                molestiae consequatur, vel illum qui dolorem eum fugiat quo
                voluptas nulla pariatur?" 1914 translation by H. Rackham "But I
                must explain to you how all this mistaken idea of denouncing
                pleasure and praising pain was born and I will give you a
                complete account of the system, and expound the actual teachings
                of the great explorer of the truth, the master-builder of human
                happiness. No one rejects, dislikes, or avoids pleasure itself,
                because it is pleasure, but because those who do not know how to
                pursue pleasure rationally encounter consequences that are
                extremely painful. Nor again is there anyone who loves or
                pursues or desires to obtain pain of itself, because it is pain,
                but because occasionally circumstances occur in which toil and
                pain can procure him some great pleasure. To take a trivial
                example, which of us ever undertakes laborious physical
                exercise, except to obtain some advantage from it? But who has
                any right to find fault with a man who chooses to enjoy a
                pleasure that has no annoying consequences, or one who avoids a
                pain that produces no resultant pleasure?" Section 1.10.33 of
                "de Finibus Bonorum et Malorum", written by Cicero in 45 BC "At
                vero eos et accusamus et iusto odio dignissimos ducimus qui
                blanditiis praesentium voluptatum deleniti atque corrupti quos
                dolores et quas molestias excepturi sint occaecati cupiditate
                non provident, similique sunt in culpa qui officia deserunt
                mollitia animi, id est laborum et dolorum fuga. Et harum quidem
                rerum facilis est et expedita distinctio. Nam libero tempore,
                cum soluta nobis est eligendi optio cumque nihil impedit quo
                minus id quod maxime placeat facere possimus, omnis voluptas
                assumenda est, omnis dolor repellendus. Temporibus autem
                quibusdam et aut officiis debitis aut rerum necessitatibus saepe
                eveniet ut et voluptates repudiandae sint et molestiae non
                recusandae. Itaque earum rerum hic tenetur a sapiente delectus,
                ut aut reiciendis voluptatibus maiores alias consequatur aut
                perferendis doloribus asperiores repellat." 1914 translation by
                H. Rackham "On the other hand, we denounce with righteous
                indignation and dislike men who are so beguiled and demoralized
                by the charms of pleasure of the moment, so blinded by desire,
                that they cannot foresee the pain and trouble that are bound to
                ensue; and equal blame belongs to those who fail in their duty
                through weakness of will, which is the same as saying through
                shrinking from toil and pain. These cases are perfectly simple
                and easy to distinguish. In a free hour, when our power of
                choice is untrammelled and when nothing prevents our being able
                to do what we like best, every pleasure is to be welcomed and
                every pain avoided. But in certain circumstances and owing to
                the claims of duty or the obligations of business it will
                frequently occur that pleasures have to be repudiated and
                annoyances accepted. The wise man therefore always holds in
                these matters to this principle of selection: he rejects
                pleasures to secure other greater pleasures, or else he endures
                pains to avoid worse pains."
              </Text>
            </SafeAreaView>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};
