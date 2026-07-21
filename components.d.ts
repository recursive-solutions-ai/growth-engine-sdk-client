import * as react_jsx_runtime from 'react/jsx-runtime';
import { BlogPost, BlogAuthor, BusinessConfig, Form } from '@growth-engine/types';

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
}
declare function BlogList({ posts, locale, localePrefix, translations, authors }: BlogListProps): react_jsx_runtime.JSX.Element;

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

export { BlogCard, type BlogCardProps, BlogContent, type BlogContentProps, BlogList, type BlogListProps, type BlogListTranslations, BlogSearch, BusinessJsonLd, FormCard, type FormCardProps, FormRenderer, type FormRendererProps, type FormRendererTranslations, RelatedPosts, type RelatedPostsProps };
