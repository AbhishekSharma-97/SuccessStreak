import React from 'react';
import Svg, { Path, G } from 'react-native-svg';
import { colors } from '../theme/theme';

interface TrophyIconProps {
  size?: number;
  color?: string;
  fill?: string;
}

const WaterDrinking: React.FC<TrophyIconProps> = ({
  size = 200,
  color = colors.secondary,
  fill = colors.secondary,
}) => {
  return (
    <Svg
      height={size}
      width={size}
      viewBox="0 0 896.6 896.6"
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
            <Path d="M23.764,10.9c-6.2,6.9-9.1,16.2-8,25.4l84.7,712.601c1.9,16.4,15.8,28.699,32.3,28.699h325.4 c-1.7-4.699-3.2-9.5-4.6-14.299c-4.7-16.102-7.9-33-9.601-50.701c-1-10.1-1.5-20.5-1.5-31.1c0-93.4,56.801-178.6,107.4-253 c3.8-5.699,7.7-11.199,11.5-16.6l45.7-375.4c1.1-9.2-1.8-18.5-7.9-25.5c-6.2-7-15-11-24.3-11h-526.8 C38.764,0,29.864,4,23.764,10.9z M537.964,65l-26.8,219.7c-7.2,2.9-14.8,5.1-23.2,7.1c-45.199,10.4-92.199,2.5-136.6-8.3 c-61.8-14.9-124.4-36-188.8-29.3l45.4,382.201c1.3,11-6.5,20.9-17.5,22.199l-14.9,1.801c-11,1.299-20.9-6.5-22.2-17.5 l-44.7-376.101c-0.1,0-0.1,0-0.2,0.1l-24-201.8h453.5V65z" />
            <Path d="M553.164,477.9c-50.2,79.4-98.7,179.299-71.1,276.299c25,87.801,104.5,142.4,194.6,142.4 c112.9,0,204.4-78.199,204.4-215.199s-204.3-369.5-204.3-369.5S610.265,387.5,553.164,477.9z" />
          </G>
        </G>
      </G>
    </Svg>
  );
};

export default WaterDrinking;
