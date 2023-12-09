import React from 'react';

import { AppColor } from '~/libs/enums/enums';

import { ActivityIndicator, View } from '../components';
import { styles } from './styles';

const Loader: React.FC = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={AppColor.BLUE_200} />
    </View>
  );
};

export { Loader };
