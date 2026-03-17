import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.33, 1, 0.68, 1],
      when: 'beforeChildren',
    },
  },
  exit: {
    opacity: 0,
    y: -15,
    transition: {
      duration: 0.35,
      ease: [0.76, 0, 0.24, 1],
    },
  },
}

export default function PageTransition({ children }: { children: ReactNode }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="enter"
      exit="exit"
    >
      {children}
    </motion.div>
  )
}
