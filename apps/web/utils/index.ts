export const getPageTitle = (pageTitle?: string) => {
  return `${pageTitle || ''}${!!pageTitle ? ' | ' : ''}Reputable`;
};
