/**
 * Default social link icons and metadata
 * These are built-in and cannot be modified by users
 */

export const DEFAULT_SOCIAL_ICONS = {
  'x': {
    name: 'X',
    icon: '𝕏',
    iconUrl: '/icons/x.svg',
    isDefault: true,
  },
  'twitter': {
    name: 'X',
    icon: '𝕏',
    iconUrl: '/icons/x.svg',
    isDefault: true,
  },
  'telegram': {
    name: 'Telegram',
    icon: '✈️',
    iconUrl: '/icons/telegram.svg',
    isDefault: true,
  },
  'discord': {
    name: 'Discord',
    icon: '💬',
    iconUrl: '/icons/discord.svg',
    isDefault: true,
  },
} as const;

export const DEFAULT_SOCIAL_URLS = {
  'x': 'https://x.com',
  'twitter': 'https://twitter.com',
  'telegram': 'https://telegram.org',
  'discord': 'https://discord.com',
} as const;

/**
 * Get the default icon for a social link by name
 * Returns null if not a default social link
 */
export const getDefaultSocialIcon = (name: string): string | null => {
  const key = name.toLowerCase();
  return DEFAULT_SOCIAL_ICONS[key as keyof typeof DEFAULT_SOCIAL_ICONS]?.icon || null;
};

/**
 * Get the icon URL for a default social link by name
 * Returns null if not a default social link
 */
export const getDefaultSocialIconUrl = (name: string): string | null => {
  const key = name.toLowerCase();
  return DEFAULT_SOCIAL_ICONS[key as keyof typeof DEFAULT_SOCIAL_ICONS]?.iconUrl || null;
};

/**
 * Check if a social link is one of the defaults
 */
export const isDefaultSocialLink = (name: string): boolean => {
  const key = name.toLowerCase();
  return key in DEFAULT_SOCIAL_ICONS;
};

/**
 * Get all default social link names
 */
export const getDefaultSocialLinkNames = (): string[] => {
  return Object.values(DEFAULT_SOCIAL_ICONS).map(link => link.name);
};
