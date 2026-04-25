import { cn } from '@/utils/cn'

import { type CharacterEyeStatus, useCharacterEye } from './useCharacterEye'

type CharacterEyeProps = {
  status?: CharacterEyeStatus
  className?: string
  direction?: 'left' | 'right'
}

// 첨부 레퍼런스처럼 흰 원과 검은 동공만 남겨 눈 형태를 단순하고 캐릭터스럽게 유지합니다.
const eyeBaseClassName =
  'relative flex size-5.5 origin-center items-center justify-center rounded-full bg-white shadow-[0_1px_2px_rgba(0,0,0,0.18)] transition-all duration-100 ease-out'

// direction="left"는 왼쪽 시야, direction="right"는 오른쪽 시야를 그대로 의미하도록 좌표를 분리합니다.
const pupilPositionByDirection: Record<
  NonNullable<CharacterEyeProps['direction']>,
  Record<
    CharacterEyeStatus,
    {
      x: number
      y: number
    }
  >
> = {
  left: {
    idle: { x: -4, y: -1 },
    email: { x: -2, y: 2 },
    password: { x: -3, y: 1 },
    error: { x: -4, y: -1 },
    'email-error': { x: -2, y: 2 },
    'password-error': { x: -2, y: 3 },
    entrance: { x: 0, y: 0 },
    'look-away': { x: -1, y: -3 },
    'password-visible': { x: -6, y: -1 },
  },
  right: {
    idle: { x: 4, y: -1 },
    email: { x: 2, y: 2 },
    password: { x: 3, y: 1 },
    error: { x: 3, y: -2 },
    'email-error': { x: 2, y: 2 },
    'password-error': { x: 2, y: 3 },
    entrance: { x: 0, y: 0 },
    'look-away': { x: 1, y: -3 },
    'password-visible': { x: 6, y: -1 },
  },
}

type VisibleEyeStatus = CharacterEyeStatus

// 에러 상태에서는 눈을 덮지 않도록 눈썹을 위로 띄워 찌푸린 표정만 더합니다.
const eyebrowClassName: Record<VisibleEyeStatus, string> = {
  idle: 'opacity-0',
  email: 'opacity-0',
  password: 'opacity-0',
  error: 'opacity-100',
  'email-error': 'opacity-100',
  'password-error': 'opacity-100',
  entrance: 'opacity-0',
  'look-away': 'opacity-0',
  'password-visible': 'opacity-0',
}

type EntranceEyeMarkProps = {
  side: 'left' | 'right'
}

function EntranceEyeMark({ side }: EntranceEyeMarkProps) {
  const isLeft = side === 'left'

  // 등장 표정은 한쪽 눈을 꺾인 두 선으로만 구성해 > < 형태를 유지합니다.
  return (
    <span className="relative  flex size-5.5 items-center justify-center">
      <span
        className={cn(
          'absolute top-[18%] h-0.75 w-[58%] rounded-full bg-black',
          isLeft
            ? 'left-[42%] origin-left rotate-35'
            : 'right-[42%] origin-right -rotate-35'
        )}
      />
      <span
        className={cn(
          'absolute bottom-[18%] h-0.75 w-[58%] rounded-full bg-black',
          isLeft
            ? 'left-[42%] origin-left -rotate-35'
            : 'right-[42%] origin-right rotate-35'
        )}
      />
    </span>
  )
}

export function CharacterEye({
  status = 'idle',
  className,
  direction = 'left',
}: CharacterEyeProps) {
  const { idleGaze, isBlinking, state } = useCharacterEye(status)

  if (state === 'entrance') {
    return (
      <div
        className={cn(
          'relative flex aspect-58/24 w-14.5 items-center justify-between',
          className
        )}
      >
        <EntranceEyeMark side="left" />
        <EntranceEyeMark side="right" />
      </div>
    )
  }

  // idle 상태에서는 정면 응시와 캐릭터끼리 서로 보는 시선을 번갈아 사용합니다.
  const position =
    state === 'idle' && idleGaze === 'front'
      ? { x: 0, y: -1 }
      : pupilPositionByDirection[direction][state]
  const isErrorState = state.includes('error')
  // 비밀번호 입력 중 회피 시선은 동공만 위로 올리고 눈 크기는 과하지 않게 유지합니다.
  const isLookAwayState = state === 'look-away'

  return (
    <div
      className={cn(
        'relative flex aspect-58/24 w-14.5 items-center justify-between transition-transform duration-300 ease-out overflow-visible',
        isErrorState && 'rotate-3',
        className
      )}
    >
      <span
        className={cn(
          'absolute left-[7%] h-[10%] w-[34%] rounded-full bg-black transition-all duration-200',
          isErrorState ? '-top-[46%] -rotate-12' : '-top-[28%] -rotate-6',
          eyebrowClassName[state]
        )}
      />
      <span
        className={cn(
          'absolute right-[7%] h-[10%] w-[34%] rounded-full bg-black transition-all duration-200',
          isErrorState ? '-top-[46%] rotate-12' : '-top-[28%] rotate-6',
          eyebrowClassName[state]
        )}
      />
      {Array.from({ length: 2 }).map((_, index) => {
        const baseX = position.x

        const motionScale = state === 'idle' ? 0.45 : 0.7
        const softenedX = baseX * motionScale
        const softenedY = position.y * (isErrorState ? 0.9 : 0.7)

        // 각 눈동자가 살짝 안쪽으로 모이게 해서 캐릭터스럽고 덜 멍한 표정을 만듭니다.
        const eyeOffset = index === 0 ? -1 : 1

        // direction 값에 따라 왼쪽 캐릭터는 오른쪽, 오른쪽 캐릭터는 왼쪽 시야를 보게 반전합니다.
        const directionMultiplier = direction === 'left' ? -1 : 1

        const offsetX = eyeOffset * directionMultiplier
        return (
          <span
            key={index}
            className={cn(
              eyeBaseClassName,
              // 깜빡임은 닫힌 선을 그리지 않고 눈 전체가 짧게 사라졌다 돌아오는 방식으로 처리합니다.
              isBlinking && 'scale-y-0 opacity-0 shadow-none',
              isLookAwayState && 'scale-100 shadow-[0_2px_4px_rgba(0,0,0,0.2)]'
            )}
          >
            <span
              className={cn(
                'size-2.75 rounded-full bg-black transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform',
                isBlinking && 'opacity-0',
                isLookAwayState && 'size-2.5'
              )}
              style={{
                transform: `translate(${softenedX * 12 + offsetX * 4}%, ${softenedY * 12}%)`,
              }}
            />
          </span>
        )
      })}
    </div>
  )
}
