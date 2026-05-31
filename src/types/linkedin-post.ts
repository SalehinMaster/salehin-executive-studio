export type LinkedInPostPreview = {
  hook: string;
  body: string;
  cta: string;
  hashtags: string[];
};

export type GeneratePostRequest = {
  topic: string;
};

export type GeneratePostResponse = {
  post: LinkedInPostPreview;
};

export type GeneratePostError = {
  error: string;
};
