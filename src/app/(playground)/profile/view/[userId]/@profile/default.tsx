import AboutMe from './_components/AboutMe'

interface Props {
  params: { userId: string }
}

export default function Profile({ params }: Props) {
  const userId = params.userId

  return <AboutMe userId={userId} />
}
