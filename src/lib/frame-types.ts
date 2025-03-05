export type FrameMetadata = {
  version: string;
  image: string;
  imageAspectRatio?: "1:1" | "1.91:1";
  buttons?: Array<{
    label: string;
    action: "post" | "post_redirect" | "link" | "mint";
    target?: string;
  }>;
  input?: {
    text: string;
  };
  postUrl?: string;
  refreshPeriod?: number;
};
