import { getCookie } from '@tanstack/react-start/server';

import appConfig from '@/app.config';

const baseUrl = `${appConfig.baseUrl}/api`;

interface Props {
  url: string;
  fetchOptions: RequestInit;
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

async function fetcher({ url, fetchOptions, requireAuth = true, formData = false }: Props) {
  const accessToken = getCookie('access_token');

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

    console.log(request);

    if (request.ok) {
      return {
        success: true,
        statusCode: request.status,
        data: await request.json(),
      };
    } else {
      return {
        success: false,
        statusCode: request.status,
        message: request.statusText,
      };
    }
  } catch (error) {
    return {
      success: false,
      statusCode: 500,
      data: error,
      message: error instanceof Error ? error.message : 'unknown error',
    };
  }

  // if (requireAuth && request.status === 401) {
  //   const refreshToken = getCookie('refresh_token');
  //   console.log(refreshToken);
  // } else {
  //   return request.json();
  // }

  // console.log(computedOptions);

  // return computedOptions;
}

export default fetcher;
