import { useEffect, useRef } from "react"
import usePresenceStore from "./usePresenceStore"
import { Channel, Members } from "pusher-js"
import { pusherClient } from "@/match-app/lib/pusher"

export const usePresenceChannel = () => {
    const {set, add, remove} = usePresenceStore(state => ({
        set: state.set,
        add: state.add,
        remove: state.remove
    }))

    const channelRef = useRef<Channel | null> (null)


    useEffect(() => {
        if(!channelRef.current) {
            channelRef.current = pusherClient.subscribe('presence-nm');
            channelRef.current.bind('pusher:subscription_succeeded', (members: Members) => {

            })

            channelRef.current.bind('pusher:member_added', (member: Record<string,any>)=> {

            })
            channelRef.current.bind('pusher:member_removed', (member: Record<string,any>) => {
                
            })
        }
    },[])
}