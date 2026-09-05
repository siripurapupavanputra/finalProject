import {useQuery} from '@tanstack/react-query'
import { getTenants } from '../api/tenantApi'

export const useTenants = ()=>{
    return useQuery ({
        queryKey : ["tenants"],
        queryFn : getTenants
    })
}