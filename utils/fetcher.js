import useSWR from 'swr'
const fetcher = (...args) => fetch(...args).then(res => res.json())

export function useCustomer (page = 1) {
    const { data, error } = useSWR(`https://gorest.co.in/public/v1/users?page=${page}`, fetcher)
    return {
        customer: data,
        isLoading: !error && !data,
        isError: error
    }
}
export function useCustomerDetail (id) {
    console.log("❄️ id", id)
    const { data, error } = useSWR(`https://gorest.co.in/public/v1/users/${id}`, fetcher)
    return {
        detail: data,
        isLoading: !error && !data,
        isError: error
    }
}
