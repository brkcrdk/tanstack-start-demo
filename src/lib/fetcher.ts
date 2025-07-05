import appConfig from '@/app.config';

import { getUserCookies } from './userCookieHandlers';

interface Props {
  url: string;
  fetchOptions?: RequestInit;
  /**
   * Bu değere göre istek atılacak olan routeta token kontrolleri ve refreshToken rotation yapılır.
   * Bu değer yoksa public bir şekilde bu route kullanılabilir demektir.
   *
   * @defaultValue `true`
   */
  requireAuth?: boolean;
  /**
   * Bu değer atılacak olan body tipini belirtir. Eğer formData değeri true olarak belirtilirse
   * request headerına `content-type`  ve `accept` değerleri eklenmez.
   *
   * @defaultValue `false`
   */
  formData?: boolean;
}

async function fetcher<T>({ url, fetchOptions = {}, requireAuth = true, formData = false }: Props): Promise<T> {
  const { accessToken } = getUserCookies();

  const headers = new Headers(fetchOptions.headers);

  if (!formData) {
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
  }

  if (requireAuth) {
    headers.append('Authorization', `Bearer ${accessToken}`);
  }

  const computedOptions: RequestInit = {
    ...fetchOptions,
    headers,
  };

  try {
    const request = await fetch(`${appConfig.apiUrl}${url}`, computedOptions);

    if (request.ok) {
      /**
       * NOTE: Refresh token rotation headerı set ettikten sonra token set edemeyeceği için middleware içinde sayfa yüklenirken yapılır.
       */
      return request.json();
    } else {
      throw new Error(request.statusText, {
        cause: {
          code: request.status,
          message: request.statusText,
        },
      });
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'unknown error';

    throw new Error(errorMessage, {
      cause: {
        code: 500,
        message: errorMessage,
      },
    });
  }
}

export default fetcher;
