import * as react_jsx_runtime from 'react/jsx-runtime';
import { BlogPost, BlogAuthor, BusinessConfig, Form } from '@growth-engine/types';

interface BlogCardProps {
    slug: string;
    title: string;
    content: string;
    heroImageUrl: string | null;
    seoDesc: string | null;
    createdAt: Date | string;
    locale: string;
}
declare function BlogCard({ slug, title, content, heroImageUrl, seoDesc, createdAt, locale }: BlogCardProps): react_jsx_runtime.JSX.Element;

interface BlogContentProps {
    html: string;
    post?: BlogPost;
    author?: BlogAuthor;
    business?: BusinessConfig;
    disableMeta?: boolean;
    disableJsonLd?: boolean;
}
declare function BlogContent({ html, post, author, business, disableMeta, disableJsonLd, }: BlogContentProps): react_jsx_runtime.JSX.Element;

interface BlogListTranslations {
    noPostsMessage: string;
    clearSearchLabel: string;
    searchPlaceholder: string;
}
interface BlogListProps {
    posts: BlogCardProps[];
    locale: string;
    translations: BlogListTranslations;
}
declare function BlogList({ posts, locale, translations }: BlogListProps): react_jsx_runtime.JSX.Element;

declare function BlogSearch({ value, onChange, placeholder, }: {
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
}): react_jsx_runtime.JSX.Element;

interface RelatedPostsProps {
    posts: BlogCardProps[];
    currentSlug: string;
    locale: string;
    heading: string;
}
declare function RelatedPosts({ posts, currentSlug, locale, heading }: RelatedPostsProps): react_jsx_runtime.JSX.Element | null;

declare function BusinessJsonLd({ config }: {
    config: BusinessConfig;
}): react_jsx_runtime.JSX.Element | null;

interface FormCardProps {
    slug: string;
    name: string;
    description: string | null;
    locale: string;
}
declare function FormCard({ slug, name, description, locale }: FormCardProps): react_jsx_runtime.JSX.Element;

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
