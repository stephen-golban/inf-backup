import * as React from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'

const BackSpaceIcon: React.FC<SvgProps> = (props) => {
  const { color = '#00f', ...rest } = props

  return (
    <Svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke={color} {...rest}>
      <Path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 9.75L14.25 12m0 0l2.25 2.25M14.25 12l2.25-2.25M14.25 12L12 14.25m-2.58 4.92l-6.374-6.375a1.125 1.125 0 010-1.59L9.42 4.83c.21-.211.497-.33.795-.33H19.5a2.25 2.25 0 012.25 2.25v10.5a2.25 2.25 0 01-2.25 2.25h-9.284c-.298 0-.585-.119-.795-.33z"
      />
    </Svg>
  )
}

export { BackSpaceIcon }
