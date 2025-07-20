import React from 'react';
import Svg, { Path, G } from 'react-native-svg';
import { colors } from '../theme/theme';

interface TrophyIconProps {
  size?: number;
  color?: string;
  fill?: string;
}

const NoPhone: React.FC<TrophyIconProps> = ({
  size = 200,
  color = colors.secondary,
  fill = colors.secondary,
}) => {
  return (
    <Svg
      height={size}
      width={size}
      viewBox="0 0 381.092 381.092"
      fill={fill}
      stroke={color}
    >
      <G id="SVGRepo_bgCarrier" strokeWidth="0" />
      <G
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <G id="SVGRepo_iconCarrier">
        <G>
          <G>
            <G>
              <Path d="M272.546,311.188H114.443l-38.897,35.739v16.688c0,9.65,7.825,17.477,17.477,17.477H288.07 c9.65,0,17.477-7.824,17.477-17.477V135.593l-33,30.322L272.546,311.188L272.546,311.188z M190.546,363.213 c-9.94,0-18-8.059-18-18c0-9.94,8.06-18,18-18c9.939,0,18,8.06,18,18C208.546,355.154,200.485,363.213,190.546,363.213z" />
              <Path d="M365.249,12.022c-7.473-8.134-20.125-8.669-28.259-1.195l-31.444,28.892V17.477C305.546,7.825,297.722,0,288.069,0 H93.023c-9.651,0-17.477,7.824-17.477,17.477v233.576l-58.507,53.76c-8.134,7.475-8.669,20.125-1.195,28.26 c3.944,4.292,9.329,6.468,14.732,6.468c4.835,0,9.685-1.743,13.526-5.273L364.054,40.282 C372.187,32.807,372.722,20.155,365.249,12.022z M108.546,33h164v37.041l-164,150.689V33L108.546,33z" />
            </G>
          </G>
        </G>
      </G>
    </Svg>
  );
};

export default NoPhone;

