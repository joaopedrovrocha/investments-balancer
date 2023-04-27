import type { NextApiRequest, NextApiResponse } from 'next'
import Crawler from '@/crawler'

type Quota = {
    name: string
    current_price: string
    wallet_percentage: string
    total_quotas: string
    total_investment: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Quota>
) {
    let { id: quotaName } = req.query

    if (!quotaName) {
        return res.status(400).end('error')

    } else if (Array.isArray(quotaName)) {
        quotaName = quotaName[0]
    }

    const crl = new Crawler('fiis', quotaName)
    const data = await crl.getInfo()

    if (!data) {
        return res.status(400).end('quota not found')
    }

    console.log('data', data)

    res.status(200).json({
        name: data.id,
        current_price: data.quotation.toString(),
        wallet_percentage: '...',
        total_quotas: '...',
        total_investment: '...',
    })
}
