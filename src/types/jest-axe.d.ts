declare module "jest-axe" {
  export function axe(
    html: HTMLElement | string,
    options?: unknown,
  ): Promise<{
    violations: unknown[];
  }>;
}
