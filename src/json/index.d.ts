declare module '*/collection.json' {
  interface Manifest {
    '@type': 'sc:Collection';
    '@id': string;
    label: string;
  }

  interface CollectionJson {
    '@context': string;
    '@type': 'sc:Collection';
    '@id': string;
    label: string;
    attribution: string;
    description: string;
    manifests: Manifest[];
  }
}
