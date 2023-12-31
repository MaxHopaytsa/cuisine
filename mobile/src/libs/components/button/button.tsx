import React from 'react';

import {
  Icon,
  Text,
  TouchableOpacity,
  View,
} from '~/libs/components/components';
import { AppColor } from '~/libs/enums/enums';
import { type IconName } from '~/libs/enums/enums.js';
import { type ValueOf } from '~/libs/types/types.js';

import { styles } from './styles';

type Properties = {
  label?: string;
  onPress: () => void;
  isDisabled?: boolean;
  type?: 'solid' | 'outlined' | 'transparent' | 'modal' | 'timer';
  isRounded?: boolean;
  iconName?: ValueOf<typeof IconName>;
  color?: string;
  isVisuallyCentered?: boolean;
};

const Button: React.FC<Properties> = ({
  label,
  onPress,
  isDisabled = false,
  type = 'solid',
  isRounded,
  iconName,
  color,
  isVisuallyCentered = false,
}) => {
  const renderIcon = (iconName: ValueOf<typeof IconName>): JSX.Element => {
    return (
      <View
        style={[
          isVisuallyCentered && styles.visuallyCenteredButton,
          isRounded && styles.buttonRounded,
        ]}
      >
        <Icon name={iconName} color={color ?? AppColor.GRAY_400} />
      </View>
    );
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        type === 'solid' && styles.buttonSolid,
        type === 'outlined' && styles.buttonOutlined,
        type === 'timer' && styles.buttonTimer,
        type === 'transparent' && styles.buttonTransparent,
        type === 'modal' && [styles.buttonModal, { backgroundColor: color }],
        isDisabled && styles.buttonDisabled,
      ]}
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.5}
    >
      {iconName && renderIcon(iconName)}
      <Text
        style={[
          { color: color },
          styles.label,
          type === 'solid' && styles.labelSolid,
          type === 'outlined' && styles.labelOutlined,
          type === 'modal' && styles.labelModal,
          type === 'timer' && styles.labelTimer,
          isDisabled && styles.labelDisabled,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export { Button };
