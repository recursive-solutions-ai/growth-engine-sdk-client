"use client";

// src/provider.tsx
import { createContext, useContext, useEffect } from "react";

// src/client.ts
var BASE_PATH = "/api/rs";
async function sdkFetch(path, options) {
  const url = `${BASE_PATH}${path}`;
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
}

// src/version.ts
var SDK_VERSION = "0.1.0";

// src/provider.tsx
import { jsx } from "react/jsx-runtime";
var GrowthEngineContext = createContext({});
function matchesPattern(version, pattern) {
  const regex = new RegExp("^" + pattern.replace(/\./g, "\\.").replace(/x/g, "\\d+") + "$");
  return regex.test(version);
}
function GrowthEngineProvider({
  children,
  locale,
  tenantSlug
}) {
  useEffect(() => {
    let cancelled = false;
    async function checkVersion() {
      const res = await sdkFetch("/sdk-status");
      if (cancelled || res.error) return;
      const manifest = res.data;
      const isDeprecated = manifest.deprecated.some((p) => matchesPattern(SDK_VERSION, p));
      const isUnsupported = manifest.unsupported.some((p) => matchesPattern(SDK_VERSION, p));
      if (isUnsupported) {
        console.error(
          `[GrowthEngine] SDK version ${SDK_VERSION} is unsupported. Please upgrade to ${manifest.latest}.`
        );
      } else if (isDeprecated) {
        console.warn(
          `[GrowthEngine] SDK version ${SDK_VERSION} is deprecated. Please upgrade to ${manifest.latest}.`
        );
      }
    }
    void checkVersion();
    return () => {
      cancelled = true;
    };
  }, []);
  return /* @__PURE__ */ jsx(GrowthEngineContext.Provider, { value: { locale, tenantSlug }, children });
}
function useGrowthEngine() {
  return useContext(GrowthEngineContext);
}

// src/hooks/useContent.ts
import { useState, useEffect as useEffect2 } from "react";
function useContent(type) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect2(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      const res = await sdkFetch(`/content?type=${type}`);
      if (cancelled) return;
      if (res.error) {
        setError(res.error);
      } else {
        setPosts(res.data);
      }
      setLoading(false);
    }
    void load();
    return () => {
      cancelled = true;
    };
  }, [type]);
  return { posts, loading, error };
}
async function fetchBlog(slug) {
  const res = await sdkFetch(`/content?type=blog&slug=${encodeURIComponent(slug)}`);
  return res.error ? null : res.data;
}
async function getSocialPosts(platform) {
  const res = await sdkFetch(
    `/content?type=social&platform=${encodeURIComponent(platform)}`
  );
  return res.error ? [] : res.data;
}

// src/hooks/useBusinessConfig.ts
import { useState as useState2, useEffect as useEffect3 } from "react";
function useBusinessConfig() {
  const [config, setConfig] = useState2(null);
  const [loading, setLoading] = useState2(true);
  const [error, setError] = useState2(null);
  useEffect3(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      const res = await sdkFetch("/config");
      if (cancelled) return;
      if (res.error) {
        setError(res.error);
      } else {
        setConfig(res.data);
      }
      setLoading(false);
    }
    void load();
    return () => {
      cancelled = true;
    };
  }, []);
  return { config, loading, error };
}
async function getHours() {
  const res = await sdkFetch("/config");
  return res.error ? null : res.data.hours;
}
async function getContactInfo() {
  const res = await sdkFetch("/config");
  return res.error ? null : res.data.contact;
}

// src/hooks/useForms.ts
import { useState as useState3, useEffect as useEffect4 } from "react";
function useForms() {
  const [forms, setForms] = useState3([]);
  const [loading, setLoading] = useState3(true);
  const [error, setError] = useState3(null);
  useEffect4(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      const res = await sdkFetch("/forms?action=list");
      if (cancelled) return;
      if (res.error) {
        setError(res.error);
      } else {
        setForms(res.data);
      }
      setLoading(false);
    }
    void load();
    return () => {
      cancelled = true;
    };
  }, []);
  return { forms, loading, error };
}
function useForm(slug) {
  const [form, setForm] = useState3(null);
  const [loading, setLoading] = useState3(true);
  const [error, setError] = useState3(null);
  useEffect4(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      const res = await sdkFetch(
        `/forms?action=get&slug=${encodeURIComponent(slug)}`
      );
      if (cancelled) return;
      if (res.error) {
        setError(res.error);
      } else {
        setForm(res.data);
      }
      setLoading(false);
    }
    void load();
    return () => {
      cancelled = true;
    };
  }, [slug]);
  return { form, loading, error };
}
async function submitForm(slug, data) {
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

// src/hooks/useSDKStatus.ts
import { useState as useState4, useEffect as useEffect5 } from "react";
function useSDKStatus() {
  const [manifest, setManifest] = useState4(null);
  const [loading, setLoading] = useState4(true);
  const [error, setError] = useState4(null);
  useEffect5(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      const res = await sdkFetch("/sdk-status");
      if (cancelled) return;
      if (res.error) {
        setError(res.error);
      } else {
        setManifest(res.data);
      }
      setLoading(false);
    }
    void load();
    return () => {
      cancelled = true;
    };
  }, []);
  return { manifest, loading, error };
}

// src/hooks/useJobStatus.ts
import { useState as useState5, useEffect as useEffect6, useCallback } from "react";
function useJobStatus(jobId) {
  const [job, setJob] = useState5(null);
  const [loading, setLoading] = useState5(false);
  const [error, setError] = useState5(null);
  const load = useCallback(async () => {
    if (!jobId) return;
    setLoading(true);
    const res = await sdkFetch(`/jobs/${encodeURIComponent(jobId)}`);
    if (res.error) {
      setError(res.error);
    } else {
      setJob(res.data);
    }
    setLoading(false);
  }, [jobId]);
  useEffect6(() => {
    void load();
  }, [load]);
  return { job, loading, error, refresh: load };
}

// src/triggers/triggerBlogGen.ts
async function triggerBlogGen(payload) {
  const res = await sdkFetch("/jobs", {
    method: "POST",
    body: JSON.stringify({ type: "blog.generate", payload })
  });
  if (res.error) {
    throw new Error(res.error);
  }
  return res.data;
}

// src/triggers/triggerSocialSync.ts
async function triggerSocialSync(platforms) {
  const res = await sdkFetch("/jobs", {
    method: "POST",
    body: JSON.stringify({ type: "social.sync", payload: { platforms } })
  });
  if (res.error) {
    throw new Error(res.error);
  }
  return res.data;
}

// src/triggers/onAnalyticsEvent.ts
async function onAnalyticsEvent(event) {
  await sdkFetch("/analytics", {
    method: "POST",
    body: JSON.stringify(event)
  });
}
export {
  GrowthEngineProvider,
  SDK_VERSION,
  fetchBlog,
  getContactInfo,
  getHours,
  getSocialPosts,
  onAnalyticsEvent,
  sdkFetch,
  submitForm,
  triggerBlogGen,
  triggerSocialSync,
  useBusinessConfig,
  useContent,
  useForm,
  useForms,
  useGrowthEngine,
  useJobStatus,
  useSDKStatus
};
//# sourceMappingURL=index.js.map