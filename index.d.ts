import * as react_jsx_runtime from 'react/jsx-runtime';
import { ReactNode } from 'react';
import { BlogPost, Page, SocialPost, BlogAuthor, BusinessConfig, Form, FormField, SDKVersionManifest, Job, BlogGeneratePayload, JobTriggerResponse, SDKResponse } from '@growth-engine/types';
export { BlogAuthor, BlogPost, Page, SDK_VERSION, SocialPost } from '@growth-engine/types';
import { z } from 'zod';

interface GrowthEngineContextValue {
    locale?: string | undefined;
    tenantSlug?: string | undefined;
}
declare function GrowthEngineProvider({ children, locale, tenantSlug, }: {
    children: ReactNode;
    locale?: string | undefined;
    tenantSlug?: string | undefined;
}): react_jsx_runtime.JSX.Element;
declare function useGrowthEngine(): GrowthEngineContextValue;

interface UseContentResult<T> {
    posts: T[];
    loading: boolean;
    error: string | null;
}
interface UseContentOptions {
    locale?: string;
}
declare function useContent(type: 'blog', options?: UseContentOptions): UseContentResult<BlogPost>;
declare function useContent(type: 'social', options?: UseContentOptions): UseContentResult<SocialPost>;
declare function useContent(type: 'landing_page', options?: UseContentOptions): UseContentResult<Page>;
/**
 * Convenience hook for listing published landing pages (newest first).
 * Thin wrapper over useContent('landing_page').
 */
declare function usePages(options?: UseContentOptions): UseContentResult<Page>;
declare function fetchBlog(slugOrUrlPath: string, locale?: string): Promise<BlogPost | null>;
/**
 * Fetch a single published landing page by slug. Returns null if not found
 * or on error. Locale is accepted for API symmetry with fetchBlog; landing
 * pages are not language-partitioned, so it is currently ignored server-side.
 */
declare function fetchPage(slug: string, locale?: string): Promise<Page | null>;
/**
 * Build the canonical URL path for a blog post from its urlPath or slug.
 * Returns a path like "/blog/2026/03/my-post" if urlPath is set,
 * or "/blog/my-post" as fallback.
 */
declare function getBlogUrl(post: Pick<BlogPost, 'slug' | 'urlPath'>): string;
declare function getSocialPosts(platform: 'instagram' | 'linkedin' | 'facebook'): Promise<SocialPost[]>;

interface UseAuthorsResult {
    authors: BlogAuthor[];
    loading: boolean;
    error: string | null;
}
declare function useAuthors(): UseAuthorsResult;
declare function fetchAuthor(slug: string): Promise<BlogAuthor | null>;
interface FetchAuthorPostsOptions {
    locale?: string;
    limit?: number;
    offset?: number;
}
declare function fetchAuthorPosts(authorSlug: string, options?: FetchAuthorPostsOptions): Promise<BlogPost[]>;

interface UseBusinessConfigResult {
    config: BusinessConfig | null;
    loading: boolean;
    error: string | null;
}
declare function useBusinessConfig(): UseBusinessConfigResult;
declare function getHours(): Promise<Record<string, unknown> | null>;
declare function getContactInfo(): Promise<Record<string, unknown> | null>;

interface UseFormsResult {
    forms: Form[];
    loading: boolean;
    error: string | null;
}
interface UseFormResult {
    form: Form | null;
    schema: z.ZodObject<Record<string, z.ZodTypeAny>> | null;
    loading: boolean;
    error: string | null;
}
declare function useForms(): UseFormsResult;
declare function useForm(slug: string): UseFormResult;
declare function submitForm(slug: string, data: Record<string, unknown>): Promise<{
    ok: boolean;
    id?: string;
    error?: string;
    validationErrors?: z.ZodIssue[];
}>;

/**
 * Convert a FormField[] array into a Zod validation schema.
 * Used at runtime to validate form submissions before sending.
 */
declare function buildFormSchema(fields: FormField[]): z.ZodObject<Record<string, z.ZodTypeAny>>;

interface PushLeadData {
    firstName: string;
    lastName?: string;
    email?: string;
    phone?: string;
    company?: string;
}
interface PushLeadResult {
    ok: boolean;
    contactId?: string;
    existing?: boolean;
    error?: string;
}
declare function pushLead(data: PushLeadData): Promise<PushLeadResult>;

