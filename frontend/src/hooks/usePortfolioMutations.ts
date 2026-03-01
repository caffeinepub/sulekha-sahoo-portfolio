import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { ExternalBlob } from '../backend';
import type { Portfolio } from '../backend';

interface AddItemParams {
  title: string;
  category: string;
  bytes: Uint8Array<ArrayBuffer>;
  onProgress?: (pct: number) => void;
}

interface ReplaceItemParams {
  item: Portfolio;
  bytes: Uint8Array<ArrayBuffer>;
  onProgress?: (pct: number) => void;
}

interface EditItemParams {
  item: Portfolio;
  title: string;
  category: string;
}

export function usePortfolioMutations() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ['portfolioItems'] });

  const addItem = useMutation({
    mutationFn: async ({ title, category, bytes, onProgress }: AddItemParams) => {
      if (!actor) throw new Error('Not connected to backend');
      const id = `portfolio-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      let blob = ExternalBlob.fromBytes(bytes);
      if (onProgress) {
        blob = blob.withUploadProgress(onProgress);
      }
      const portfolio: Portfolio = {
        id,
        title,
        category,
        imageData: blob,
        order: BigInt(Date.now()),
      };
      await actor.addPortfolioItem(portfolio);
    },
    onSuccess: invalidate,
  });

  const replaceItem = useMutation({
    mutationFn: async ({ item, bytes, onProgress }: ReplaceItemParams) => {
      if (!actor) throw new Error('Not connected to backend');
      let blob = ExternalBlob.fromBytes(bytes);
      if (onProgress) {
        blob = blob.withUploadProgress(onProgress);
      }
      const updated: Portfolio = {
        ...item,
        imageData: blob,
      };
      await actor.replacePortfolioItem(updated);
    },
    onSuccess: invalidate,
  });

  const editItem = useMutation({
    mutationFn: async ({ item, title, category }: EditItemParams) => {
      if (!actor) throw new Error('Not connected to backend');
      const updated: Portfolio = {
        ...item,
        title,
        category,
      };
      await actor.replacePortfolioItem(updated);
    },
    onSuccess: invalidate,
  });

  const deleteItem = useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error('Not connected to backend');
      await actor.deletePortfolioItem(id);
    },
    onSuccess: invalidate,
  });

  return { addItem, replaceItem, editItem, deleteItem };
}
