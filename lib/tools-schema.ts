import {z} from 'zod'

export const searchSchema = z.object({
    query: z.string().describe('The query to search for')
})

export const retrieveSchema = z.object({
    url: z.string().describe('retrieve the url content')
})