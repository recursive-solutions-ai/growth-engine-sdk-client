# @growth-engine/sdk-client

Browser-safe React SDK for Growth Engine. Provides hooks and utilities to fetch blog posts, social content, forms, business config, CRM leads, and analytics from your Growth Engine-powered site.

## Installation

```bash
npm install recursive-solutions-ai/growth-engine-sdk-client
```

**Peer dependencies:** `react` (^18 or ^19), `zod` (^3)

## Quick Start

### 1. Add the provider

Wrap your app (or a subtree) with `GrowthEngineProvider`:

```tsx
import { GrowthEngineProvider } from '@growth-engine/sdk-client'

export default function RootLayout({ children }) {
  return (
    <GrowthEngineProvider locale="en" tenantSlug="my-tenant">
      {children}
    </GrowthEngineProvider>
  )
}
```

Both `locale` and `tenantSlug` are optional. The provider also checks SDK version compatibility on mount and logs warnings if your version is deprecated.

### 2. Fetch content

```tsx
import { useContent } from '@growth-engine/sdk-client'

function BlogList() {
  const { posts, loading, error } = useContent('blog', { locale: 'en' })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.slug}>{post.title}</li>
      ))}
    </ul>
  )
}
```

## API Reference

### Provider & Context

| Export | Type | Description |
|--------|------|-------------|
| `GrowthEngineProvider` | Component | Context provider. Props: `locale?`, `tenantSlug?`, `children` |
| `useGrowthEngine()` | Hook | Returns `{ locale?, tenantSlug? }` from the nearest provider |

### Content

| Export | Type | Description |
|--------|------|-------------|
| `useContent('blog', options?)` | Hook | Fetch blog posts. Returns `{ posts: BlogPost[], loading, error }` |
| `useContent('social', options?)` | Hook | Fetch social posts. Returns `{ posts: SocialPost[], loading, error }` |
| `fetchBlog(slug, locale?)` | Async | Fetch a single blog post by slug. Returns `BlogPost \| null` |
| `getBlogUrl(post)` | Utility | Build canonical URL path (e.g. `/blog/2026/03/my-post`) |
| `getSocialPosts(platform)` | Async | Fetch social posts by platform (`'instagram'`, `'linkedin'`, `'facebook'`) |

**Options:** `{ locale?: string }`

### Authors

| Export | Type | Description |
|--------|------|-------------|
| `useAuthors()` | Hook | Fetch all authors. Returns `{ authors: BlogAuthor[], loading, error }` |
| `fetchAuthor(slug)` | Async | Fetch a single author by slug |
| `fetchAuthorPosts(authorSlug, options?)` | Async | Fetch posts by author. Options: `{ locale?, limit?, offset? }` |

### Forms

```tsx
import { useForm, submitForm } from '@growth-engine/sdk-client'

function ContactForm() {
  const { form, schema, loading } = useForm('contact')

  async function handleSubmit(data: Record<string, unknown>) {
    const result = await submitForm('contact', data)
    if (!result.ok) {
      console.error(result.error, result.validationErrors)
    }
  }

  // render form fields from form.fields, validate with schema
}
```

| Export | Type | Description |
|--------|------|-------------|
| `useForms()` | Hook | Fetch all forms. Returns `{ forms: Form[], loading, error }` |
| `useForm(slug)` | Hook | Fetch one form + auto-generated Zod schema. Returns `{ form, schema, loading, error }` |
| `submitForm(slug, data)` | Async | Validate client-side with Zod, then submit. Returns `{ ok, id?, error?, validationErrors? }` |
| `buildFormSchema(fields)` | Utility | Convert `FormField[]` to a Zod validation schema |

### CRM

```tsx
import { pushLead } from '@growth-engine/sdk-client'

const result = await pushLead({
  firstName: 'Jane',
  email: 'jane@example.com',
  company: 'Acme',
})
// { ok: true, contactId: '...', existing: false }
```

| Export | Type | Description |
|--------|------|-------------|
| `pushLead(data)` | Async | Create or deduplicate a CRM contact. Input: `{ firstName, lastName?, email?, phone?, company? }` |

### Business Config

| Export | Type | Description |
|--------|------|-------------|
| `useBusinessConfig()` | Hook | Fetch config. Returns `{ config: BusinessConfig \| null, loading, error }` |
| `getHours()` | Async | Fetch business hours |
| `getContactInfo()` | Async | Fetch contact information |

### Jobs & Triggers

| Export | Type | Description |
|--------|------|-------------|
| `useJobStatus(jobId)` | Hook | Poll job status. Returns `{ job, loading, error, refresh }` |
| `triggerBlogGen(payload)` | Async | Trigger a blog generation job. Accepts `BlogGeneratePayload` |
| `triggerSocialSync(platforms?)` | Async | Trigger social sync. Optional platform filter: `('instagram' \| 'linkedin' \| 'facebook')[]` |

### Analytics

| Export | Type | Description |
|--------|------|-------------|
| `onAnalyticsEvent(event)` | Async | Send an analytics event. Input: `{ eventType: string, page?: string, sessionId?: string }` |

### SDK Status

| Export | Type | Description |
|--------|------|-------------|
| `useSDKStatus()` | Hook | Fetch SDK version manifest and compatibility info |
| `SDK_VERSION` | Constant | Current SDK version string |

### Low-Level Client

| Export | Type | Description |
|--------|------|-------------|
| `sdkFetch<T>(path, options?)` | Async | Core fetch utility. Base path: `/api/rs`. Returns `{ data: T, error: string \| null, status: number }` |

### Exported Types

```ts
import type { BlogAuthor, BlogPost, SocialPost, PushLeadData, PushLeadResult } from '@growth-engine/sdk-client'
```

## How It Works

All hooks call your site's `/api/rs/*` endpoints, which are handled by the [`@growth-engine/sdk-server`](https://github.com/recursive-solutions-ai/growth-engine-sdk-server) package on the backend. No direct Brain API calls are made from the browser.

## Requirements

- React 18 or 19
- Zod 3
- `@growth-engine/sdk-server` configured on your backend (see [sdk-server README](https://github.com/recursive-solutions-ai/growth-engine-sdk-server))

## License

Private
