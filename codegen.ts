import type { CodegenConfig } from '@graphql-codegen/cli';
import { environment } from './src/environments/environment.development';

const { graphqlUri } = environment;

const config: CodegenConfig = {
  schema: graphqlUri,
  documents: './src/app/graphql/*.graphql',
  generates: {
    './src/app/graphql/generated.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-apollo-angular',
      ],
    },
  },
};

export default config;
