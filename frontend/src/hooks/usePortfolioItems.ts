import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Portfolio } from '../backend';

export function usePortfolioItems() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<Portfolio[]>({
    queryKey: ['portfolioItems'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getPortfolioItems();
    },
    enabled: !!actor && !actorFetching,
    staleTime: 1000 * 30, // 30 seconds
  });
}
