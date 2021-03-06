import Axios from 'axios';


export const setNextYearAction = (yearDetails) => async (dispatch) => {
    console.log("Here are the year details setNextYearAction : "+ yearDetails)
    //update the year 
    const yearRes = await Axios.patch('/year.json', {session : yearDetails })
    const year = yearRes.data.session
    let currentYearDigit = Number(year.substr(-1))
    let oldYear = String(currentYearDigit - 1)
    let oldYearFormattedString = year.replace(currentYearDigit, oldYear)


    const usersRes = await Axios.get('/users.json')
    const usersRecords = usersRes.data
    console.log(usersRecords)


    // For each user(student) that has records under 'users'
    for ( let [userId, userRecord] of Object.entries(usersRecords)) {

    if (userRecord.cart)
    {
      	// For each item that is under this user's cart
  for(let [cartProductId,cartProductSellersRecord] of Object.entries(userRecord.cart)){
  
    // For each seller of this item in the cart
    for(let [cartProductSeller, qty] of Object.entries(cartProductSellersRecord)){
    	
    	console.log(userId + " bought from " + cartProductSeller + " product(" + cartProductId + ") of qty:" + qty) // this should contain all the info you need to do the below steps

      console.log(userId)
      console.log(year)
      console.log(cartProductId)
      console.log(cartProductSeller)
      const addBuyTrans = await Axios.patch(`users/${userId}/buy_trans/${oldYearFormattedString}/${cartProductId}.json`, {[cartProductSeller]: qty})
      const addSellTrans = await Axios.patch(`users/${cartProductSeller}/sell_trans/${oldYearFormattedString}/${cartProductId}.json`, {[userId]: qty})
      const deleteCart = await Axios.delete(`users/${userId}/cart.json`)

    
    }

    
  }
      
    }// end if 

}

}







// When we change to new year, we want to

// Loop through all available users(students), and for each user, we want to:

// See if there are items inside the cart records, if there is,

// For each item,
// 1. Change the record from cart to buy_trans of this user
// 2. Add the this record to sell_trans of the seller (user whom this user bought from)