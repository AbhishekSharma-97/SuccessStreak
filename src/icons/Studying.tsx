import React from 'react';
import Svg, { Path, G, Polygon } from 'react-native-svg';
import { colors } from '../theme/theme';

interface TrophyIconProps {
  size?: number;
  color?: string;
  fill?: string;
}

const Studying: React.FC<TrophyIconProps> = ({
  size = 200,
  color = colors.secondary,
  fill = colors.secondary,
}) => {
  return (
    <Svg
      height={size}
      width={size}
      viewBox="0 0 512 512"
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
            <Path d="M391.828,403.736v-98.662H272.696v-33.391h94.997l19.101-247.847H125.206l19.101,247.848h94.997v33.391H120.172v98.661 h119.132V429.8c-24.062,5.328-44.446,21.995-54.286,45.441l30.789,12.924c4.557-10.858,13.103-19.131,23.497-23.452v23.204h33.391 v-23.204c10.396,4.322,18.941,12.594,23.497,23.452l30.789-12.924c-9.842-23.446-30.226-40.113-54.286-45.441v-26.064H391.828z" />
          </G>
        </G>
        <G>
          <G>
            <Polygon points="410.394,152.169 401.183,271.682 478.609,271.682 478.609,486.831 512,486.831 512,152.169 " />
          </G>
        </G>
        <G>
          <G>
            <Polygon points="101.606,152.169 0,152.169 0,486.831 33.391,486.831 33.391,271.682 110.817,271.682 " />
          </G>
        </G>
      </G>
    </Svg>
  );
};

export default Studying;
