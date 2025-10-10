import { api } from '@/lib/axios';
import type { CharacterSummary } from '@/types/character/character';
import type { Page } from '@/types/page';

interface GetSheetsParams {
  pageIndex: number;
  pageSize: number;
}

export const getSheets = async ({
  pageIndex,
  pageSize,
}: GetSheetsParams): Promise<Page<CharacterSummary>> => {
  const response = await api.get<Page<CharacterSummary>>('/characters', {
    params: {
      page: pageIndex,
      size: pageSize,
      sort: 'desc',
    },
  });
  return response.data;
};
