import { inject } from '@angular/core';
import { InMemoryCache } from '@apollo/client/core';
import { provideApollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { environment } from '../../environments/environment';

export const provideGraphqlConfig = () => {
  const { graphqlUri } = environment;

  return provideApollo(() => {
    const httpLink = inject(HttpLink);

    return {
      link: httpLink.create({ uri: graphqlUri }),
      cache: new InMemoryCache({}),
    };
  });
};
