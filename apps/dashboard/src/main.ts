import { setRemoteUrlResolver } from '@nx/angular/mf';

const resolveRemoteUrls =
  (remotes: Record<string, string>) => (name: string) => {
    return remotes[name];
  };

fetch('/assets/module-federation.manifest.json')
  .then((res) => res.json())
  .then((definitions) => setRemoteUrlResolver(resolveRemoteUrls(definitions)))
  .then(() => import('./bootstrap').catch((err) => console.error(err)));
