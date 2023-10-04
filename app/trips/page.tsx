import EmptyState from "../components/EmptyState"
import ClientOnly from "../components/ClientOnly"

import getCurrentUser from "../actions/getCurrentUser"
import getReservations from "../actions/getReservations"
import TripsClient from "./TripsClient"


const TripsPage = async () => {
    const currentUser = await getCurrentUser();
    

    if(!currentUser) {
        return (
            <ClientOnly>
                <EmptyState 
                title="Unauthorized"
                subtitle="Please login again"
                />
            </ClientOnly>
        )
    }

    const reservations = await getReservations({
        userId: currentUser.id,
        
    });
    
    //If user has no reservations
    if(reservations.length === 0) {
        return (
            <ClientOnly>
                <EmptyState 
                title="No trips found"
                subtitle="Looks like you haven't created any trips yet"
                />
            </ClientOnly>
        )
    }

    // If user has reservations
    return (
        <ClientOnly>
            <TripsClient 
            reservations = {reservations}
            currentUser = {currentUser}
            />
        </ClientOnly>
    )
}

export default TripsPage
