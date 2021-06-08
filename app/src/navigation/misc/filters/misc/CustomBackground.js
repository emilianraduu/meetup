import React, {useMemo} from 'react';
import Animated, {interpolateColors} from 'react-native-reanimated';
import {theme} from '../../../../helpers/constants';

const CustomBackground = ({animatedIndex, style, index}) => {
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
        borderTopLeftRadius: index === 1 || index === 0 ? 14 : 0,
        borderTopRightRadius: index === 1 || index === 0 ? 14 : 0,
      },
    ],
    [style, animatedBackground],
  );

  return <Animated.View style={containerStyle} />;
};

export default CustomBackground;
