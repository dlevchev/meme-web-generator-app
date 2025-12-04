export interface TemplateInfo {
  id: string;
  name: string;
  description: string;
  version: string;
  valid: boolean;
  configUrl: string;
  previewUrl?: string;
}

export interface Template {
  template: string;
  name: string;
  description: string;
  version: string;
  pageTitle: string;
  meme: {
    memeTicker: string;
    memeName: string;
    memeDescription: string;
    memeSloganTitle: string;
    memeSlogan: string;
    title: string;
    subtitle: string;
    description: string;
    contractAddress: string;
  };
  header: {
    navLinks: Array<{
      label: string;
      href: string;
    }>;
  };
  videosTitle?: string;
  tokenomicsTitle?: string;
  videos: {
    items: Array<{
      id: number;
      title: string;
      description: string;
      file: string | null;
    }>;
  };
  tokenomics: {
    tokens: Array<{
      id: number;
      icon: string;
      label: string;
      value: string;
      description: string;
    }>;
  };
  footer: {
    text: string;
    socialLinks: Array<{
      name: string;
      icon?: string;
      iconFile?: string | null;
      url: string;
    }>;
  };
  styles: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    textColor: string;
    backgroundColor: string;
  };
  media: {
    memeImage: { file: string | null; description: string; required: boolean };
    favicon: { file: string | null; description: string; required: boolean };
    musicFile: { file: string | null; description: string; required: boolean };
    videoFiles?: { files: string[]; description: string; required: boolean };
  };
  userEmail?: string;
}

export interface BuildResponse {
  success: boolean;
  buildId: string;
  message: string;
  downloadUrl?: string;
}

export interface ApiResponse<T> {
  error?: string;
  [key: string]: any;
}
