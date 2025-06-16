/// <reference types="vite/client" />
interface ProjectConfigProps {
  /**
   * @returns `process.env.NEXT_PUBLIC_BASE_URL`
   */
  baseUrl: string;
}

const projectConfig: ProjectConfigProps = {
  baseUrl: import.meta.env.VITE_SERVER_URL,
};

export default projectConfig;
