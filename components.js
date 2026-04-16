"use client";

// src/components/blog/BlogCard.tsx
import Link from "next/link";
import { jsx, jsxs } from "react/jsx-runtime";
function formatDate(date, locale) {
  return new Date(date).toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}
function BlogCard({ slug, title, content, heroImageUrl, seoDesc, createdAt, locale }) {
  const date = formatDate(createdAt, locale);
  const isoDate = new Date(createdAt).toISOString();
  const preview = seoDesc ?? content.replace(/<[^>]*>/g, "").slice(0, 160) + "...";
  return /* @__PURE__ */ jsx("article", { itemScope: true, itemType: "https://schema.org/BlogPosting", children: /* @__PURE__ */ jsxs(Link, { href: `/${locale}/blog/${slug}`, className: "card bg-base-100 shadow-sm border border-base-200 hover:shadow-md transition-shadow group", children: [
    heroImageUrl && /* @__PURE__ */ jsx("figure", { className: "aspect-video overflow-hidden", children: /* @__PURE__ */ jsx(
      "img",
      {
        src: heroImageUrl,
        alt: title,
        className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      }
    ) }),
    /* @__PURE__ */ jsxs("div", { className: "card-body", children: [
      /* @__PURE__ */ jsx("time", { className: "text-xs text-base-content/50", dateTime: isoDate, children: date }),
      /* @__PURE__ */ jsx("h2", { className: "card-title text-lg group-hover:text-primary transition-colors", children: title }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-base-content/70 line-clamp-3", children: preview })
    ] })
  ] }) });
}

// src/components/blog/BlogContent.tsx
import { marked } from "marked";

// src/seo/json-ld.ts
function omitNulls(obj) {
  const result = {};
  for (const [key, value] of Object.entries(obj)) {
    if (value != null) {
      result[key] = value;
    }
  }
  return result;
}
function buildBlogPostingLd(post, author, business) {
  const ld = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    ...omitNulls({
      headline: post.seoTitle ?? post.title,
      description: post.seoDesc,
      image: post.heroImageUrl,
      datePublished: post.publishedAt ? new Date(post.publishedAt).toISOString() : null,
      dateModified: new Date(post.updatedAt).toISOString(),
      inLanguage: post.language
    })
  };
  if (author) {
    ld.author = omitNulls({
      "@type": "Person",
      name: author.name,
      url: author.websiteUrl,
      image: author.avatarUrl
    });
  }
  if (business?.name) {
    ld.publisher = omitNulls({
      "@type": "Organization",
      name: business.name,
      url: business.website
    });
  }
  return ld;
}
function buildLocalBusinessLd(config) {
  if (!config.name) return null;
  const ld = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    ...omitNulls({
      name: config.name,
      description: config.description,
      telephone: config.phone,
      email: config.email,
      url: config.website
    })
  };
  if (config.address && typeof config.address === "object") {
    ld.address = {
      "@type": "PostalAddress",
      ...config.address
    };
  }
  return ld;
}

// src/seo/JsonLd.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
function JsonLd({ data }) {
  return /* @__PURE__ */ jsx2(
    "script",
    {
      type: "application/ld+json",
      dangerouslySetInnerHTML: { __html: JSON.stringify(data) }
    }
  );
}

// src/seo/MetaTags.tsx
import Head from "next/head";
import { jsx as jsx3, jsxs as jsxs2 } from "react/jsx-runtime";
function MetaTags({ title, description, image, url, type = "article" }) {
  return /* @__PURE__ */ jsxs2(Head, { children: [
    title && /* @__PURE__ */ jsx3("meta", { property: "og:title", content: title }),
    description && /* @__PURE__ */ jsx3("meta", { property: "og:description", content: description }),
    image && /* @__PURE__ */ jsx3("meta", { property: "og:image", content: image }),
    url && /* @__PURE__ */ jsx3("meta", { property: "og:url", content: url }),
    /* @__PURE__ */ jsx3("meta", { property: "og:type", content: type }),
    /* @__PURE__ */ jsx3("meta", { name: "twitter:card", content: image ? "summary_large_image" : "summary" }),
    title && /* @__PURE__ */ jsx3("meta", { name: "twitter:title", content: title }),
    description && /* @__PURE__ */ jsx3("meta", { name: "twitter:description", content: description }),
    image && /* @__PURE__ */ jsx3("meta", { name: "twitter:image", content: image })
  ] });
}

