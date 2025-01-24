import manifest, { generate } from "$lib/manifest";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  return { manifest: await generate() };
};
