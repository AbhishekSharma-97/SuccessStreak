import React from 'react';
import Svg, {Path, G} from 'react-native-svg';
import {colors} from '../theme/theme';

interface TrophyIconProps {
  size?: number;
  color?: string;
  fill?: string;
}

const Running: React.FC<TrophyIconProps> = ({
  size = 200,
  color = colors.secondary,
  fill = colors.secondary,
}) => {
  return (
    <Svg
      height={size}
      width={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}>
      <G id="SVGRepo_bgCarrier" strokeWidth="0" />
      <G
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <G id="SVGRepo_iconCarrier">
        <Path 
          d="M15.6205 5.53997C15.6205 6.35551 14.9593 7.01665 14.1438 7.01665C13.3282 7.01665 12.6671 6.35551 12.6671 5.53997C12.6671 4.72442 13.3282 4.06328 14.1438 4.06328C14.9593 4.06328 15.6205 4.72442 15.6205 5.53997Z" 
          fill={fill} 
          stroke={fill} 
          strokeWidth="1.26573" 
        />
        <Path 
          d="M12.0933 9.23584C12.8705 9.23584 13.862 10.0475 13.862 10.0475C12.8953 12.1133 12.0933 12.8251 12.0933 14.4691H9.94097C11.6266 10.9973 11.1466 11.1017 12.0933 9.23584Z" 
          fill={fill} 
        />
        <Path 
          d="M9.94097 14.4691C8.64019 16.7679 5.86951 20.0585 5.86951 20.0585M9.94097 14.4691C10.6347 14.4691 11.3996 14.4691 12.0933 14.4691M9.94097 14.4691C11.6266 10.9973 11.1466 11.1017 12.0933 9.23584C12.8705 9.23584 13.862 10.0475 13.862 10.0475C12.8953 12.1133 12.0933 12.8251 12.0933 14.4691M12.0933 14.4691C13.4374 16.7679 11.4221 20.5695 11.4221 20.5695" 
          stroke={fill} 
          strokeWidth="2.21502" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
        />
        <Path 
          d="M14.0381 10.0635L14.9763 13.9662L18.1305 11.9881" 
          stroke={fill} 
          strokeWidth="1.91969" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
        />
        <Path 
          d="M12.0342 9.05542L9.18264 9.02772L7.54512 12.0129" 
          stroke={fill} 
          strokeWidth="1.91969" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
        />
      </G>
    </Svg>
  );
};

export default Running;
