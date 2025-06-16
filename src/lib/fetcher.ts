import { getCookie, setCookie, toWebHandler } from '@tanstack/react-start/server';

import appConfig from '@/app.config';

const baseUrl = `${appConfig.baseUrl}/api`;

// error: { status: false, code: 404, message: 'Kullanıcı bulunamadı.' }

// error: {
//   status: false,
//   code: 404,
//   message: 'No route found for "GET /apivideos/db916a61"'
// }

type CustomResponse<T> =
  | {
      status: true;
      data: T;
    }
  | {
      status: false;
      code: number;
      message: string;
    };

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
  const accessToken = getCookie('access_token');
  const refreshToken = getCookie('refresh_token');

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
    const request = await fetch(`${baseUrl}${url}`, computedOptions);

    if (!request.ok) {
      if (request.status === 401 && refreshToken) {
        const refreshRequest = await fetch(`${baseUrl}/refresh_token`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ refreshToken }),
        });

        if (refreshRequest.ok) {
          const refreshResponse = await refreshRequest.json();
          setCookie('access_token', refreshResponse.accessToken);
          setCookie('refresh_token', refreshResponse.refreshToken);

          return fetcher({ url, fetchOptions: computedOptions, requireAuth: true, formData });
        }
      } else {
        throw new Error(request.statusText, {
          cause: {
            code: request.status,
            message: request.statusText,
          },
        });
      }
    }

    return request.json();
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
