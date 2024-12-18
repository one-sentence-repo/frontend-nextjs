import Button from '@/src/components/shared/Button'
import { DropDown } from '@/src/components/shared/DropDown'
import Icon from '@/src/components/shared/Icon'
import useOutsideClick from '@/src/hooks/useOutsideClick'
import useDataDrivenAnimation from '@/src/hooks/useStateChange'

interface Props {
  yearList: number[]
  selectedYear: number
  onSelect: (year: number) => void
}

export default function YearSection({
  yearList,
  selectedYear,
  onSelect,
}: Props) {
  const {
    onClick: onClickButton,
    close,
    onTransitionEnd,
    ref,
  } = useDataDrivenAnimation<HTMLDivElement>()
  const buttonRef = useOutsideClick<HTMLButtonElement>(close)

  return (
    <DropDown.Root className="self-end">
      <DropDown.Trigger
        onClick={onClickButton}
        variant="secondary"
        targetRef={buttonRef}
        size="sm"
      >
        {selectedYear}
        <Icon view="0 -960 960 960" size={18}>
          <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
        </Icon>
      </DropDown.Trigger>
      <DropDown.Content
        ref={ref}
        position="bottomLeft"
        onTransitionEnd={onTransitionEnd}
        initStatus="closed"
        className="p-0"
      >
        {yearList.map((year) => (
          <Button
            key={year}
            onClick={() => onSelect(year)}
            variant="list"
            size="sm"
            className="gap-2"
          >
            {year}
            {selectedYear === year && (
              <Icon view="0 -960 960 960" size={16}>
                <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
              </Icon>
            )}
          </Button>
        ))}
      </DropDown.Content>
    </DropDown.Root>
  )
}
