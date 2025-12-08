import {
  CreateSecretCommand,
  GetSecretValueCommand,
  PutSecretValueCommand,
  ResourceExistsException,
  SecretsManagerClient,
  type GetSecretValueCommandOutput,
} from "@aws-sdk/client-secrets-manager";

export const createSecretsManagerClient = (): SecretsManagerClient => {
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

  if (!accessKeyId || !secretAccessKey) {
    throw new Error(
      "AWS credentials not configured: AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY are required"
    );
  }
  return new SecretsManagerClient({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });
};

export const getSecretValue = async (
  secretName: string
): Promise<GetSecretValueCommandOutput> => {
  const client = createSecretsManagerClient();
  return await client.send(new GetSecretValueCommand({ SecretId: secretName }));
};

export const upsertSecret = async (
  secretName: string,
  secretValue: Record<string, unknown>
): Promise<void> => {
  const client = createSecretsManagerClient();

  try {
    await client.send(
      new CreateSecretCommand({
        Name: secretName,
        SecretString: JSON.stringify(secretValue),
      })
    );
  } catch (error) {
    if (error instanceof ResourceExistsException) {
      await client.send(
        new PutSecretValueCommand({
          SecretId: secretName,
          SecretString: JSON.stringify(secretValue),
        })
      );
    } else {
      throw error;
    }
  }
};

// TypeScript Generics arrow function syntax
export const parseSecretString = <T = Record<string, unknown>>(
  secret: GetSecretValueCommandOutput
): T | null => {
  if (!secret.SecretString) {
    return null;
  }

  try {
    return JSON.parse(secret.SecretString) as T;
  } catch (error) {
    return null;
  }
};
