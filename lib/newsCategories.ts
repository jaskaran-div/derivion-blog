import type { NewsItem } from '@/lib/data';

export const newsCategories = ['All Feeds', 'Macro Policy', 'Regulatory Briefs', 'Risk Infrastructure', 'Market Watch'] as const;
export type NewsCategory = typeof newsCategories[number];

const categoryTags: Record<Exclude<NewsCategory, 'All Feeds'>, string[]> = {
  'Macro Policy': ['Macro'],
  'Regulatory Briefs': ['Fed', 'Federal Reserve', 'ECB', 'RBA', 'BOE', 'SNB', 'RBI', 'SEBI'],
  'Risk Infrastructure': ['Risk', 'Global Risk'],
  'Market Watch': ['Markets', 'Market Outlook', 'Equities', 'Oil', 'Bitcoin', 'FX', 'Treasuries', 'Bonds', 'Gold', 'Dollar'],
};

export function matchesCategory(item: NewsItem, category: NewsCategory): boolean {
  if (category === 'All Feeds') return true;
  if (category === 'Macro Policy' && item.category === category) return true;

  const expectedTags = categoryTags[category].map(tag => tag.toLowerCase());
  return item.tags.some(tag => expectedTags.includes(tag.toLowerCase()));
}

/** Every filter category this item appears under, so card labels agree with the filters. */
export function getNewsCategories(item: NewsItem): Exclude<NewsCategory, 'All Feeds'>[] {
  const matched = newsCategories.filter(
    (category): category is Exclude<NewsCategory, 'All Feeds'> => category !== 'All Feeds' && matchesCategory(item, category),
  );
  return matched.length > 0 ? matched : [item.category as Exclude<NewsCategory, 'All Feeds'>];
}
