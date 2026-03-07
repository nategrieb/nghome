export type BrandShape = "triangle" | "circle";

export type AppDefinition = {
  key: "menu" | "natestagram";
  name: string;
  description: string;
  iconShape: BrandShape;
  iconLabel: string;
  url: string | null;
};

export type LaunchOptions = {
  returnTo?: string;
  token?: string;
};

function sanitizeExternalUrl(value?: string): string | null {
  if (!value) {
    return null;
  }

  try {
    const parsed = new URL(value);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      return null;
    }

    return parsed.toString();
  } catch {
    return null;
  }
}

export const apps: AppDefinition[] = [
  {
    key: "menu",
    name: "THE MENU",
    description: "Launch your command stream, workflows, and operational tools.",
    iconShape: "triangle",
    iconLabel: "THE MENU brand mark",
    url: sanitizeExternalUrl(process.env.NEXT_PUBLIC_APP_URL_MENU),
  },
  {
    key: "natestagram",
    name: "NATESTEGRAM",
    description: "Open your editorial photo surface and timeline experience.",
    iconShape: "circle",
    iconLabel: "NATESTEGRAM brand mark",
    url: sanitizeExternalUrl(process.env.NEXT_PUBLIC_APP_URL_NATESTEGRAM),
  },
];

export function buildLaunchUrl(app: AppDefinition, options?: LaunchOptions): string | null {
  if (!app.url) {
    return null;
  }

  const target = new URL(app.url);

  if (options?.returnTo) {
    target.searchParams.set("returnTo", options.returnTo);
  }

  // Phase 2: replace this placeholder with a signed short-lived SSO token.
  if (options?.token) {
    target.searchParams.set("sso", options.token);
  }

  return target.toString();
}
