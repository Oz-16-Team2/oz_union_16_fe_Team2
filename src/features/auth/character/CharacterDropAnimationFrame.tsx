import type { PropsWithChildren } from 'react'

import { motion } from 'framer-motion'

import { charBlue, charPink } from '@/assets/images'
import { cn } from '@/utils/cn'

import { CharacterEye } from './eye/CharacterEye'
import type { CharacterEyeStatus } from './eye/useCharacterEye'

type LoginDropAnimationFrameProps = PropsWithChildren<{
  isDropped: boolean
  isSuccessMotion?: boolean
  isCompactMotion?: boolean
  eyeStatus?: CharacterEyeStatus
  prefersReducedMotion?: boolean
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
  isSuccessMotion = false,
  isCompactMotion = false,
  eyeStatus = 'idle',
  prefersReducedMotion = false,
  leftCharacterSrc = charBlue,
  rightCharacterSrc = charPink,
  leftCharacterClassName = 'w-34',
  rightCharacterClassName = 'w-30',
  leftEyeClassName = 'left-1/2 top-[20%] -translate-x-1/2',
  rightEyeClassName = 'left-1/2 top-[28%] -translate-x-1/2',
  leftPawClassName = 'bg-[#5b65ff]',
  rightPawClassName = 'bg-[#ff22b2]',
  children,
}: LoginDropAnimationFrameProps) {
  const resolvedEyeStatus = isSuccessMotion ? 'entrance' : eyeStatus
  const sectionInitial = prefersReducedMotion
    ? { y: 0, opacity: 1, rotate: 0 }
    : isCompactMotion
      ? { y: -36, opacity: 0, rotate: 0 }
      : { y: '-140vh', opacity: 0, rotate: -2.4 }
  const sectionAnimate = prefersReducedMotion
    ? { y: 0, opacity: 1, rotate: 0 }
    : isSuccessMotion
      ? isCompactMotion
        ? { y: -72, opacity: 0, rotate: 0 }
        : { y: -96, opacity: 0, rotate: 0 }
      : isCompactMotion
        ? isDropped
          ? { y: 0, opacity: 1, rotate: 0 }
          : { y: -24, opacity: 0, rotate: 0 }
        : isDropped
          ? {
              y: 0,
              opacity: 1,
              rotate: [-2.4, 1.5, -0.7, 0.2, 0],
            }
          : {
              y: '-120vh',
              opacity: 0,
              rotate: -2.4,
            }
  const sectionTransition = prefersReducedMotion
    ? { duration: 0 }
    : isSuccessMotion
      ? {
          y: {
            duration: isCompactMotion ? 0.46 : 0.58,
            ease: [0.4, 0, 0.2, 1],
          },
          opacity: {
            duration: isCompactMotion ? 0.28 : 0.34,
            ease: 'easeOut',
          },
        }
      : isCompactMotion
        ? {
            y: { duration: 0.52, ease: [0.22, 1, 0.36, 1] },
            opacity: { duration: 0.3, ease: 'easeOut' },
          }
        : {
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
          }

  return (
    <motion.section
      className="relative w-full max-w-[min(100%,32rem)] md:max-w-[min(100%,34rem)] mt-0 sm:mt-22"
      initial={sectionInitial}
      animate={sectionAnimate}
      transition={sectionTransition}
      style={{ transformOrigin: '50% 0%' }}
    >
      <div className="pointer-events-none absolute -top-21 left-10 z-0 hidden sm:block">
        <motion.div
          className="relative"
          animate={
            prefersReducedMotion
              ? undefined
              : isDropped
                ? { y: isCompactMotion ? [0, -2, 0] : [0, -5, 0] }
                : undefined
          }
          transition={{
            delay: isCompactMotion ? 0.28 : 0.94,
            duration: isCompactMotion ? 0.28 : 0.58,
            ease: 'easeOut',
          }}
        >
          <img
            src={leftCharacterSrc}
            alt=""
            className={cn('object-contain', leftCharacterClassName)}
          />
          <CharacterEye
            status={resolvedEyeStatus}
            direction="right"
            className={cn('absolute w-[40%]', leftEyeClassName)}
          />
        </motion.div>
      </div>

      <div className="pointer-events-none absolute -top-18 right-10 z-0 hidden sm:block">
        <motion.div
          className="relative"
          animate={
            prefersReducedMotion
              ? undefined
              : isDropped
                ? { y: isCompactMotion ? [0, -2, 0] : [0, -4, 0] }
                : undefined
          }
          transition={{
            delay: isCompactMotion ? 0.34 : 1.02,
            duration: isCompactMotion ? 0.26 : 0.54,
            ease: 'easeOut',
          }}
        >
          <img
            src={rightCharacterSrc}
            alt=""
            className={cn('object-contain', rightCharacterClassName)}
          />
          <CharacterEye
            status={resolvedEyeStatus}
            direction="left"
            className={cn('absolute w-[42%]', rightEyeClassName)}
          />
        </motion.div>
      </div>

      <motion.div
        className="relative z-10 w-full"
        animate={
          prefersReducedMotion
            ? undefined
            : isCompactMotion
              ? undefined
              : isDropped
                ? {
                    // 착지 순간 카드가 살짝 눌렸다 돌아오게 해서 폼 등장에 무게감을 더합니다.
                    y: [0, 12, -4, 0],
                    scaleX: [1, 1.012, 0.996, 1],
                    scaleY: [1, 0.982, 1.006, 1],
                  }
                : undefined
        }
        transition={{
          delay: isCompactMotion ? 0 : 0.78,
          duration: isCompactMotion ? 0 : 0.62,
          times: [0, 0.42, 0.72, 1],
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        <div className="pointer-events-none absolute -top-3 left-20 z-20 hidden sm:block">
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
        <div className="pointer-events-none absolute -top-3 right-20 z-20 hidden sm:block">
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
