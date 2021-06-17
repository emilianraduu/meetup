import React from 'react';
import {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {theme} from '../../helpers/constants';
import {Dimensions} from 'react-native';
import {BarChart, LineChart} from 'react-native-chart-kit';

const chartConfig = {
  backgroundColor: theme.white,
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: theme.white,
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
};
const PubAnalytics = () => {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
      },
    ],
  };
  return (
    <BottomSheetScrollView
      contentContainerStyle={{
        flex: 1,
        backgroundColor: theme.white,
        alignItems: 'center',
        paddingTop: 20,
      }}>
      <LineChart
        data={data}
        width={Dimensions.get('window').width}
        height={256}
        verticalLabelRotation={30}
        chartConfig={chartConfig}
        bezier
      />
    </BottomSheetScrollView>
  );
};

export default PubAnalytics;
