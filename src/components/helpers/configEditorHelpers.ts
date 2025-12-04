import { Template } from '../../types';

/**
 * Updates a nested property in an object using dot notation
 * @example updateNestedProperty(config, 'meme.memeName', 'NewName')
 */
export const updateNestedProperty = (obj: any, path: string, value: any): any => {
  const newObj = { ...obj };
  const parts = path.split('.');

  let current: any = newObj;
  for (let i = 0; i < parts.length - 1; i++) {
    current = current[parts[i]];
  }
  current[parts[parts.length - 1]] = value;

  return newObj;
};

/**
 * Updates a style property and returns updated config
 */
export const updateStyleProperty = (config: Template, colorKey: keyof any, value: string): Template => {
  const newStyles = { ...config.styles };
  newStyles[colorKey] = value;
  return { ...config, styles: newStyles };
};

/**
 * Adds a new token to tokenomics section
 */
export const addTokenomicsToken = (config: Template): Template => {
  const newToken = {
    id: Math.max(...config.tokenomics.tokens.map(t => t.id), 0) + 1,
    icon: '📊',
    label: 'New Token',
    value: '',
    description: '',
  };

  return {
    ...config,
    tokenomics: {
      ...config.tokenomics,
      tokens: [...config.tokenomics.tokens, newToken],
    },
  };
};

/**
 * Removes a token from tokenomics by id
 */
export const removeTokenomicsToken = (config: Template, id: number): Template => {
  return {
    ...config,
    tokenomics: {
      ...config.tokenomics,
      tokens: config.tokenomics.tokens.filter(t => t.id !== id),
    },
  };
};

/**
 * Updates a specific field in a token
 */
export const updateTokenomicsToken = (
  config: Template,
  id: number,
  field: string,
  value: string
): Template => {
  const newTokens = config.tokenomics.tokens.map(t =>
    t.id === id ? { ...t, [field]: value } : t
  );

  return {
    ...config,
    tokenomics: {
      ...config.tokenomics,
      tokens: newTokens,
    },
  };
};

/**
 * Adds a new navigation link
 */
export const addNavLink = (config: Template): Template => {
  const newLink = {
    label: 'New Link',
    href: '#',
  };

  return {
    ...config,
    header: {
      ...config.header,
      navLinks: [...config.header.navLinks, newLink],
    },
  };
};

/**
 * Removes a navigation link by index
 */
export const removeNavLink = (config: Template, index: number): Template => {
  return {
    ...config,
    header: {
      ...config.header,
      navLinks: config.header.navLinks.filter((_, idx) => idx !== index),
    },
  };
};

/**
 * Updates a navigation link field
 */
export const updateNavLink = (
  config: Template,
  index: number,
  field: 'label' | 'href',
  value: string
): Template => {
  const newNavLinks = config.header.navLinks.map((link, idx) =>
    idx === index ? { ...link, [field]: value } : link
  );

  return {
    ...config,
    header: {
      ...config.header,
      navLinks: newNavLinks,
    },
  };
};

/**
 * Adds a new social link
 */
export const addSocialLink = (config: Template): Template => {
  const newLink = {
    name: 'New Social',
    icon: '🔗',
    url: '#',
    iconFile: null,
  };

  return {
    ...config,
    footer: {
      ...config.footer,
      socialLinks: [...config.footer.socialLinks, newLink],
    },
  };
};

/**
 * Removes a social link by index
 */
export const removeSocialLink = (config: Template, index: number): Template => {
  return {
    ...config,
    footer: {
      ...config.footer,
      socialLinks: config.footer.socialLinks.filter((_, idx) => idx !== index),
    },
  };
};

/**
 * Updates a social link field
 */
export const updateSocialLink = (
  config: Template,
  index: number,
  field: 'name' | 'icon' | 'url',
  value: string
): Template => {
  const newSocialLinks = config.footer.socialLinks.map((link, idx) =>
    idx === index ? { ...link, [field]: value } : link
  );

  return {
    ...config,
    footer: {
      ...config.footer,
      socialLinks: newSocialLinks,
    },
  };
};

/**
 * Updates media file with prefix
 */
export const updateMediaFile = (
  config: Template,
  fileType: 'memeImage' | 'favicon' | 'musicFile',
  file: File
): { config: Template; file: File } => {
  const prefixes: Record<string, string> = {
    memeImage: 'meme_',
    favicon: 'favicon_',
    musicFile: 'music_',
  };

  const prefixedFileName = `${prefixes[fileType]}${file.name}`;
  const newFile = new File([file], prefixedFileName, {
    type: file.type,
    lastModified: file.lastModified,
  });

  const newMedia = { ...config.media };
  newMedia[fileType] = {
    ...newMedia[fileType],
    file: newFile.name,
  };

  return {
    config: {
      ...config,
      media: newMedia,
    },
    file: newFile,
  };
};

/**
 * Adds a new video entry
 */
