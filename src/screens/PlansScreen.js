import React, { useEffect, useState } from 'react'
import './plansScreen.css'
import db from '../firebase'
import { useSelector } from 'react-redux'
import { selectUser } from '../features/userSlice'
import { loadStripe } from '@stripe/stripe-js'

const PlansScreen = () => {
    const user = useSelector(selectUser)
    const [products, setProducts] = useState({})
    const [ subscription, setSubscription ] = useState(null)

    useEffect(()=>{
        db.collection('customers')
            .doc(user.uid)
            .collection('subscriptions')
            .get()
            .then(snap => {
                snap.forEach(async subscription => {
                    const { role, current_period_end, current_period_start } = subscription.data()
                    setSubscription( {
                        role,
                        currentPeriodStart: current_period_start.seconds,
                        currentPeriodEnd: current_period_end.seconds
                    } )
                })
            })
    },[user.uid])


    useEffect(()=>{
        db.collection('products').where('active','==',true)
        .get().then(qSnapshot => {
            const products = {}
            qSnapshot.forEach(async prod => {
                products[prod.id] = prod.data()
                const price = await prod.ref.collection('prices').get()
                price.docs.forEach(doc => products[prod.id].prices = {
                    priceId: doc.id,
                    priceData: doc.data()
                })
            })
            setProducts(products)
        })
    },[])

    const loadCheckout = async (priceId) => {
        const docRef = await db.collection('customers')
            .doc(user.uid)
            .collection('checkout_sessions')
            .add({
                price: priceId,
                success_url: window.location.origin,
                cancel_url: window.location.origin
            })
        docRef.onSnapshot(async snap => {
            const { err, sessionId } = snap.data()
            if(err){
                alert(err.message)
            }
            if(sessionId) {
                const stripe = await loadStripe('pk_test_51JqGRVE87ExSDM2vHQT0laYY9qCRUssAgr0F5ZNNTgALfFmHS7t4dc5acxbjCdYJnX7iiGtSlXNpkLYuHk9eTVKR00uonolx4F')
                stripe.redirectToCheckout({ sessionId })
            }
        })
    }

    
   
    return (
        <div className='plansScreen'>
           <h3>{subscription ? `Plans (current plan: ${subscription.role})`: 'Plans'}</h3>
           {subscription && <p>Renewal date: {new Date(subscription?.currentPeriodEnd*1000).toLocaleDateString()}</p>}
           {
               Object.entries(products).map(([key, val])=>{
                    const isCurrentPlan = val.name?.toLowerCase().includes(subscription?.role) ? true : false
                   return (
                    <div key={key} className="plansScreen__plan">
                        <div className="plansScreen__planInfo">
                            <h5>{val.name}</h5>
                            <p>{val.description}</p>
                        </div>
                        <button disabled={isCurrentPlan} onClick={() => loadCheckout(val.prices.priceId)} className="plansScreen__subscribe" >{isCurrentPlan ? 'Current Package' : 'Subscribe'}</button>
                    </div>
                   )
               })
               
            }
           
        </div>
    )
}

export default PlansScreen
