import * as react_jsx_runtime from 'react/jsx-runtime';
import { ReactNode } from 'react';
import { BlogPost, SocialPost, BlogAuthor, BusinessConfig, Form, FormField, SDKVersionManifest, Job, BlogGeneratePayload, JobTriggerResponse, SDKResponse } from '@growth-engine/types';
export { BlogAuthor, BlogPost, SDK_VERSION, SocialPost } from '@growth-engine/types';
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
declare function fetchBlog(slugOrUrlPath: string, locale?: string): Promise<BlogPost | null>;
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

export { GrowthEngineProvider, type PushLeadData, type PushLeadResult, buildFormSchema, fetchAuthor, fetchAuthorPosts, fetchBlog, getBlogUrl, getContactInfo, getHours, getSocialPosts, onAnalyticsEvent, pushLead, sdkFetch, submitForm, triggerBlogGen, triggerSocialSync, useAuthors, useBusinessConfig, useContent, useForm, useForms, useGrowthEngine, useJobStatus, useSDKStatus };
