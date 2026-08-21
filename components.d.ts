import * as react_jsx_runtime from 'react/jsx-runtime';
import { BlogPost, BlogAuthor, BusinessConfig, Form } from '@growth-engine/types';
import { ReactNode } from 'react';

interface BlogCardAuthor {
    name: string;
    slug: string;
    avatarUrl: string | null;
}
interface BlogCardProps {
    slug: string;
    title: string;
    content: string;
    heroImageUrl: string | null;
    seoDesc: string | null;
    createdAt: Date | string;
    locale: string;
    /**
     * URL prefix for the locale: `''` for the default language (no segment in
     * the URL) or `/fr` etc. for secondary languages. Pass `localePrefix(locale)`
     * from the client app. Defaults to `/${locale}` for backward compatibility.
     */
    localePrefix?: string;
    author?: BlogCardAuthor | null;
}
declare function BlogCard({ slug, title, content, heroImageUrl, seoDesc, createdAt, locale, localePrefix, author }: BlogCardProps): react_jsx_runtime.JSX.Element;

interface BlogContentProps {
    html: string;
    post?: BlogPost;
    author?: BlogAuthor;
    business?: BusinessConfig;
    /** Canonical URL of this post — added to the BlogPosting JSON-LD (`url`/`mainEntityOfPage`). */
    canonicalUrl?: string;
    disableMeta?: boolean;
    disableJsonLd?: boolean;
}
declare function BlogContent({ html, post, author, business, canonicalUrl, disableMeta, disableJsonLd, }: BlogContentProps): react_jsx_runtime.JSX.Element;

interface BlogListTranslations {
    noPostsMessage: string;
    clearSearchLabel: string;
    searchPlaceholder: string;
}
interface BlogListProps {
    posts: (Omit<BlogCardProps, 'locale' | 'localePrefix'> & {
        authorId?: string | null;
    })[];
    locale: string;
    /** Locale URL prefix (`''` for default language, `/fr` otherwise). See BlogCard. */
    localePrefix?: string;
    translations: BlogListTranslations;
    authors?: BlogAuthor[];
    /**
     * Current 1-based page when pagination is URL-driven. Comes from the route
     * (`/blog` = page 1, `/blog/page/2` = page 2). Ignored while a search query
     * is active — search results paginate client-side from page 1.
     */
    page?: number;
    /**
     * Base path of the paginated listing (e.g. `/blog` or `/fr/blog`). When set,
     * pagination renders as plain `<a href>` links — page 1 at the base path,
     * page N at `{basePath}/page/{N}` — so crawlers reach every page without
     * executing JS and posts beyond page 1 are never orphaned. When omitted,
     * pagination falls back to client-side buttons (legacy behavior).
     */
    paginationBasePath?: string;
    /**
     * Posts per page (default 9). Server pages that compute `totalPages` for
     * out-of-range 404s MUST pass their own constant here rather than importing
     * `BLOG_POSTS_PER_PAGE` from this package: the published bundle is marked
     * `"use client"`, so value imports in server components silently become
     * client-reference proxies (and arithmetic with them is NaN).
     */
    postsPerPage?: number;
}
declare const BLOG_POSTS_PER_PAGE = 9;
declare function BlogList({ posts, locale, localePrefix, translations, authors, page, paginationBasePath, postsPerPage, }: BlogListProps): react_jsx_runtime.JSX.Element;

declare function BlogSearch({ value, onChange, placeholder, }: {
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
}): react_jsx_runtime.JSX.Element;

interface RelatedPostsProps {
    posts: Omit<BlogCardProps, 'locale' | 'localePrefix'>[];
    currentSlug: string;
    locale: string;
    /** Locale URL prefix (`''` for default language, `/fr` otherwise). See BlogCard. */
    localePrefix?: string;
    heading: string;
}
declare function RelatedPosts({ posts, currentSlug, locale, localePrefix, heading }: RelatedPostsProps): react_jsx_runtime.JSX.Element | null;

declare function BusinessJsonLd({ config }: {
    config: BusinessConfig;
}): react_jsx_runtime.JSX.Element | null;

interface FormCardProps {
    slug: string;
    name: string;
    description: string | null;
    locale: string;
    /** Locale URL prefix (`''` for default language, `/fr` otherwise). Defaults to `/${locale}`. */
    localePrefix?: string;
}
declare function FormCard({ slug, name, description, locale, localePrefix }: FormCardProps): react_jsx_runtime.JSX.Element;

