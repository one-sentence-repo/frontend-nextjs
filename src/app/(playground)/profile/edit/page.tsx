import { Metadata } from 'next'
import EditProfileContainer from './_containers/EditProfileContainer'

export const metadata: Metadata = {
  title: 'Edit Profile',
}

export default function EditProfilePage() {
  return <EditProfileContainer />
}
