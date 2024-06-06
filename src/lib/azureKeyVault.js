import { DefaultAzureCredential } from "@azure/identity";
import { SecretClient } from "@azure/keyvault-secrets";

const vaultUrl = process.env.NEXT_PUBLIC_AZURE_KEY_VAULT_URL;
const credential = new DefaultAzureCredential();
const client = new SecretClient(vaultUrl, credential);


async function getClientSecretTenant() {
    try {
        const clientId = await client.getSecret("clientIdSecretName");
        const clientSecretValue = await client.getSecret("clientSecretValue")
        const tenantId = await client.getSecret("tenantIdSecretName")
        return {
            clientId: clientId.value,
            clientSecretValue: clientSecretValue.value,
            tenantId: tenantId.value
        }
    }
    catch (error) {
        console.log('error fetching the secrets')
        throw error
    }
}

export { getClientSecretTenant }