export const addVideo = (config: Template): Template => {
  const newVideo = {
    id: Math.max(...config.videos.items.map(v => v.id), 0) + 1,
    title: 'New Video',
    description: '',
    file: null,
  };

  return {
    ...config,
    videos: {
      ...config.videos,
      items: [...config.videos.items, newVideo],
    },
  };
};

/**
 * Removes a video entry by id
 */
export const removeVideo = (config: Template, id: number): Template => {
  return {
    ...config,
    videos: {
      ...config.videos,
      items: config.videos.items.filter(v => v.id !== id),
    },
  };
};

/**
 * Updates a specific video field
 */
export const updateVideo = (
  config: Template,
  id: number,
  field: string,
  value: string
): Template => {
  const newVideos = config.videos.items.map(v =>
    v.id === id ? { ...v, [field]: value } : v
  );

  return {
    ...config,
    videos: {
      ...config.videos,
      items: newVideos,
    },
  };
};

/**
 * Updates a video file in config
 */
export const updateVideoFile = (
  config: Template,
  videoId: number,
  file: File
): { config: Template; file: File } => {
  const newVideos = config.videos.items.map(v =>
    v.id === videoId ? { ...v, file: file.name } : v
  );

  return {
    config: {
      ...config,
      videos: {
        ...config.videos,
        items: newVideos,
      },
    },
    file: file,
  };
};

/**
 * Updates multiple video files
 */
export const updateVideoFiles = (
  config: Template,
  files: File[]
): { config: Template; files: File[] } => {
  const videoNames = files.map(f => f.name);

  return {
    config: {
      ...config,
      media: {
        ...config.media,
        videoFiles: {
          ...config.media.videoFiles,
          files: videoNames,
        },
      },
    },
    files: files,
  };
};

/**
 * Ensures the config has the videos structure (for backward compatibility)
 * If videos doesn't exist, creates an empty videos array
 */
export const ensureVideosStructure = (config: Template): Template => {
  if (config.videos && config.videos.items) {
    return config;
  }

  return {
    ...config,
    videos: {
      items: [],
    },
  };
};

/**
 * Adds a new meme entry
 */
export const addMeme = (config: Template): Template => {
  // Initialize memes section if it doesn't exist
  const memes = config.memes || { title: '🖼️ Meme Gallery', items: [] };

  const newMeme = {
    id: Math.max(...memes.items.map((m: any) => m.id), 0) + 1,
    title: 'New Meme',
    description: '',
    file: null,
  };

  return {
    ...config,
    memes: {
      ...memes,
      items: [...memes.items, newMeme],
    },
  };
};

/**
 * Removes a meme entry by id
 */
export const removeMeme = (config: Template, id: number): Template => {
  if (!config.memes) return config;

  return {
    ...config,
    memes: {
      ...config.memes,
      items: config.memes.items.filter((m: any) => m.id !== id),
    },
  };
};

/**
 * Updates a specific meme field
 */
export const updateMeme = (
  config: Template,
  id: number,
  field: string,
  value: string
): Template => {
  if (!config.memes) return config;

  const newMemes = config.memes.items.map((m: any) =>
    m.id === id ? { ...m, [field]: value } : m
  );

  return {
    ...config,
    memes: {
      ...config.memes,
      items: newMemes,
    },
  };
};

/**
 * Updates a meme file in config
 */
export const updateMemeFile = (
  config: Template,
  memeId: number,
  file: File
): { config: Template; file: File } => {
  if (!config.memes) {
    return {
      config: {
        ...config,
        memes: {
          title: '🖼️ Meme Gallery',
          items: [{
            id: memeId,
            title: 'New Meme',
            description: '',
            file: file.name,
          }],
        },
      },
      file: file,
    };
  }

  const newMemes = config.memes.items.map((m: any) =>
    m.id === memeId ? { ...m, file: file.name } : m
  );

  return {
    config: {
      ...config,
      memes: {
        ...config.memes,
        items: newMemes,
      },
    },
    file: file,
  };
};

/**
 * Ensures the config has the memes structure (for backward compatibility)
 */
export const ensureMemesStructure = (config: Template): Template => {
  if (config.memes && config.memes.items) {
    return config;
  }

  return {
    ...config,
    memes: {
      title: '🖼️ Meme Gallery',
      items: [],
    },
  };
};

/**
 * Updates a social link file in config
 */
export const updateSocialLinkFile = (
  config: Template,
  index: number,
  file: File
): { config: Template; file: File } => {
  const prefixedFileName = `social_icon_${index}_${file.name}`;
  const newFile = new File([file], prefixedFileName, {
    type: file.type,
    lastModified: file.lastModified,
  });

  const newSocialLinks = config.footer.socialLinks.map((link, idx) =>
    idx === index ? { ...link, iconFile: newFile.name } : link
  );

  return {
    config: {
      ...config,
      footer: {
        ...config.footer,
        socialLinks: newSocialLinks,
      },
    },
    file: newFile,
  };
};
