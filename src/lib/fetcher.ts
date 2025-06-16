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
  formData?: boolean;
}

async function fetcher({ url, fetchOptions, requireAuth = true, formData }: Props) {
  const accessToken = getCookie('access_token');

  const headers = new Headers(fetchOptions.headers);

  if (!formData) {
    headers.append('Content-Type', 'application/json');
  }

  if (requireAuth) {
    headers.append('Authorization', `Bearer ${accessToken}`);
  }

  const computedOptions: RequestInit = {
    ...fetchOptions,
    headers,
  };

  const request = await fetch(`${baseUrl}${url}`, computedOptions);

  console.log({ url, computedURL: `${baseUrl}${url}`, request, baseUrl });

  if (requireAuth && request.status === 401) {
    const refreshToken = getCookie('refresh_token');
    console.log(refreshToken);
  } else {
    return request.json();
  }

  // console.log(computedOptions);

  // return computedOptions;
}

export default fetcher;
