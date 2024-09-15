import * as React from 'react';
import Svg, { ClipPath, Defs, G, Path, type SvgProps } from 'react-native-svg';

const EyeBlueIcon: React.FC<SvgProps> = ({ color = '#065fe0', strokeWidth = 2, ...props }) => {
  return (
    <Svg width={300} viewBox="0 0 224.87999 225" height={300} {...props}>
      <Defs>
        <ClipPath id="a">
          <Path d="M20.613 20.676h183.653v183.648H20.613zm0 0" />
        </ClipPath>
        <ClipPath id="b">
          <Path d="M112.441 20.676c-50.714 0-91.828 41.11-91.828 91.824 0 50.715 41.114 91.824 91.828 91.824 50.711 0 91.825-41.11 91.825-91.824 0-50.715-41.114-91.824-91.825-91.824zm0 0" />
        </ClipPath>
        <ClipPath id="c">
          <Path d="M65.168 83.84h94.441v57.715H65.168zm0 0" />
        </ClipPath>
      </Defs>
      <G clipPath="url(#a)">
        <G clipPath="url(#b)">
          <Path fill="#065fe0" d="M20.613 20.676h183.653v183.648H20.613zm0 0" />
        </G>
      </G>
      <G clipPath="url(#c)">
        <Path
          fill="#fff"
          d="M126.293 123.574c-5.36 6.938-14.793 8.906-22.43 4.61-7.672-4.317-10.246-13.11-8.175-19.793 4.039 1.71 7.703 1.273 10.687-1.98 2.695-2.938 2.957-6.36 1.371-9.954 3.84-1.82 11.942-1.144 17.266 4.453 5.93 6.235 6.492 15.914 1.281 22.664zm33.266-12.023a6.054 6.054 0 00-.727-1.809c-2.89-4.847-6.422-9.25-10.902-12.96a62.212 62.212 0 00-4.043-3.067l-.242-.176c-.34-.234-.684-.465-1.028-.691a55.94 55.94 0 00-1.687-1.082c-.137-.082-.27-.168-.403-.25a50.739 50.739 0 00-2.148-1.227c-7.918-4.297-16.57-6.457-25.95-6.36-9.378-.097-18.03 2.063-25.952 6.36-.727.39-1.442.8-2.149 1.227-.133.082-.266.168-.398.25-.57.347-1.133.71-1.688 1.082-.347.226-.687.457-1.027.691-.082.059-.164.117-.242.176a60.157 60.157 0 00-4.043 3.066c-4.485 3.711-8.016 8.114-10.903 12.961a5.967 5.967 0 00-.73 1.809c-.035.078-.074.152-.113.23v1.438c.046.086.086.176.125.261.129.586.363 1.176.726 1.774 3.594 5.941 7.996 10.937 13.25 14.926l.14-.075a53.358 53.358 0 009.403 5.73l-.055.04a57.986 57.986 0 004.004 1.64c.528.196 1.051.391 1.582.57a55.073 55.073 0 002.984.922c.247.071.485.141.731.208.235.062.469.113.7.172.773.199 1.546.402 2.343.574 3.73.812 7.508 1.176 11.313 1.152 3.8.024 7.582-.34 11.312-1.152.793-.172 1.567-.375 2.34-.574.234-.059.469-.11.7-.172.245-.067.488-.137.73-.207a57.286 57.286 0 002.984-.922c.531-.18 1.059-.375 1.582-.57a57.987 57.987 0 004.004-1.641l-.05-.04a53.468 53.468 0 009.398-5.73l.14.075c5.254-3.989 9.657-8.985 13.254-14.926a5.685 5.685 0 00.723-1.774c.043-.085.082-.175.125-.261v-1.438c-.035-.078-.078-.152-.113-.23"
        />
      </G>
    </Svg>
  );
};

export { EyeBlueIcon };