// src/components/blog/BlogContent.tsx
import { jsx as jsx4, jsxs as jsxs3 } from "react/jsx-runtime";
function BlogContent({
  html,
  post,
  author,
  business,
  disableMeta,
  disableJsonLd
}) {
  const jsonLd = post && !disableJsonLd ? buildBlogPostingLd(post, author, business) : null;
  return /* @__PURE__ */ jsxs3("article", { itemScope: true, itemType: "https://schema.org/BlogPosting", children: [
    jsonLd && /* @__PURE__ */ jsx4(JsonLd, { data: jsonLd }),
    post && !disableMeta && /* @__PURE__ */ jsx4(
      MetaTags,
      {
        title: post.seoTitle ?? post.title,
        description: post.seoDesc,
        image: post.heroImageUrl,
        type: "article"
      }
    ),
    /* @__PURE__ */ jsx4(
      "div",
      {
        className: "prose prose-lg max-w-none",
        dangerouslySetInnerHTML: { __html: marked.parse(html, { async: false }) }
      }
    )
  ] });
}

// src/components/blog/BlogList.tsx
import { useState, useMemo } from "react";

// src/components/blog/BlogSearch.tsx
import { jsx as jsx5, jsxs as jsxs4 } from "react/jsx-runtime";
function BlogSearch({
  value,
  onChange,
  placeholder
}) {
  return /* @__PURE__ */ jsx5("div", { className: "mb-8", children: /* @__PURE__ */ jsx5("search", { children: /* @__PURE__ */ jsxs4("div", { className: "relative max-w-md mx-auto", children: [
    /* @__PURE__ */ jsx5(
      "input",
      {
        type: "search",
        role: "searchbox",
        "aria-label": "Search blog posts",
        placeholder,
        value,
        onChange: (e) => onChange(e.target.value),
        className: "input input-bordered w-full pl-10"
      }
    ),
    /* @__PURE__ */ jsx5(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 24 24",
        strokeWidth: 1.5,
        stroke: "currentColor",
        className: "w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40",
        "aria-hidden": "true",
        children: /* @__PURE__ */ jsx5(
          "path",
          {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607z"
          }
        )
      }
    )
  ] }) }) });
}

// src/components/blog/BlogList.tsx
import { jsx as jsx6, jsxs as jsxs5 } from "react/jsx-runtime";
var POSTS_PER_PAGE = 9;
function BlogList({ posts, locale, translations }) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const filtered = useMemo(() => {
    if (!search.trim()) return posts;
    const q = search.toLowerCase();
    return posts.filter(
      (p) => p.title.toLowerCase().includes(q) || p.seoDesc && p.seoDesc.toLowerCase().includes(q)
    );
  }, [posts, search]);
  const totalPages = Math.ceil(filtered.length / POSTS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);
  return /* @__PURE__ */ jsxs5("section", { "aria-label": "Blog posts", children: [
    /* @__PURE__ */ jsx6(
      BlogSearch,
      {
        value: search,
        onChange: (v) => {
          setSearch(v);
          setPage(1);
        },
        placeholder: translations.searchPlaceholder
      }
    ),
    paginated.length === 0 ? /* @__PURE__ */ jsxs5("div", { className: "text-center py-16 text-base-content/50", children: [
      /* @__PURE__ */ jsx6("p", { className: "text-lg", children: translations.noPostsMessage }),
      search && /* @__PURE__ */ jsx6(
        "button",
        {
          onClick: () => setSearch(""),
          className: "btn btn-ghost btn-sm mt-2",
          children: translations.clearSearchLabel
        }
      )
    ] }) : /* @__PURE__ */ jsx6("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: paginated.map((post) => /* @__PURE__ */ jsx6(
      BlogCard,
      {
        ...post,
        locale
      },
      post.slug
    )) }),
    totalPages > 1 && /* @__PURE__ */ jsx6("div", { className: "flex justify-center mt-8", children: /* @__PURE__ */ jsxs5("nav", { "aria-label": "Blog pagination", className: "join", children: [
      /* @__PURE__ */ jsx6(
        "button",
        {
          className: "join-item btn btn-sm",
          disabled: page <= 1,
          onClick: () => setPage(page - 1),
          "aria-label": "Previous page",
          children: "\xAB"
        }
      ),
      Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => /* @__PURE__ */ jsx6(
        "button",
        {
          className: `join-item btn btn-sm ${p === page ? "btn-active" : ""}`,
          onClick: () => setPage(p),
          "aria-label": `Page ${p}`,
          "aria-current": p === page ? "page" : void 0,
          children: p
        },
        p
      )),
      /* @__PURE__ */ jsx6(
        "button",
        {
          className: "join-item btn btn-sm",
          disabled: page >= totalPages,
          onClick: () => setPage(page + 1),
          "aria-label": "Next page",
          children: "\xBB"
        }
      )
    ] }) })
  ] });
}