interface FormRendererTranslations {
    submittingLabel?: string | undefined;
    defaultSubmitLabel?: string | undefined;
    defaultSuccessMessage?: string | undefined;
}
interface FormRendererProps {
    form: Form;
    translations?: FormRendererTranslations | undefined;
    onSubmitSuccess?: ((id: string) => void) | undefined;
}
declare function FormRenderer({ form, translations, onSubmitSuccess }: FormRendererProps): react_jsx_runtime.JSX.Element;

interface NewsletterSignupProps {
    title?: string | undefined;
    description?: string | undefined;
    buttonLabel?: string | undefined;
    placeholder?: string | undefined;
    namePlaceholder?: string | undefined;
    collectName?: boolean | undefined;
    successMessage?: string | undefined;
    className?: string | undefined;
    onSuccess?: ((email: string) => void) | undefined;
}
declare function NewsletterSignup({ title, description, buttonLabel, placeholder, namePlaceholder, collectName, successMessage, className, onSuccess, }: NewsletterSignupProps): react_jsx_runtime.JSX.Element;

interface NewsletterUnsubscribeProps {
    title?: string | undefined;
    description?: string | undefined;
    buttonLabel?: string | undefined;
    placeholder?: string | undefined;
    /**
     * Shown after a successful submit. Keep it neutral — it must read the same
     * whether or not the address was on the list, so the page can't be used to
     * check whether someone is a subscriber.
     */
    successMessage?: string | undefined;
    /** Optional line under the success message, e.g. "Changed your mind?". */
    successHint?: string | undefined;
    className?: string | undefined;
    onSuccess?: ((email: string) => void) | undefined;
}
/**
 * Self-serve newsletter unsubscribe. The tokenized one-click link inside each
 * issue is still the primary path; this is for people who deleted the email,
 * never received one (an imported address), or just want off the list now.
 */
declare function NewsletterUnsubscribe({ title, description, buttonLabel, placeholder, successMessage, successHint, className, onSuccess, }: NewsletterUnsubscribeProps): react_jsx_runtime.JSX.Element;

/** Minimal, public-safe issue shape this component needs to render. */
interface NewsletterContentIssue {
    subject: string;
    /** Markdown source. */
    content: string;
    sentAt: Date | string | null;
    previewText?: string | null;
}
interface NewsletterContentProps {
    issue: NewsletterContentIssue;
    /** Pre-localized sent date. Falls back to a plain date string when omitted. */
    date?: string | undefined;
}
declare function NewsletterContent({ issue, date }: NewsletterContentProps): react_jsx_runtime.JSX.Element;

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

interface UpdatesFeedTranslations {
    loadingLabel: string;
    emptyMessage: string;
}
interface UpdatesFeedProps {
    /** Slug of the update list to render. */
    listSlug: string;
    /** Max items to fetch. Clamped server-side to 1..100; defaults to 20. */
    limit?: number;
    className?: string;
    /** Bring your own item renderer. Omit for the default title/image/date/body card. */
    renderItem?: (item: UpdateFeedItem) => ReactNode;
    /** Locale for date formatting. Defaults to the visitor's locale. */
    locale?: string;
    translations?: UpdatesFeedTranslations;
}
/**
 * Renders one published update list. The body is markdown, rendered with
 * `marked` — the same renderer `BlogContent` and `NewsletterContent` already
 * use, so a client site styling `.prose` gets consistent output everywhere.
 */
declare function UpdatesFeed({ listSlug, limit, className, renderItem, locale, translations, }: UpdatesFeedProps): react_jsx_runtime.JSX.Element;

export { BLOG_POSTS_PER_PAGE, BlogCard, type BlogCardProps, BlogContent, type BlogContentProps, BlogList, type BlogListProps, type BlogListTranslations, BlogSearch, BusinessJsonLd, FormCard, type FormCardProps, FormRenderer, type FormRendererProps, type FormRendererTranslations, NewsletterContent, type NewsletterContentIssue, type NewsletterContentProps, NewsletterSignup, type NewsletterSignupProps, NewsletterUnsubscribe, type NewsletterUnsubscribeProps, RelatedPosts, type RelatedPostsProps, UpdatesFeed, type UpdatesFeedProps, type UpdatesFeedTranslations };
