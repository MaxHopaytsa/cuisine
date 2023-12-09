import React from 'react';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

import { type IconName } from '~/libs/enums/enums.js';
import { type ValueOf } from '~/libs/types/types.js';

type Properties = {
  name: ValueOf<typeof IconName>;
  size?: number;
  color?: string;
};

const Icon: React.FC<Properties> = ({ name, color, size }) => {

  return <FontAwesome6 color={color} name={name} size={size} />;
};

export { Icon };
