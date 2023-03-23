import React from 'react'
import './idle.css'
import {motion} from 'framer-motion'
export default function Idle() {
  return (
    <div
    className='idle-wrapper'>
        <motion.div
        initial={{opacity:0, x: 100}}
        animate={{opacity:1, x: 0}}
        transition={{delay: 0.5, ease: [0, 0.51, 0.2, 1.01]}}
        className='app-intro'>
            <h1>Don't let <motion.span
            initial={{opacity:0}}
            animate={{opacity:1}}
            transition={{delay:1}}
            className='check'>weather</motion.span> ruin your plans.</h1>
            <motion.h2
            initial={{opacity:0, y:200}}
            animate={{opacity:1, y:0}}
            transition={{delay:1.5, ease: [0, 0.51, 0.2, 1.01], bounce: 0.50}}
            >Stay Updated!!</motion.h2>
        </motion.div>
    </div>
  );
}
