import { useSubscription, useApolloClient } from '@apollo/client'
import { includedIn } from '../utils'

export const useSubscriptions = (subscription, query, dataSubscription, dataQuery, fn) => {
    const client = useApolloClient()

    useSubscription(subscription, {
        onData: ({ data }) => {
            const item = data.data[dataSubscription]

            const store = client.readQuery({ query: query })
            if (store && !includedIn(store[dataQuery], item)) {
                // console.log(store[dataQuery], item);
                client.writeQuery({
                    query: query,
                    data: { [dataQuery]: fn(store[dataQuery], item) }
                })
            }
        }
    })

    return client
}