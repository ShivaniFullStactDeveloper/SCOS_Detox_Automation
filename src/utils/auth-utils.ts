import { STRINGS } from '../constants/strings';

/**
 * Maps unknown/technical errors into consistent user-facing messages.
 */
export function mapError(err: unknown): string {
  const message =
    (typeof err === 'object' && err !== null && 'message' in err && (err as Error).message) || '';

  if (typeof message === 'string') {
    if (message.toLowerCase().includes('session expired')) return message;
    if (message.toLowerCase().includes('network')) return STRINGS.ERR_GENERIC;
    if (message.trim()) return message;
  }

  return STRINGS.ERR_GENERIC;
}

/**
 * Resolves the next step after selecting an institute.
 */
export const resolveInstituteNextStep = (institute: any): 'dashboard' | 'roleSelect' => {
  const roles = Array.isArray(institute?.roles) ? institute.roles : [];

  if (roles.length > 1) {
    return 'roleSelect';
  }

  return 'dashboard';
};