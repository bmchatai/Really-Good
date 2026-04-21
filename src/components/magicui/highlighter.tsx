"use client"

import { useLayoutEffect, useRef } from "react"
import type React from "react"
import { useInView } from "framer-motion"
import { annotate } from "rough-notation"
import { type RoughAnnotation } from "rough-notation/lib/model"

type AnnotationAction =
  | "highlight"
  | "underline"
  | "box"
  | "circle"
  | "strike-through"
  | "crossed-off"
  | "bracket"

interface HighlighterProps {
  children: React.ReactNode
  action?: AnnotationAction
  color?: string
  strokeWidth?: number
  animationDuration?: number
  iterations?: number
  padding?: number
  multiline?: boolean
  isView?: boolean
  className?: string
  /** Re-runs the draw animation in a loop. Interval is measured from animation start. */
  loop?: boolean
  /** Milliseconds between loop restarts (default 2500ms after the animation completes). */
  loopDelay?: number
}

export function Highlighter({
  children,
  action = "highlight",
  color = "#2FD7BF",
  strokeWidth = 2,
  animationDuration = 800,
  iterations = 1,
  padding = 0,
  multiline = true,
  isView = false,
  className = "",
  loop = false,
  loopDelay = 2500,
}: HighlighterProps) {
  const elementRef = useRef<HTMLSpanElement>(null)

  const isInView = useInView(elementRef, {
    once: true,
    amount: 0.5,
  })

  // If isView is false, always show. If isView is true, wait for inView
  const shouldShow = !isView || isInView

  useLayoutEffect(() => {
    const element = elementRef.current
    let annotation: RoughAnnotation | null = null
    let resizeObserver: ResizeObserver | null = null
    let loopTimer: ReturnType<typeof setTimeout> | null = null

    if (shouldShow && element) {
      const annotationConfig = {
        type: action,
        color,
        strokeWidth,
        animationDuration,
        iterations,
        padding,
        multiline,
      }

      const currentAnnotation = annotate(element, annotationConfig)
      annotation = currentAnnotation
      currentAnnotation.show()

      if (loop) {
        const scheduleRedraw = () => {
          loopTimer = setTimeout(() => {
            currentAnnotation.hide()
            currentAnnotation.show()
            scheduleRedraw()
          }, animationDuration + loopDelay)
        }
        scheduleRedraw()
      }

      resizeObserver = new ResizeObserver(() => {
        currentAnnotation.hide()
        currentAnnotation.show()
      })

      resizeObserver.observe(element)
      resizeObserver.observe(document.body)
    }

    return () => {
      if (loopTimer) clearTimeout(loopTimer)
      annotation?.remove()
      if (resizeObserver) {
        resizeObserver.disconnect()
      }
    }
  }, [
    shouldShow,
    action,
    color,
    strokeWidth,
    animationDuration,
    iterations,
    padding,
    multiline,
    loop,
    loopDelay,
  ])

  return (
    <span ref={elementRef} className={`relative inline-block ${className}`}>
      {children}
    </span>
  )
}
