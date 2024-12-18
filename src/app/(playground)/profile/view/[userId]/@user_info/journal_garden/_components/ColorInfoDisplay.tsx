import Text from '@/src/components/shared/Text'
import Block from './Block'

export default function ColorInfoDisplay() {
  return (
    <div className="flex items-center gap-2 self-end">
      <Text type="caption" size="sm" className="leading-none">
        아주나쁨
      </Text>
      {/* <div className="size-3 rounded-sm bg-[#ff6666]" />
      <div className="size-3 rounded-sm bg-[#ffb266]" />
      <div className="size-3 rounded-sm bg-[#f8db4d]" />
      <div className="size-3 rounded-sm bg-[#94db4c]" />
      <div className="size-3 rounded-sm bg-[#34d834]" /> */}
      <Block disabled average={20} />
      <Block disabled average={40} />
      <Block disabled average={60} />
      <Block disabled average={80} />
      <Block disabled average={100} />
      <Text type="caption" size="sm">
        아주좋음
      </Text>
    </div>
  )
}
