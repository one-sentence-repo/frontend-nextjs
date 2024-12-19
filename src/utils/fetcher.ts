export const fetcher = async (
  path: string,
  options: RequestInit = {},
  useToken: boolean = true,
) => {
  try {
    if (useToken) {
      const accessToken = localStorage.accessToken
      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${accessToken}`,
      }
    }

    const response = await fetch(`${process.env.BASE_URL}${path}`, options)

    return await response.json()
  } catch (error) {
    if (error instanceof Error) {
      throw error
    } else {
      console.error('unexpected error:', error)
      throw new Error('an unknown error occurred.')
    }
  }
}
