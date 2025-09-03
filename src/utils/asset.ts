// Utilitaire pour préfixer correctement les URLs d'assets (images, PDF, etc.)
// Il déduit le "base path" à partir du publicPath de webpack (en mode 'auto')
// et retombe proprement sur le premier segment du pathname si besoin.

// Déclaration pour TypeScript : variable globale injectée par webpack
// (elle existe à l'exécution quand publicPath === 'auto')
declare const __webpack_public_path__: string | undefined;

function computeBasePath(): string {
  try {
    // Si webpack a déterminé le public path à l'exécution (ex: ".../CV-Axel-Maillot/assets/")
    const wpp = typeof __webpack_public_path__ === 'string' ? __webpack_public_path__ : '';
    if (wpp) {
      const u = new URL(wpp, window.location.origin);
      // On retire le suffixe "/assets/" si présent et la barre de fin
      return u.pathname.replace(/\/assets\/?$/, '').replace(/\/$/, '');
    }
  } catch {
    // ignore
  }

  // Fallback simple : si le site est servi sous "/<repo>/...", on récupère le 1er segment
  // Ex: "/CV-Axel-Maillot/..." -> "/CV-Axel-Maillot"
  const m = window.location.pathname.match(/^\/[^/]+/);
  return m ? m[0] : '';
}

// Base path calculé une fois
export const basePath = computeBasePath();

// Construit l'URL d'un asset statique (relatif à la racine du build)
export function asset(relPath: string): string {
  if (!relPath) return relPath;
  // On évite les doubles slash et on gère les relPaths déjà relatifs
  const clean = relPath.replace(/^\/+/, ''); // enlève / initial si présent
  return basePath ? `${basePath}/${clean}` : clean;
}