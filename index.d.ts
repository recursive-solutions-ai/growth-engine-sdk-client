import * as react_jsx_runtime from 'react/jsx-runtime';
import { ReactNode } from 'react';
import { BlogPost, SocialPost, BusinessConfig, Form, SDKVersionManifest, Job, BlogGeneratePayload, JobTriggerResponse, SDKResponse } from '@growth-engine/types';
export { BlogPost, SocialPost } from '@growth-engine/types';

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
declare function useContent(type: 'blog'): UseContentResult<BlogPost>;
declare function useContent(type: 'social'): UseContentResult<SocialPost>;
declare function fetchBlog(slug: string): Promise<BlogPost | null>;
declare function getSocialPosts(platform: 'instagram' | 'linkedin' | 'facebook'): Promise<SocialPost[]>;

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
    loading: boolean;
    error: string | null;
}
declare function useForms(): UseFormsResult;
declare function useForm(slug: string): UseFormResult;
declare function submitForm(slug: string, data: Record<string, unknown>): Promise<{
    ok: boolean;
    id?: string;
    error?: string;
}>;

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

declare const SDK_VERSION = "0.1.0";

export { GrowthEngineProvider, SDK_VERSION, fetchBlog, getContactInfo, getHours, getSocialPosts, onAnalyticsEvent, sdkFetch, submitForm, triggerBlogGen, triggerSocialSync, useBusinessConfig, useContent, useForm, useForms, useGrowthEngine, useJobStatus, useSDKStatus };
