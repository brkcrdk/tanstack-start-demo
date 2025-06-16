import { redirect } from '@tanstack/react-router';
import { getCookie } from '@tanstack/react-start/server';

import projectConfig from '@/app.config';

const computedBaseUrl = `${projectConfig.baseUrl}/api`;

interface Props extends RequestInit {
  requireAuth?: boolean;
}

async function mutation<T>(endpoint: string, requestInit: Props) {
  if (requestInit?.requireAuth) {
    const accessToken = getCookie('access_token');
    const refreshToken = getCookie('refresh_token');

    if (!accessToken && !refreshToken) {
      redirect({ to: '/login' });
    }

    const computedRequestParams: RequestInit = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        ...requestInit?.headers,
      },
      ...requestInit,
    };

    if (requestInit?.body) {
      computedRequestParams.body = requestInit.body;
    }

    const request = await fetch(`${computedBaseUrl}${endpoint}`, computedRequestParams);
    console.log(request);

    if (!request.ok && request.status !== 401) {
      const errorResponse = await request.json();

      const { statusCode, error, message } = errorResponse;

      return {
        success: false,
        error: {
          statusCode,
          error,
          message,
        },
      };
    }

    if (!request.ok) {
      throw new Error(`${request.status} ${request.statusText}`);
    }

    // const response: T = await request.json();
    // return response;
  } else {
    const request = await fetch(`${computedBaseUrl}${endpoint}`, requestInit);

    const response: T = await request.json();
    return response;
  }
}

export default mutation;