// src/components/blog/RelatedPosts.tsx
import { jsx as jsx7, jsxs as jsxs6 } from "react/jsx-runtime";
function RelatedPosts({ posts, currentSlug, locale, heading }) {
  const related = posts.filter((p) => p.slug !== currentSlug).slice(0, 3);
  if (related.length === 0) return null;
  return /* @__PURE__ */ jsxs6("aside", { "aria-label": "Related posts", className: "mt-16", children: [
    /* @__PURE__ */ jsx7("h2", { className: "text-2xl font-bold mb-6", children: heading }),
    /* @__PURE__ */ jsx7("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: related.map((post) => /* @__PURE__ */ jsx7(
      BlogCard,
      {
        ...post,
        locale
      },
      post.slug
    )) })
  ] });
}

// src/seo/BusinessJsonLd.tsx
import { jsx as jsx8 } from "react/jsx-runtime";
function BusinessJsonLd({ config }) {
  const ld = buildLocalBusinessLd(config);
  if (!ld) return null;
  return /* @__PURE__ */ jsx8(JsonLd, { data: ld });
}

// src/components/forms/FormCard.tsx
import Link2 from "next/link";
import { jsx as jsx9, jsxs as jsxs7 } from "react/jsx-runtime";
function FormCard({ slug, name, description, locale }) {
  return /* @__PURE__ */ jsx9(
    Link2,
    {
      href: `/${locale}/forms/${slug}`,
      className: "card bg-base-100 border border-base-200 shadow-sm hover:shadow-md transition-shadow",
      children: /* @__PURE__ */ jsxs7("div", { className: "card-body", children: [
        /* @__PURE__ */ jsx9("h2", { className: "card-title", children: name }),
        description && /* @__PURE__ */ jsx9("p", { className: "text-base-content/60", children: description })
      ] })
    }
  );
}

// src/components/forms/FormRenderer.tsx
import { useState as useState3, useEffect as useEffect2 } from "react";

// src/hooks/useForms.ts
import { useState as useState2, useEffect, useMemo as useMemo2 } from "react";

// src/client.ts
var BASE_PATH = "/api/rs";
async function sdkFetch(path, options) {
  const url = `${BASE_PATH}${path}`;
  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers
      }
    });
    if (!res.ok) {
      return {
        data: null,
        error: `Request failed with status ${res.status}`,
        status: res.status
      };
    }
    const data = await res.json();
    return { data, error: null, status: res.status };
  } catch {
    return {
      data: null,
      error: "SDK unavailable",
      status: 0
    };
  }
}

// src/lib/buildFormSchema.ts
import { z } from "zod";
function buildFormSchema(fields) {
  const shape = {};
  for (const field of fields) {
    let schema;
    switch (field.type) {
      case "email":
        schema = z.string().email();
        break;
      case "url":
        schema = z.string().url();
        break;
      case "number":
        schema = z.coerce.number();
        break;
      case "checkbox":
        schema = z.boolean();
        break;
      case "select":
        if (field.options && field.options.length > 0) {
          schema = z.enum(field.options);
        } else {
          schema = z.string();
        }
        break;
      default:
        schema = z.string();
        break;
    }
    if (field.required) {
      if (field.type === "text" || field.type === "tel" || field.type === "textarea") {
        schema = z.string().min(1);
      }
    } else {
      schema = schema.optional();
    }
    shape[field.name] = schema;
  }
  return z.object(shape);
}

// src/hooks/useForms.ts
async function submitForm(slug, data) {
  const formRes = await sdkFetch(
    `/forms?action=get&slug=${encodeURIComponent(slug)}`
  );
  if (formRes.error || !formRes.data) {
    return { ok: false, error: formRes.error ?? "Form not found" };
  }
  const schema = buildFormSchema(formRes.data.fields);
  const result = schema.safeParse(data);
  if (!result.success) {
    return { ok: false, error: "Validation failed", validationErrors: result.error.issues };
  }
  const res = await sdkFetch(
    `/forms?action=submit&slug=${encodeURIComponent(slug)}`,
    {
      method: "POST",
      body: JSON.stringify({ data })
    }
  );
  if (res.error) {
    return { ok: false, error: res.error };
  }
  return res.data;
}

