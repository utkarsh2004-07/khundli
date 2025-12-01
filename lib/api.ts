export async function apiFetch(path: string, options: any = {}) {
  const token = typeof window !== "undefined"
    ? localStorage.getItem("tk_token")
    : null;

  const headers = {
    ...(options.headers || {}),
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };

  const apiBase = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8787';

  const res = await fetch(apiBase + path, {
    ...options,
    headers
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(error.error || 'API error');
  }

  return res.json();
}

export const auth = {
  signup: (data: any) => apiFetch('/api/auth/signup', {
    method: 'POST',
    body: JSON.stringify(data)
  }),

  login: (data: any) => apiFetch('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(data)
  }),

  getMe: () => apiFetch('/api/me'),

  logout: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("tk_token");
    }
  }
};

export const predictions = {
  create: (data: any) => apiFetch('/api/predict', {
    method: 'POST',
    body: JSON.stringify(data)
  }),

  getAll: () => apiFetch('/api/predictions'),

  getById: (id: string) => apiFetch(`/api/predictions/${id}`)
};

export const premium = {
  analyzeResume: (data: any) => apiFetch('/api/resume-analysis', {
    method: 'POST',
    body: JSON.stringify(data)
  }),

  optimizeResume: (resumeText: string, jobDescription?: string) => apiFetch('/api/resume-optimize', {
    method: 'POST',
    body: JSON.stringify({ resumeText, jobDescription })
  }),

  buildResume: (data: any) => apiFetch('/api/resume-builder', {
    method: 'POST',
    body: JSON.stringify(data)
  }),

  checkATS: (resumeText: string) => apiFetch('/api/ats-check', {
    method: 'POST',
    body: JSON.stringify({ resumeText })
  }),

  battle: (friendData: any) => apiFetch('/api/battle', {
    method: 'POST',
    body: JSON.stringify({ friendData })
  }),

  analyzeCompany: (targetCompanies: string[], resumeText?: string) => apiFetch('/api/company-analysis', {
    method: 'POST',
    body: JSON.stringify({ targetCompanies, resumeText })
  }),

  resumeAnalyses: {
    save: (data: any) => apiFetch('/api/resume-analyses', {
      method: 'POST',
      body: JSON.stringify(data)
    }),
    getAll: () => apiFetch('/api/resume-analyses'),
    getById: (id: string) => apiFetch(`/api/resume-analyses/${id}`)
  }
};