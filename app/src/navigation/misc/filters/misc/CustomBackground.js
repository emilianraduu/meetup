import React, {useMemo} from 'react';
import Animated, {interpolateColors} from 'react-native-reanimated';
import {theme} from '../../../../helpers/constants';

const CustomBackground = ({animatedIndex, style, index, border}) => {
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
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 5.0,
        elevation: 1,
      },
      {
        backgroundColor: animatedBackground,
        borderTopLeftRadius: border ? 14 : 0,
        borderTopRightRadius: border ? 14 : 0,
      },
    ],
    [style, animatedBackground],
  );

  return <Animated.View style={containerStyle} />;
};

export default CustomBackground;
