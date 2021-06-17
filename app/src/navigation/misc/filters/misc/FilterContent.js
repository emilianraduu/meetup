import React, {useCallback, useState} from 'react';
import {
  Animated,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FilterTopBar from './FilterTopBar';
import Slider from 'rn-range-slider';
import Thumb from './Thumb';
import Rail from './Rail';
import RailSelected from './RailSelected';
import Label from './Label';
import {useFocusEffect} from '@react-navigation/native';
import {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import MultipleCheckbox from '../../MultipleCheckbox';
import MultipleRadio from '../../MultipleRadio';
import RatingPicker from '../../RatingPicker';
import {theme} from '../../../../helpers/constants';
import {useReactiveVar} from '@apollo/client';
import {selectedDistance} from '../../../../helpers/variables';

export const FILTER_DATA = {
  COLORS: [
    {name: 1, selected: false},
    {name: 2, selected: false},
    {name: 3, selected: false},
    {name: 4, selected: false},
  ],
  AVAILABILITY: [
    {name: 'cheap', selected: false},
    {name: 'medium', selected: false},
    {name: 'expensive', selected: false},
  ],
  MATERIALS: [
    {name: 'wood', selected: false},
    {name: 'plastic', selected: false},
  ],
  SLIDER: {
    LOW_VALUE: 20,
    HIGH_VALUE: 70,
    MIN_VALUE: 0,
    MAX_VALUE: 150,
    STEP: 1,
  },
};

const FilterContent = ({animation, onClose, index}) => {
  const [pristine, setPristine] = useState(true);
  const renderThumb = useCallback(() => <Thumb />, []);
  const renderRail = useCallback(() => <Rail />, []);
  const [materialOptions, setMaterialOptions] = useState(FILTER_DATA.MATERIALS);
  const [colorOptions, setColorOptions] = useState(FILTER_DATA.COLORS);
  const maxDistance = useReactiveVar(selectedDistance);
  const [low, setLow] = useState(maxDistance);
  const [availabilityOptions, setAvailabilityOptions] = useState(
    FILTER_DATA.AVAILABILITY,
  );
  const onValueChange = () => {
    if (pristine) {
      setPristine(false);
    }
  };
  const onPressColor = (option) => {
    onValueChange();
    setColorOptions(
      colorOptions.map((color) => ({
        ...color,
        selected: color.name === option.name,
      })),
    );
  };

  const onPressMaterial = (option) => {
    onValueChange();
    setMaterialOptions(
      materialOptions.map((material) => ({
        ...material,
        selected:
          material.name === option.name
            ? !material.selected
            : material.selected,
      })),
    );
  };
  const onPressAvailability = (option) => {
    onValueChange();
    setAvailabilityOptions(
      availabilityOptions.map((availability) => ({
        ...availability,
        selected: availability.name === option.name,
      })),
    );
  };

  const renderRailSelected = useCallback(() => <RailSelected />, []);
  const renderLabel = useCallback((value) => <Label text={`${value}m`} />, []);
  const renderNotch = useCallback(() => <View />, []);
  const handleValueChange = useCallback(
    (value) => {
      if (value !== low) {
        setLow(value);
      }
      onValueChange();
    },
    [low],
  );

  const {section, content, sectionTitle, valuesWrapper, sliderValues} = styles;
  const onPressReset = () => {
    setPristine(true);
    setAvailabilityOptions(FILTER_DATA.AVAILABILITY);
    setMaterialOptions(FILTER_DATA.MATERIALS);
    setLow(5000);
    setColorOptions(FILTER_DATA.COLORS);
  };
  const submit = () => {
    selectedDistance(low);
    onClose();
  };
  return (
    <Animated.View
      style={{
        ...content,
        transform: [{translateY: animation}],
      }}>
      <FilterTopBar
        index={index}
        onClose={onClose}
        onPress={onPressReset}
        pristine={pristine}
      />
      <BottomSheetScrollView
        focusHook={useFocusEffect}
        showsVerticalScrollIndicator={false}>
        <View style={section}>
          <Text style={sectionTitle}>Distance</Text>
          <Slider
            min={50}
            disableRange={true}
            max={10000}
            step={FILTER_DATA.SLIDER.STEP}
            low={low}
            floatingLabel
            renderThumb={renderThumb}
            renderRail={renderRail}
            renderRailSelected={renderRailSelected}
            renderLabel={renderLabel}
            renderNotch={renderNotch}
            onValueChanged={handleValueChange}
          />
          <View style={valuesWrapper}>
            <Text style={sliderValues}>50m</Text>
            <Text style={sliderValues}>10000m</Text>
          </View>
        </View>
        <View style={section}>
          <Text style={sectionTitle}>Reviews</Text>
          <RatingPicker colorOptions={colorOptions} onPress={onPressColor} />
        </View>
        <View style={section}>
          <Text style={sectionTitle}>Price</Text>
          <MultipleRadio
            options={availabilityOptions}
            onPress={onPressAvailability}
          />
        </View>
        <TouchableOpacity
          onPress={submit}
          style={{
            alignSelf: 'center',
            backgroundColor: theme.red,
            paddingVertical: 12,
            paddingHorizontal: 20,
            borderRadius: 8,
            marginBottom: 50,
          }}>
          <Text style={{color: theme.white}}>Show filtered pubs</Text>
        </TouchableOpacity>
      </BottomSheetScrollView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  sliderValues: {color: theme.dark},
  content: {
    paddingHorizontal: 16,
    paddingTop: 33,
    flex: 1,
  },
  valuesWrapper: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    color: theme.dark,
    fontWeight: '600',
    fontSize: 14,
    marginBottom: 20,
  },
});
export default FilterContent;
