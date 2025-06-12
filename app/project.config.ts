interface ProjectConfigProps {
  /**
   * @returns `process.env.NEXT_PUBLIC_BASE_URL`
   */
  baseUrl: string;
}

const projectConfig: ProjectConfigProps = {
  baseUrl: import.meta.env.BASE_URL,
};

export default projectConfig;
