/**
 * Utilitaire de gestion des dates et fuseaux horaires GMT/UTC pour Afri-ka Web.
 * Utilise l'API native Intl du navigateur pour une adaptation automatique au fuseau local de l'utilisateur.
 */

export const formatDate = (
  isoString: string,
  locale: string = 'fr-FR',
  options?: Intl.DateTimeFormatOptions
): string => {
  try {
    const date = new Date(isoString);
    if (isNaN(date.getTime())) return isoString;

    const defaultOptions: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      ...options,
    };

    return new Intl.DateTimeFormat(locale, defaultOptions).format(date);
  } catch {
    return isoString;
  }
};

export const getGMTCurrentTimeString = (): string => {
  const now = new Date();
  return now.toUTCString().replace('GMT', 'UTC');
};

export const getUserTimezoneString = (): string => {
  try {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const offset = -new Date().getTimezoneOffset() / 60;
    const sign = offset >= 0 ? '+' : '';
    return `${timeZone} (GMT${sign}${offset})`;
  } catch {
    return 'GMT';
  }
};
