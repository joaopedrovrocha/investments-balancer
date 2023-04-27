async function getQuotaInfo(quotaName: string) {
    return fetch(`/api/quota/${quotaName}`)
        .then(res => res.json())
}

export const useQuotas = () => ({ getQuotaInfo })