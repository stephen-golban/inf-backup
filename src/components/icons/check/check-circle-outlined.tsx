import React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

const CheckCircleOutlinedIcon: React.FC<SvgProps & { checkColor?: string }> = ({ color = '#3B444D', checkColor = 'white', ...props }) => {
  return (
    <Svg width="256.000000pt" height="256.000000pt" viewBox="0 0 256.000000 256.000000" {...props}>
      <Path
        fill={color}
        d="M1160 2340c-255-31-475-142-655-331-388-409-388-1048 0-1458 233-245 554-367 880-331 470 50 845 389 941 850 23 114 23 306 0 420-95 456-469 798-929 849-106 12-141 12-237 1zm380-248c135-44 238-109 341-211 102-102 166-205 211-341 31-91 32-101 32-260 1-161 0-167-32-260-51-147-103-231-212-340s-193-161-340-212c-92-32-99-33-260-33s-168 1-260 33c-147 51-231 103-340 212s-161 193-212 340c-32 92-33 99-33 260s1 168 33 260c50 144 104 231 207 335 97 99 184 157 300 201 121 45 178 54 330 50 124-3 151-7 235-34z"
        transform="matrix(.1 0 0 -.1 0 256)"
      />
      <Path
        fill={color}
        d="M1670 1669c-14-5-143-128-287-272l-263-261-113 112c-97 96-119 112-146 112-59 0-94-29-115-93-12-36 25-85 176-234 152-151 155-153 199-153h44l322 323c317 316 323 323 323 362 0 49-22 83-66 101-38 16-40 16-74 3z"
        transform="matrix(.1 0 0 -.1 0 256)"
      />
    </Svg>
  );
};

export { CheckCircleOutlinedIcon };
