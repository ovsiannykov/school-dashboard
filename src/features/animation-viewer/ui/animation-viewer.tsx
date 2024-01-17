import { Player } from '@lottiefiles/react-lottie-player'

import ErrorAnimation from '../assets/404.json'

interface IProps {
  animation?: string | object
  width?: string | number
  height?: string | number
  loop?: boolean | number
  autoplay?: boolean
}

export function AnimationViewer({
  animation = ErrorAnimation,
  height = 480,
  width = 480,
  loop = true,
  autoplay = true,
}: IProps) {
  return (
    <Player
      style={{ width, height }}
      src={animation}
      autoplay={autoplay}
      loop={loop}
    />
  )
}
