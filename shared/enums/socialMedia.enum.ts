export enum ETokenType {
  ACCESS = 'access',
  REFRESH = 'refresh',
}

export enum ESocialMediaProvider {
  LINKEDIN = 'Linkedin',
  TWITTER = 'Twitter',
  FACEBOOK = 'Facebook',
}

export const socialMediaLengthRestrictions: { [key in ESocialMediaProvider]?: number } = {
  [ESocialMediaProvider.TWITTER]: 257,
};

export const socialMediaOptions = Object.values(ESocialMediaProvider).map(
  (socialMediaProvider) => ({
    label: socialMediaProvider,
    value: socialMediaProvider,
  })
);
