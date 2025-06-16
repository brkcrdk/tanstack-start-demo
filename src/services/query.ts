import projectConfig from "@/project.config";

export interface QueryOptionsProps {
  requireAuth: boolean;
}

const computedBaseUrl = `${projectConfig.baseUrl}/api`;

async function query() {}

export default query;

// async function query<T>(
//   endpoint: string,
//   requestInit?: RequestInit,
//   options: QueryOptionsProps = { requireAuth: true }
// ): Promise<T> {
//   const cookieStore = await cookies();
//   const accessToken = cookieStore.get(tbbConfig.accessToken)?.value;

//   if (options.requireAuth && !accessToken) {
//     redirect("/cikis");
//   }

//   const computedRequestParams: RequestInit = {
//     ...requestInit,
//     credentials: "include",
//     headers: {
//       ...requestInit?.headers,
//       "Content-Type": "application/json",
//       Accept: "application/json",
//       ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
//     },
//   };

//   const response = await fetch(
//     `${tbbConfig.baseUrl}/api${endpoint}`,
//     computedRequestParams
//   );

//   if (options.requireAuth && response.status === 401) {
//     redirect("/cikis");
//   }

//   if (!response.ok && options.requireAuth) {
//     throw new Error(`${response.status}-${response.statusText}`);
//   }

//   const data: T = await response.json();

//   return {
//     success: true,
//     ...data,
//   };
// }

// export default query;
