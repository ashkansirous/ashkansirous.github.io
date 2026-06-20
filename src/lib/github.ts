/**
 * Build-time GitHub data for the public-projects section.
 *
 * We curate which repos are featured (per the repo-selection rubric in CLAUDE.md)
 * and fetch their live metadata so "current state" stays fresh on every deploy.
 * Falls back to cached values if the API is unreachable, so the build never breaks.
 */

const OWNER = 'ashkansirous';

export type ProjectStatus = 'Active' | 'WIP';

export interface FeaturedProject {
  name: string;
  status: ProjectStatus;
  /** Cached fallback used when the live API call fails. */
  description: string;
  language: string;
  stars: number;
  url: string;
  /** ISO date of the last push, or null when unknown. */
  pushedAt: string | null;
}

interface LiveRepo {
  description: string | null;
  language: string | null;
  stargazers_count: number;
  html_url: string;
  pushed_at: string;
}

const FEATURED: Array<Pick<FeaturedProject, 'name' | 'status' | 'description' | 'language' | 'stars' | 'url' | 'pushedAt'>> = [
  {
    name: 'ClaudeSkills',
    status: 'Active',
    description: 'A public library of reusable Claude Code skills, run with a real PR and project-board workflow.',
    language: 'PowerShell',
    stars: 3,
    url: `https://github.com/${OWNER}/ClaudeSkills`,
    pushedAt: null,
  },
  {
    name: 'AlphaAgent',
    status: 'WIP',
    description: 'Building in public — an AI agent at scaffold stage, developed with a strict vertical-slice method.',
    language: 'C#',
    stars: 0,
    url: `https://github.com/${OWNER}/AlphaAgent`,
    pushedAt: null,
  },
];

async function fetchRepo(name: string): Promise<LiveRepo | null> {
  try {
    const headers: Record<string, string> = {
      Accept: 'application/vnd.github+json',
      'User-Agent': OWNER,
    };
    const token = process.env.GITHUB_TOKEN;
    if (token) headers.Authorization = `Bearer ${token}`;

    const res = await fetch(`https://api.github.com/repos/${OWNER}/${name}`, { headers });
    if (!res.ok) return null;
    return (await res.json()) as LiveRepo;
  } catch {
    return null;
  }
}

export async function getFeaturedProjects(): Promise<FeaturedProject[]> {
  return Promise.all(
    FEATURED.map(async (project) => {
      const live = await fetchRepo(project.name);
      if (!live) return project;
      return {
        ...project,
        description: live.description ?? project.description,
        language: live.language ?? project.language,
        stars: live.stargazers_count,
        url: live.html_url,
        pushedAt: live.pushed_at,
      };
    }),
  );
}

/** Open-source contributions (forks with real upstream PRs) — a strip, not featured cards. */
export const CONTRIBUTIONS: Array<{ name: string; detail: string; url: string }> = [
  { name: 'SimpleIdServer (SCIM)', detail: 'SCIM 2.0 — fixes & enhancements', url: 'https://github.com/simpleidserver/SimpleIdServer' },
  { name: 'Microsoft SCIM', detail: 'reference SCIM — improvements', url: 'https://github.com/AzureAD/SCIMReferenceCode' },
  { name: 'jpglens', detail: 'performance optimisations', url: 'https://github.com/abhinaba-ghosh/jpglens' },
];

/** Compact "updated N ago" label from an ISO date, computed at build time. */
export function relativeUpdated(iso: string | null): string | null {
  if (!iso) return null;
  const then = new Date(iso).getTime();
  const days = Math.round((Date.now() - then) / 86_400_000);
  if (days <= 1) return 'updated today';
  if (days < 30) return `updated ${days}d ago`;
  if (days < 365) return `updated ${Math.round(days / 30)}mo ago`;
  return `updated ${Math.round(days / 365)}y ago`;
}
