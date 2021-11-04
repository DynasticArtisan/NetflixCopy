import React, { useEffect, useState } from 'react'
import './plansScreen.css'
import db from '../firebase'
import { useDispatch, useSelector } from 'react-redux'
import { selectSubscription, selectUser, setRole } from '../features/userSlice'
import { loadStripe } from '@stripe/stripe-js'
import Loader from '../components/Loader/Loader'

const PlansScreen = () => {
    const user = useSelector(selectUser)
    const subscription = useSelector(selectSubscription)
    const [products, setProducts] = useState({})
    const [prodLoading, setProdLoading] = useState(true)

    useEffect(()=>{
        setProdLoading(true)
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
            setProdLoading(false)
        })

    },[])

    const loadCheckout = async (priceId) => {
        try {
            setProdLoading(true)
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
                setProdLoading(false)
                alert(err.message)
            }
            else if(sessionId) {
                const stripe = await loadStripe('pk_test_51JqGRVE87ExSDM2vHQT0laYY9qCRUssAgr0F5ZNNTgALfFmHS7t4dc5acxbjCdYJnX7iiGtSlXNpkLYuHk9eTVKR00uonolx4F')              
                stripe.redirectToCheckout({ sessionId })
            }
        })
        } catch (error) {
            setProdLoading(false)
        }
        
    }
    if(prodLoading){
        return (
            <div className='plansScreen'>
                <Loader/>
            </div>
        )
    }
    
   
    return (
        <div className='plansScreen'>
           <h3>{subscription?.role ? `Plans (current plan: ${subscription.role})`: 'Plans'}</h3>
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
