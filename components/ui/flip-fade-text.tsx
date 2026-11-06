"use client"

import { useEffect, useState, useMemo, useCallback, memo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

interface FlipFadeTextProps {
    /**
     * Array of words to cycle through
     * @default ["LOADING", "COMPUTING", "SEARCHING", "RETRIEVING", "ASSEMBLING"]
     */
    words?: string[]
    /**
     * Interval between word changes in milliseconds
     * @default 2500
     */
    interval?: number
    /**
     * Additional CSS classes for the container
     */
    className?: string
    /**
     * Additional CSS classes for the text
     */
    textClassName?: string
    /**
     * Animation duration for each letter in seconds
     * @default 0.6
     */
    letterDuration?: number
    /**
     * Stagger delay between letters on enter in seconds
     * @default 0.1
     */
    staggerDelay?: number
    /**
     * Stagger delay between letters on exit in seconds
     * @default 0.05
     */
    exitStaggerDelay?: number
    /**
     * Animate letter by letter or word by word (use "word" for Arabic)
     * @default "letter"
     */
    splitBy?: "letter" | "word"
}

const defaultWords = ["LOADING", "COMPUTING", "SEARCHING", "RETRIEVING", "ASSEMBLING"]

// Memoized Letter component for performance
const Letter = memo(function Letter({
    char,
    letterDuration
}: {
    char: string
    letterDuration: number
}) {
    return (
        <motion.span
            style={{ transformStyle: "preserve-3d" }}
            variants={{
                initial: {
                    rotateX: 90,
                    y: 20,
                    opacity: 0,
                    filter: "blur(8px)",
                },
                animate: {
                    rotateX: 0,
                    y: 0,
                    opacity: 1,
                    filter: "blur(0px)",
                    transition: {
                        duration: letterDuration,
                        ease: [0.2, 0.65, 0.3, 0.9],
                    },
                },
                exit: {
                    rotateX: -90,
                    y: -20,
                    opacity: 0,
                    filter: "blur(8px)",
                    transition: {
                        duration: letterDuration * 0.67,
                        ease: "easeIn",
                    },
                },
            }}
            className="inline-block"
        >
            {char === " " ? " " : char}
        </motion.span>
    )
})

// Memoized Word component for performance
const Word = memo(function Word({
    text,
    staggerDelay,
    exitStaggerDelay,
    letterDuration,
    textClassName,
    splitBy = "letter",
}: {
    text: string
    staggerDelay: number
    exitStaggerDelay: number
    letterDuration: number
    textClassName?: string
    splitBy?: "letter" | "word"
}) {
    // Word mode keeps connected scripts (e.g. Arabic) intact
    const letters = useMemo(() => (splitBy === "word" ? text.split(" ") : text.split("")), [text, splitBy])

    return (
        <motion.div
            className={cn(
                "flex text-4xl",
                splitBy === "word" ? "flex-wrap justify-center gap-x-[0.3em]" : "gap-[0.1em]",
                "md:text-6xl font-bold uppercase tracking-wider text-neutral-800 dark:text-neutral-100",
                textClassName
            )}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={{
                initial: { opacity: 1 },
                animate: {
                    opacity: 1,
                    transition: {
                        staggerChildren: staggerDelay,
                    },
                },
                exit: {
                    opacity: 1,
                    transition: {
                        staggerChildren: exitStaggerDelay,
                    },
                },
            }}
        >
            {letters.map((char, i) => (
                <Letter
                    key={`${char}-${i}`}
                    char={char}
                    letterDuration={letterDuration}
                />
            ))}
        </motion.div>
    )
})

export function FlipFadeText({
    words = defaultWords,
    interval = 2500,
    className,
    textClassName,
    letterDuration = 0.6,
    staggerDelay = 0.1,
    exitStaggerDelay = 0.05,
    splitBy = "letter",
}: FlipFadeTextProps) {
    const [index, setIndex] = useState(0)

    // Memoize the interval callback
    const updateIndex = useCallback(() => {
        setIndex((prev) => (prev + 1) % words.length)
    }, [words.length])

    useEffect(() => {
        const timer = setInterval(updateIndex, interval)
        return () => clearInterval(timer)
    }, [updateIndex, interval])

    // Memoize the current word
    const currentWord = useMemo(() => words[index], [words, index])

    return (
        <div className={cn("flex items-center justify-center min-h-[200px]", className)}>
            <div className="relative flex items-center justify-center" style={{ perspective: "1000px" }}>
                <AnimatePresence mode="wait">
                    <Word
                        key={currentWord}
                        text={currentWord}
                        staggerDelay={staggerDelay}
                        exitStaggerDelay={exitStaggerDelay}
                        letterDuration={letterDuration}
                        textClassName={textClassName}
                        splitBy={splitBy}
                    />
                </AnimatePresence>
            </div>
        </div>
    )
}

export default FlipFadeText
