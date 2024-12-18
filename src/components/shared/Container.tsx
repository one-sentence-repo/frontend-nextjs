import { ComponentProps, forwardRef, PropsWithChildren } from 'react'

interface ContainerProps extends ComponentProps<'div'> {
  className?: string
  as?: 'div' | 'nav' | 'header' | 'main' | 'footer' | 'article' | 'section'
}

export const Container = forwardRef<
  HTMLDivElement,
  PropsWithChildren<ContainerProps>
>(({ children, className, as: Component = 'div', ...props }, ref) => {
  return (
    <Component className={className} {...props}>
      {children}
    </Component>
  )
})

Container.displayName = 'Container'
