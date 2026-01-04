import {
  type IntegrationId,
  HTML_SCRIPT,
  REACT_SCRIPT,
  NEXTJS_SCRIPT,
  JAVASCRIPT_SCRIPT,
} from "./constants";

const SCRIPT_TEMPLATES: Record<IntegrationId, string> = {
  html: HTML_SCRIPT,
  react: REACT_SCRIPT,
  nextjs: NEXTJS_SCRIPT,
  javascript: JAVASCRIPT_SCRIPT,
};

export const createScript = (
  integrationId: IntegrationId,
  organizationId: string
) => {
  if (!integrationId || !organizationId) {
    return "";
  }

  const template = SCRIPT_TEMPLATES[integrationId];
  return template?.replace(/{{ORGANIZATION_ID}}/g, organizationId);
};
