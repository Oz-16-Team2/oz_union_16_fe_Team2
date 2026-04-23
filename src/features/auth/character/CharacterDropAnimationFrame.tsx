import type { PropsWithChildren } from 'react'

import { motion } from 'framer-motion'

import { charBlue, charPink } from '@/assets/images'
import { cn } from '@/utils/cn'

import { CharacterEye } from './eye/CharacterEye'
import type { CharacterEyeStatus } from './eye/useCharacterEye'

type LoginDropAnimationFrameProps = PropsWithChildren<{
  isDropped: boolean
  eyeStatus?: CharacterEyeStatus
  leftCharacterSrc?: string
  rightCharacterSrc?: string
  leftCharacterClassName?: string
  rightCharacterClassName?: string
  leftEyeClassName?: string
  rightEyeClassName?: string
  leftPawClassName?: string
  rightPawClassName?: string
}>

export function CharacterDropAnimationFrame({
  isDropped,
  eyeStatus = 'idle',
  leftCharacterSrc = charBlue,
  rightCharacterSrc = charPink,
  leftCharacterClassName = 'w-34',
  rightCharacterClassName = 'w-30',
  leftEyeClassName = 'left-1/2 top-[22%] -translate-x-1/2',
  rightEyeClassName = 'left-1/2 top-[28%] -translate-x-1/2',
  leftPawClassName = 'bg-[#5b65ff]',
  rightPawClassName = 'bg-[#ff22b2]',
  children,
}: LoginDropAnimationFrameProps) {
  return (
    <motion.section
      className="relative w-full max-w-lg"
      initial={{ y: '-140vh', opacity: 0, rotate: -2.4 }}
      animate={
        isDropped
          ? {
              y: 0,
              opacity: 1,
              rotate: [-2.4, 1.5, -0.7, 0.2, 0],
            }
          : { y: '-120vh', opacity: 0, rotate: -2.4 }
      }
      transition={{
        y: {
          type: 'spring',
          stiffness: 76,
          damping: 13,
          mass: 1.08,
        },
        opacity: { duration: 0.16 },
        rotate: {
          duration: 1.24,
          times: [0, 0.52, 0.72, 0.9, 1],
          ease: [0.16, 1, 0.3, 1],
        },
      }}
      style={{ transformOrigin: '50% 0%' }}
    >
      <motion.div
        className="pointer-events-none absolute -top-[36vh] left-1/2 hidden h-[40vh] w-1 -translate-x-1/2 rounded-full bg-border-default md:block"
        animate={{ opacity: isDropped ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      />

      <div className="pointer-events-none absolute -top-24 left-10 z-0 hidden md:block">
        <motion.div
          className="relative"
          animate={isDropped ? { y: [0, -5, 0] } : undefined}
          transition={{ delay: 0.94, duration: 0.58, ease: 'easeOut' }}
        >
          <img
            src={leftCharacterSrc}
            alt=""
            className={cn('object-contain', leftCharacterClassName)}
          />
          <CharacterEye
            status={eyeStatus}
            direction="right"
            className={cn('absolute w-[40%]', leftEyeClassName)}
          />
        </motion.div>
      </div>

      <div className="pointer-events-none absolute -top-18 right-10 z-0 hidden md:block">
        <motion.div
          className="relative"
          animate={isDropped ? { y: [0, -4, 0] } : undefined}
          transition={{ delay: 1.02, duration: 0.54, ease: 'easeOut' }}
        >
          <img
            src={rightCharacterSrc}
            alt=""
            className={cn('object-contain', rightCharacterClassName)}
          />
          <CharacterEye
            status={eyeStatus}
            direction="left"
            className={cn('absolute w-[42%]', rightEyeClassName)}
          />
        </motion.div>
      </div>

      <motion.div
        className="relative z-10 w-full"
        animate={
          isDropped
            ? {
                // 착지 순간 카드가 살짝 눌렸다 돌아오게 해서 폼 등장에 무게감을 더합니다.
                y: [0, 12, -4, 0],
                scaleX: [1, 1.012, 0.996, 1],
                scaleY: [1, 0.982, 1.006, 1],
              }
            : undefined
        }
        transition={{
          delay: 0.78,
          duration: 0.62,
          times: [0, 0.42, 0.72, 1],
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        <div className="pointer-events-none absolute -top-3 left-20 z-20 hidden md:block">
          <span
            className={cn(
              'absolute left-0 h-9 w-5 rounded-full shadow-[inset_4px_4px_8px_rgba(255,255,255,0.18)]',
              leftPawClassName
            )}
          />
          <span
            className={cn(
              'absolute left-8 h-9 w-5 rounded-full shadow-[inset_4px_4px_8px_rgba(255,255,255,0.18)]',
              leftPawClassName
            )}
          />
        </div>
        <div className="pointer-events-none absolute -top-3 right-20 z-20 hidden md:block">
          <span
            className={cn(
              'absolute right-8 h-8 w-5 rounded-full shadow-[inset_4px_4px_8px_rgba(255,255,255,0.18)]',
              rightPawClassName
            )}
          />
          <span
            className={cn(
              'absolute right-0 h-8 w-5 rounded-full shadow-[inset_4px_4px_8px_rgba(255,255,255,0.18)]',
              rightPawClassName
            )}
          />
        </div>
        {children}
      </motion.div>
    </motion.section>
  )
}
