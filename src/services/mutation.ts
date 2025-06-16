import projectConfig from '@/app.config';

const computedBaseUrl = `${projectConfig.baseUrl}/api`;

interface MutationOptionsProps {
  requireAuth: boolean;
}

async function mutation() {}

export default mutation;
