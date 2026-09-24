/**
 * Only Vercel's production environment hides drafts. Preview deployments and local
 * development (where VERCEL_ENV is undefined) show everything so it can be reviewed.
 */
export function isProductionBuild(): boolean {
  return process.env.VERCEL_ENV === "production"
}
