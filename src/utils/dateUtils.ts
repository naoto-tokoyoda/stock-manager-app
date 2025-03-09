import { format, parseISO } from 'date-fns';
import { ja } from 'date-fns/locale';

/**
 * ISO形式の日付文字列を指定されたフォーマットで表示する
 * @param dateString ISO形式の日付文字列 (例: '2023-05-15')
 * @param formatStr フォーマット文字列
 * @returns フォーマットされた日付文字列
 */
export const formatDate = (dateString: string | undefined, formatStr: string = 'yyyy/MM/dd'): string => {
  if (!dateString) return '';
  try {
    return format(parseISO(dateString), formatStr, { locale: ja });
  } catch (error) {
    console.error('Invalid date format:', error);
    return '';
  }
};

/**
 * 現在の日付からX日後の日付を取得する
 * @param days 日数
 * @returns ISO形式の日付文字列
 */
export const getDateAfter = (days: number): string => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().split('T')[0];
};

/**
 * 現在の日付からX日前の日付を取得する
 * @param days 日数
 * @returns ISO形式の日付文字列
 */
export const getDateBefore = (days: number): string => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString().split('T')[0];
};

/**
 * 日付が期限切れかどうかをチェックする
 * @param expirationDate 期限日 (ISO形式)
 * @returns 期限切れの場合はtrue、そうでない場合はfalse
 */
export const isExpired = (expirationDate: string | undefined): boolean => {
  if (!expirationDate) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const expDate = new Date(expirationDate);
  expDate.setHours(0, 0, 0, 0);
  return expDate < today;
};

/**
 * 日付が期限切れに近いかどうかをチェックする (30日以内)
 * @param expirationDate 期限日 (ISO形式)
 * @returns 期限切れに近い場合はtrue、そうでない場合はfalse
 */
export const isNearExpiration = (expirationDate: string | undefined): boolean => {
  if (!expirationDate) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const expDate = new Date(expirationDate);
  expDate.setHours(0, 0, 0, 0);
  
  // 既に期限切れの場合はfalse
  if (expDate < today) return false;
  
  // 30日以内かどうかをチェック
  const thirtyDaysLater = new Date(today);
  thirtyDaysLater.setDate(today.getDate() + 30);
  
  return expDate <= thirtyDaysLater;
}; 