interface SubscribeToNewsletterData {
    email: string;
    name?: string;
}
interface SubscribeToNewsletterResult {
    ok: boolean;
    error?: string;
}
/**
 * Subscribe an email to the tenant newsletter (single opt-in). Idempotent —
 * re-subscribing an unsubscribed address flips it back to subscribed and the
 * response never reveals whether the address already existed.
 */
declare function subscribeToNewsletter(data: SubscribeToNewsletterData): Promise<SubscribeToNewsletterResult>;

/**
 * An update list as the public feed sees it. Timestamps are stripped
 * server-side — this is the whole shape.
 */
interface UpdateListSummary {
    id: string;
    name: string;
    slug: string;
    description: string | null;
}
/**
 * A published update item. Dates arrive as ISO strings because the payload is
 * JSON; pass them to `new Date(...)` before formatting.
 */
interface UpdateFeedItem {
    id: string;
    title: string;
    /** Markdown source. */
    body: string;
    imageUrl: string | null;
    eventDate: string | null;
    publishedAt: string | null;
}
interface UseUpdateListsResult {
    lists: UpdateListSummary[];
    loading: boolean;
    error: string | null;
}
/** List every update feed the tenant publishes, ordered by name. */
declare function useUpdateLists(): UseUpdateListsResult;
interface UseUpdatesOptions {
    /** Number of items to fetch. Clamped server-side to 1..100; defaults to 20. */
    limit?: number;
}
interface UseUpdatesResult {
    items: UpdateFeedItem[];
    /** Meta for the requested list, or null while loading / when it does not exist. */
    list: UpdateListSummary | null;
    loading: boolean;
    error: string | null;
}
/**
 * Published items of one update list, newest first. An unknown `listSlug`
 * resolves to an error (the route 404s) rather than an empty feed, so the
 * caller can tell "no items yet" apart from "wrong slug".
 */
declare function useUpdates(listSlug: string, options?: UseUpdatesOptions): UseUpdatesResult;

interface UseVariablesResult {
    /** Flat `key → value` map. Company-scope only; user-scope values are never served. */
    variables: Record<string, string>;
    loading: boolean;
    error: string | null;
}
/**
 * Tenant-wide variables (phone numbers, booking URLs, price points) as a flat
 * key/value map. The route only ever returns company-scope rows, so nothing
 * here is user-specific.
 */
declare function useVariables(): UseVariablesResult;

interface UseSDKStatusResult {
    manifest: SDKVersionManifest | null;
    loading: boolean;
    error: string | null;
}
declare function useSDKStatus(): UseSDKStatusResult;

interface UseJobStatusResult {
    job: Job | null;
    loading: boolean;
    error: string | null;
    refresh: () => void;
}
declare function useJobStatus(jobId: string | null): UseJobStatusResult;

declare function triggerBlogGen(payload: BlogGeneratePayload): Promise<JobTriggerResponse>;

declare function triggerSocialSync(platforms?: ('instagram' | 'linkedin' | 'facebook')[]): Promise<JobTriggerResponse>;

declare function onAnalyticsEvent(event: {
    eventType: string;
    page?: string;
    sessionId?: string;
}): Promise<void>;

declare function sdkFetch<T>(path: string, options?: RequestInit): Promise<SDKResponse<T>>;

type JsonLdObject = Record<string, unknown>;
declare function buildBlogPostingLd(post: BlogPost, author?: BlogAuthor, business?: BusinessConfig, options?: {
    url?: string;
}): JsonLdObject;
declare function buildLocalBusinessLd(config: BusinessConfig): JsonLdObject | null;

interface MetaTagsProps {
    title?: string | null;
    description?: string | null;
    image?: string | null;
    url?: string | null;
    type?: string;
}
declare function MetaTags({ title, description, image, url, type }: MetaTagsProps): react_jsx_runtime.JSX.Element;

export { GrowthEngineProvider, MetaTags, type MetaTagsProps, type PushLeadData, type PushLeadResult, type SubscribeToNewsletterData, type SubscribeToNewsletterResult, type UpdateFeedItem, type UpdateListSummary, type UseUpdatesOptions, buildBlogPostingLd, buildFormSchema, buildLocalBusinessLd, fetchAuthor, fetchAuthorPosts, fetchBlog, fetchPage, getBlogUrl, getContactInfo, getHours, getSocialPosts, onAnalyticsEvent, pushLead, sdkFetch, submitForm, subscribeToNewsletter, triggerBlogGen, triggerSocialSync, useAuthors, useBusinessConfig, useContent, useForm, useForms, useGrowthEngine, useJobStatus, usePages, useSDKStatus, useUpdateLists, useUpdates, useVariables };
