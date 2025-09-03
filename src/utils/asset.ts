// src/utils/asset.ts
declare const ASSET_PREFIX: string;
declare const __webpack_public_path__: string | undefined;

export function asset(p: string): string {
  // 1) priorité au préfixe injecté, 2) sinon publicPath runtime, 3) sinon racine
  const base =
    (typeof ASSET_PREFIX !== 'undefined' && ASSET_PREFIX) ||
    (typeof __webpack_public_path__ !== 'undefined' ? __webpack_public_path__ : '/');

  const baseClean = base.endsWith('/') ? base.slice(0, -1) : base;
  const pathClean = p.startsWith('/') ? p.slice(1) : p;

  return `${baseClean}/${pathClean}`;
}

export default asset;
