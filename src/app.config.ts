/// <reference types="vite/client" />
interface ProjectConfigProps {
  /**
   * @returns `process.env.NEXT_PUBLIC_BASE_URL`
   */
  baseUrl: string;
  /**
   * @returns `process.env.NEXT_PUBLIC_BASE_URL/api`
   */
  apiUrl: string;
}

const projectConfig: ProjectConfigProps = {
  baseUrl: import.meta.env.VITE_SERVER_URL,
  apiUrl: `${import.meta.env.VITE_SERVER_URL}/api`,
};

export default projectConfig;