// src/components/forms/FormRenderer.tsx
import { jsx as jsx10, jsxs as jsxs8 } from "react/jsx-runtime";
function FormRenderer({ form, translations, onSubmitSuccess }) {
  const [formData, setFormData] = useState3({});
  const [submitting, setSubmitting] = useState3(false);
  const [submitted, setSubmitted] = useState3(false);
  const [error, setError] = useState3("");
  const [initialized, setInitialized] = useState3(false);
  useEffect2(() => {
    if (initialized) return;
    const initial = {};
    for (const field of form.fields) {
      if (field.type === "checkbox") {
        initial[field.name] = false;
      } else {
        initial[field.name] = "";
      }
    }
    setFormData(initial);
    setInitialized(true);
  }, [form.fields, initialized]);
  function updateField(name, value) {
    setFormData((prev) => ({ ...prev, [name]: value }));
  }
  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const result = await submitForm(form.slug, formData);
      if (!result.ok) {
        if (result.validationErrors) {
          setError(result.validationErrors.map((ve) => ve.message).join(", "));
        } else {
          setError(result.error ?? "Something went wrong");
        }
        return;
      }
      setSubmitted(true);
      if (result.id && onSubmitSuccess) {
        onSubmitSuccess(result.id);
      }
    } catch {
      setError("Failed to submit. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }
  if (submitted) {
    const settings2 = typeof form.settings === "string" ? JSON.parse(form.settings) : form.settings;
    return /* @__PURE__ */ jsxs8("div", { className: "mx-auto max-w-lg rounded-xl border bg-base-100 p-8 text-center shadow-lg", children: [
      /* @__PURE__ */ jsx10("div", { className: "mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-success/20", children: /* @__PURE__ */ jsx10("svg", { className: "h-6 w-6 text-success", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx10("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M5 13l4 4L19 7" }) }) }),
      /* @__PURE__ */ jsx10("h2", { className: "text-xl font-semibold", children: settings2?.successMessage ?? translations?.defaultSuccessMessage ?? "Thank you for your submission!" })
    ] });
  }
  const sortedFields = [...form.fields].sort((a, b) => a.order - b.order);
  const settings = typeof form.settings === "string" ? JSON.parse(form.settings) : form.settings;
  return /* @__PURE__ */ jsxs8("div", { className: "mx-auto max-w-lg", children: [
    /* @__PURE__ */ jsx10("h1", { className: "text-3xl font-bold", children: form.name }),
    form.description && /* @__PURE__ */ jsx10("p", { className: "mt-2 text-base-content/60", children: form.description }),
    /* @__PURE__ */ jsxs8("form", { onSubmit: handleSubmit, className: "mt-8 space-y-4", children: [
      sortedFields.map((field) => /* @__PURE__ */ jsxs8("div", { className: "form-control w-full", children: [
        /* @__PURE__ */ jsx10("label", { htmlFor: field.name, className: "label", children: /* @__PURE__ */ jsxs8("span", { className: "label-text", children: [
          field.label,
          field.required && /* @__PURE__ */ jsx10("span", { className: "ml-1 text-error", children: "*" })
        ] }) }),
        field.type === "textarea" ? /* @__PURE__ */ jsx10(
          "textarea",
          {
            id: field.name,
            required: field.required,
            placeholder: field.placeholder,
            rows: 4,
            value: String(formData[field.name] ?? ""),
            onChange: (e) => updateField(field.name, e.target.value),
            className: "textarea textarea-bordered w-full"
          }
        ) : field.type === "select" ? /* @__PURE__ */ jsxs8(
          "select",
          {
            id: field.name,
            required: field.required,
            value: String(formData[field.name] ?? ""),
            onChange: (e) => updateField(field.name, e.target.value),
            className: "select select-bordered w-full",
            children: [
              /* @__PURE__ */ jsx10("option", { value: "", children: field.placeholder ?? "Select..." }),
              (field.options ?? []).map((opt) => /* @__PURE__ */ jsx10("option", { value: opt, children: opt }, opt))
            ]
          }
        ) : field.type === "checkbox" ? /* @__PURE__ */ jsxs8("label", { className: "label cursor-pointer justify-start gap-3", children: [
          /* @__PURE__ */ jsx10(
            "input",
            {
              type: "checkbox",
              id: field.name,
              required: field.required,
              checked: Boolean(formData[field.name]),
              onChange: (e) => updateField(field.name, e.target.checked),
              className: "checkbox"
            }
          ),
          /* @__PURE__ */ jsx10("span", { className: "label-text", children: field.placeholder })
        ] }) : /* @__PURE__ */ jsx10(
          "input",
          {
            type: field.type,
            id: field.name,
            required: field.required,
            placeholder: field.placeholder,
            value: String(formData[field.name] ?? ""),
            onChange: (e) => updateField(field.name, e.target.value),
            className: "input input-bordered w-full"
          }
        )
      ] }, field.name)),
      error && /* @__PURE__ */ jsx10("div", { className: "alert alert-error", children: /* @__PURE__ */ jsx10("span", { children: error }) }),
      /* @__PURE__ */ jsx10(
        "button",
        {
          type: "submit",
          disabled: submitting,
          className: "btn btn-primary w-full",
          children: submitting ? translations?.submittingLabel ?? "Submitting..." : settings?.submitButtonText ?? translations?.defaultSubmitLabel ?? "Submit"
        }
      )
    ] })
  ] });
}
export {
  BlogCard,
  BlogContent,
  BlogList,
  BlogSearch,
  BusinessJsonLd,
  FormCard,
  FormRenderer,
  RelatedPosts
};
//# sourceMappingURL=components.js.map