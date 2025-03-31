
import posthog from 'posthog-js'

// const posthog = createPostHog(
if (typeof window !== 'undefined' && !posthog.__loaded) {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY || '', {
    api_host: 'https://app.posthog.com',
    capture_pageview: false,
  })
  posthog.__loaded = true // avoid re-init on hot reload
}
// )
export default posthog
