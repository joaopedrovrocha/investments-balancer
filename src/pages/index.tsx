import { useQuotas } from '@/hooks/quotas'
import { useEffect, useRef, useState } from 'react'

interface QuotaProcessed {
	name: string
	current_price: string
	wallet_percentage: string
	total_quotas: string
	total_investment: string
}

function Home() {

	const [quotaInput, setQuotaInput] = useState('')

	const [quotasList, setQuotasList] = useState([] as string[])
	const [investmentValue, setInvestimentValue] = useState('')
	const [quotasProcessed, setQuotasProcessed] = useState([] as QuotaProcessed[])
	const [updateQutas, setUpdateQuotas] = useState(false)

	const { getQuotaInfo } = useQuotas()

	function handleSaveQuota() {
		if (quotaInput) {
			setQuotasList([...quotasList, quotaInput])

			const newQuota = {
				name: quotaInput,
				current_price: '...',
				wallet_percentage: '...',
				total_quotas: '...',
				total_investment: '...',
			}

			setQuotasProcessed([...quotasProcessed, newQuota])

			getQuotaInfo(quotaInput)
				.then((quota: QuotaProcessed) => setQuotasProcessed((quotas) => [...quotas.filter(q => q.name !== quota.name), quota]))

			setQuotaInput('')
		}
	}

	function toBRL(value: number) {
		return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
	}

	useEffect(() => {
		let investment = Number(investmentValue)

		if (investment && investment > 0) {
			let investment = Number(investmentValue)

			let assets = quotasProcessed.length
			let investmentPerAsset = investment / assets

			setQuotasProcessed((quotas) => {
				return quotas.map(quota => {
					if (quota.current_price === '...') { return quota }

					let quotasQuantity = Math.floor(investmentPerAsset / Number(quota.current_price))
					let quotasInvestment = quotasQuantity * Number(quota.current_price)

					return {
						...quota,
						total_quotas: quotasQuantity.toString(),
						total_investment: toBRL(quotasInvestment),
						wallet_percentage: (quotasInvestment / investment * 100).toFixed(2) + '%'
					}
				})
			})
		}

	}, [investmentValue])

	return (
		<>
			<div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
				{/** CONTAINER */}
				<div className=''>
					<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
						<div className="pb-4 bg-white dark:bg-gray-900 p-2">
							<form>
								<div className="grid gap-6 mb-6 md:grid-cols-2">
									<div>
										<div className="mb-6">
											<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Quota </label>
											<input type="text" autoFocus value={quotaInput} onChange={e => setQuotaInput(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="HGLG11" required />
										</div>
										<button onClick={handleSaveQuota} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"> Add Quota </button>
									</div>
								</div>
							</form>
						</div>

						<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
							<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
								<tr>
									<th scope="col" className="text-center px-6 py-3"> Quota </th>
									<th scope="col" className="text-center px-6 py-3"> Current Price </th>
									<th scope="col" className="text-center px-6 py-3"> Wallet % </th>
									<th scope="col" className="text-center px-6 py-3"> Total Quotas </th>
									<th scope="col" className="text-center px-6 py-3"> Total Investment </th>
								</tr>
							</thead>
							<tbody>
								{quotasProcessed.length > 0 && quotasProcessed.map(quotaProcessed => (
									<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={quotaProcessed.name}>
										<th scope="col" className="text-center px-6 py-3"> {quotaProcessed.name} </th>
										<th scope="col" className="text-center px-6 py-3"> {quotaProcessed.current_price} </th>
										<th scope="col" className="text-center px-6 py-3"> {quotaProcessed.wallet_percentage} </th>
										<th scope="col" className="text-center px-6 py-3"> {quotaProcessed.total_quotas} </th>
										<th scope="col" className="text-center px-6 py-3"> {quotaProcessed.total_investment} </th>
									</tr>
								))}
							</tbody>
						</table>
						<div className="pt-4 bg-white dark:bg-gray-900 p-2">
							<form>
								<div className="grid gap-6 mb-6 md:grid-cols-2">
									<div className="mb-6">
										<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Total Investment Value </label>
										<input type="text" value={investmentValue} onChange={e => setInvestimentValue(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="R$ 1.000,00" required />
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Home