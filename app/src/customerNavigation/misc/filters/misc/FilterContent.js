import React, {useCallback, useMemo, useState} from 'react';
import {Animated, StyleSheet, Text, View} from 'react-native';
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
import ColorPicker from '../../ColorPicker';
import {theme} from '../../../../helpers/constants';

export const FILTER_DATA = {
  COLORS: [
    {name: '#D1CA13', selected: true},
    {name: '#0C187E', selected: false},
    {name: '#0C6875', selected: false},
  ],
  AVAILABILITY: [
    {name: 'in stock', selected: false},
    {name: 'supplier stock', selected: false},
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
  const [low, setLow] = useState(FILTER_DATA.SLIDER.LOW_VALUE);
  const [high, setHigh] = useState(FILTER_DATA.SLIDER.HIGH_VALUE);
  const [pristine, setPristine] = useState(true);
  const renderThumb = useCallback(() => <Thumb />, []);
  const renderRail = useCallback(() => <Rail />, []);
  const [materialOptions, setMaterialOptions] = useState(FILTER_DATA.MATERIALS);
  const [colorOptions, setColorOptions] = useState(FILTER_DATA.COLORS);
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
  const renderLabel = useCallback((value) => <Label text={`$${value}`} />, []);
  const renderNotch = useCallback(() => <View />, []);
  const handleValueChange = useCallback((low, high) => {
    setLow(low);
    setHigh(high);
    onValueChange();
  }, []);

  const {section, content, sectionTitle, valuesWrapper, sliderValues} = styles;
  const onPressReset = () => {
    setPristine(true);
    setAvailabilityOptions(FILTER_DATA.AVAILABILITY);
    setMaterialOptions(FILTER_DATA.MATERIALS);
    setLow(FILTER_DATA.SLIDER.LOW_VALUE);
    setHigh(FILTER_DATA.SLIDER.HIGH_VALUE);
    setColorOptions(FILTER_DATA.COLORS);
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
          <Text style={sectionTitle}>Price</Text>
          <Slider
            min={FILTER_DATA.SLIDER.MIN_VALUE}
            max={FILTER_DATA.SLIDER.MAX_VALUE}
            step={FILTER_DATA.SLIDER.STEP}
            low={low}
            high={high}
            floatingLabel
            renderThumb={renderThumb}
            renderRail={renderRail}
            renderRailSelected={renderRailSelected}
            renderLabel={renderLabel}
            renderNotch={renderNotch}
            onValueChanged={handleValueChange}
          />
          <View style={valuesWrapper}>
            <Text style={sliderValues}>{FILTER_DATA.SLIDER.MIN_VALUE}</Text>
            <Text style={sliderValues}>{FILTER_DATA.SLIDER.MAX_VALUE}</Text>
          </View>
        </View>
        <View style={section}>
          <Text style={sectionTitle}>Colour</Text>
          <ColorPicker colorOptions={colorOptions} onPress={onPressColor} />
        </View>
        <View style={section}>
          <Text style={sectionTitle}>Material</Text>
          <MultipleCheckbox
            options={materialOptions}
            onPress={onPressMaterial}
          />
        </View>
        <View style={section}>
          <Text style={sectionTitle}>Availability</Text>
          <MultipleRadio
            options={availabilityOptions}
            onPress={onPressAvailability}
          />
        </View>
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
