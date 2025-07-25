import React from 'react';
import Svg, {Path, G} from 'react-native-svg';
import {colors} from '../theme/theme';

interface TrophyIconProps {
  size?: number;
  color?: string;
  fill?: string;
}

const WeightLift: React.FC<TrophyIconProps> = ({
  size = 200,
  color = colors.secondary,
  fill = colors.secondary,
}) => {
  return (
    <Svg
      height={size}
      width={size}
      viewBox="0 0 419.263 419.263"
      fill={fill}
      stroke={color}>
      <G id="SVGRepo_bgCarrier" strokeWidth="0" />
      <G
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <G id="SVGRepo_iconCarrier">
        <G>
          <G id="Layer_1_18_">
            <G>
              <Path d="M196.4,157.704c21.855,7.307,45.489-4.482,52.794-26.334c7.306-21.854-4.485-45.486-26.336-52.793 c-21.854-7.309-45.491,4.488-52.794,26.334C162.758,126.764,174.547,150.399,196.4,157.704z" />
              <Path d="M393.026,0.001h-29.528c-3.647,0-6.602,2.953-6.602,6.602v32.672h-45.4c-1.531-1.054-3.286-1.831-5.224-2.221 c-3.915-0.789-7.771,0.125-10.82,2.221H123.795c-2.592-1.781-5.781-2.728-9.16-2.453c-2.561,0.208-4.899,1.094-6.873,2.453h-45.4 V6.602C62.362,2.954,59.408,0,55.759,0H26.232c-3.649,0-6.603,2.953-6.603,6.602v83.643c0,3.646,2.953,6.602,6.603,6.602h29.527 c3.648,0,6.603-2.955,6.603-6.602v-32.67h39.742l5.771,71.127c0.234,2.928,1.317,5.813,3.303,8.273l1.228,1.523l47.175,58.508 c0.331,0.406,0.691,0.814,1.062,1.213v89.674L124.33,396.866c-2.661,7.953,0.898,16.848,8.635,20.648 c8.435,4.145,18.63,0.67,22.774-7.764l57.754-117.49h5.052l36.702,42.313l-12.108,63.328 c-1.575,8.193,3.079,16.514,11.202,19.295c8.895,3.045,18.57-1.697,21.615-10.588l24.918-72.773 c1.882-5.605,1.204-12.102-2.448-17.316l-1.54-2.205l-38.266-54.66v-61.432c0.363-0.391,0.721-0.791,1.062-1.215l47.175-58.508 l1.225-1.518c1.847-2.285,3.05-5.131,3.306-8.279l5.771-71.127h39.742v32.67c0,3.646,2.954,6.602,6.602,6.602h29.528 c3.648,0,6.603-2.955,6.603-6.602V6.602C399.629,2.954,396.675,0.001,393.026,0.001z M275.733,116.995l-18.823,19.238 c-7.473,19.555-26.199,32.543-47.27,32.543h-0.002c-5.449,0-10.854-0.881-16.06-2.621c-12.827-4.291-23.214-13.318-29.249-25.416 c-0.739-1.482-1.401-2.988-1.989-4.514l-18.814-19.23l-11.953-59.42h156.113L275.733,116.995z" />
            </G>
          </G>
        </G>
      </G>
    </Svg>
  );
};

export default WeightLift;