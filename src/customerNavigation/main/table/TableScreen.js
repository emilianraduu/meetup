import React, {useContext, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {theme} from '../../helpers/constants';
import {PubsContext} from '../../contexts/pubContext';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import TableTab from './TableTab';

export const TableScreen = () => {
  const {selectedPub: pub, onSelectLocation, selectedLocation} = useContext(
    PubsContext,
  );
  const [selected, setSelected] = useState(undefined);
  const [showReservationModal, setShowReservationModal] = useState(false);
  const [customModal, showCustomModal] = useState(false);

  const {bottom} = useSafeAreaInsets();
  const {
    container,
    spaceText,
    section,
    button,
    text,
    cta,
    smallText,
    customBtn,
  } = styles({
    bottom,
    selected,
  });
  return (
    <View style={{flex: 1, backgroundColor: theme.white}}>
      <BottomSheetScrollView contentContainerStyle={container}>
        {pub.locations?.length > 1 && (
          <>
            <Text style={spaceText}>Pick a space</Text>
            <View style={section}>
              {pub.locations.map((loc, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => onSelectLocation(loc.id)}
                  style={[
                    button,
                    {
                      backgroundColor:
                        loc.id === selectedLocation.id ? theme.red : theme.grey,
                    },
                  ]}>
                  <Text style={text}>{loc.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </>
        )}

        {pub.locations.map((loc) => (
          <TableTab
            key={loc.id}
            location={loc}
            selected={selected}
            setSelected={setSelected}
          />
        ))}

        <TouchableOpacity
          disabled={!selected}
          style={cta}
          onPress={() => {
            setShowReservationModal(true);
          }}>
          <Text style={text}>Reserve table</Text>
        </TouchableOpacity>
        <Text style={smallText}>or</Text>
        <TouchableOpacity
          onPress={() => {
            showCustomModal(true);
          }}>
          <Text style={customBtn}>Request custom table</Text>
        </TouchableOpacity>
      </BottomSheetScrollView>
    </View>
  );
};
const styles = ({bottom, selected}) =>
  StyleSheet.create({
    container: {
      padding: 20,
      flexGrow: 1,
      paddingBottom: bottom + 30,
    },
    spaceText: {
      fontSize: 12,
      fontWeight: 'bold',
      color: theme.black,
      marginBottom: 5,
    },
    section: {
      flexDirection: 'row',
      backgroundColor: theme.white,
    },
    button: {
      padding: 5,

      borderRadius: 20,
      paddingHorizontal: 20,
      marginRight: 10,
    },
    text: {color: theme.white},
    cta: {
      backgroundColor: selected ? theme.red : theme.black,
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 8,
      alignSelf: 'center',
    },
    smallText: {
      alignSelf: 'center',
      fontSize: 12,
      margin: 12,
      fontWeight: '300',
      color: theme.grey,
    },
    customBtn: {
      color: theme.red,
      fontSize: 14,
      zIndex: 200,
      alignSelf: 'center',

      fontWeight: 'bold',
    },
  });
