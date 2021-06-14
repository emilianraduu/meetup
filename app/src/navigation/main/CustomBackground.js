import React, {useMemo} from 'react';
import Animated, {interpolateColors} from 'react-native-reanimated';
import {theme} from '../../helpers/constants';

const CustomBackground = ({animatedIndex, style}) => {
  const animatedBackground = useMemo(
    () =>
      interpolateColors(animatedIndex, {
        inputRange: [0, 1],
        outputColorRange: [theme.white, theme.white],
      }),
    [animatedIndex],
  );

  const containerStyle = useMemo(
    () => [
      style,
      {
        backgroundColor: animatedBackground,
        borderTopLeftRadius: 14,
        borderTopRightRadius: 14,
        overflow: 'hidden',
      },
    ],
    [style, animatedBackground],
  );

  return <Animated.View style={containerStyle} />;
};

export default CustomBackground;
