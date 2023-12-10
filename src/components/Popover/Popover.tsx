import { useState, useRef, useId, type ElementType } from 'react'
import { useFloating, FloatingPortal, arrow, shift, offset } from '@floating-ui/react-dom-interactions'
import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  children: React.ReactNode
  renderPopover: React.ReactNode
  className?: string
  as?: ElementType
  initialOpen?: boolean
}

export default function Popover({ children, className, renderPopover, as: Element = 'div', initialOpen }: Props) {
  const [open, setOpen] = useState(initialOpen || false)
  const arrowRef = useRef<HTMLElement>(null)
  const { x, y, reference, floating, strategy, middlewareData } = useFloating({
    middleware: [offset(6), shift(), arrow({ element: arrowRef })]
  })
  const id = useId()
  const showPopover = () => {
    setOpen(true)
  }
  const hidePopover = () => {
    setOpen(false)
  }
  return (
    // phần tử sẽ hover vào
    <Element className={className} ref={reference} onMouseEnter={showPopover} onMouseLeave={hidePopover}>
      {/* nội dung của nút */}
      {children}

      {/* phần khi hover sẽ hiện ra */}
      <FloatingPortal id={id}>
        {/* cấu hình animation */}
        <AnimatePresence>
          {open && (
            <motion.div
              ref={floating}
              style={{
                position: strategy,
                top: y ?? 0,
                left: x ?? 0,
                width: 'max-content',
                transformOrigin: `${middlewareData.arrow?.x}px top`
              }}
              initial={{ opacity: 0, transform: 'scale(0)' }}
              animate={{ opacity: 1, transform: 'scale(1)' }}
              exit={{ opacity: 0, transform: 'scale(0)' }}
              transition={{ duration: 0.2 }}
            >
              {/* arrow hình tam giác sẽ chạy theo linh hoạt */}
              <span
                ref={arrowRef}
                className='border-x-transparent border-t-transparent border-b-gray-200 border-[11px] absolute translate-y-[-95%] z-10'
                style={{
                  left: middlewareData.arrow?.x,
                  top: middlewareData.arrow?.y
                }}
              />

              {/* nội dung khi hover */}
              {renderPopover}
            </motion.div>
          )}
        </AnimatePresence>
      </FloatingPortal>
    </Element>
  )
}
