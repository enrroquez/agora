//this is our friendsWananbees mini-reducer!

export default function friends(friends=[], action){
//friends=[] is the default value

//we you do in here must MAKE copies of everything

if(action.type==="friends-wannabees/accept"){



    return friends;

}

// avoid mutation

// var obj ={
//     name:"Layla"
// }

//#1 the Spread Operator (works for objects and arrays)

// var newObj = {...obj};
// var coolObj = {...obj, breed:"Bichon"};

// var= arr = [1,2,3];
// var newArr = [...arr];
// var coolArr =[...arr, 4, 5];

//#2 MAP (works only on arrays)
//useful for cloning, looping and changing each element in the
//array. This is a loop that by default returns a new array


//#3 FILTER (works only on arrays)
//amazing for removing things from an array, this is also a loop
//that creates a copy of the array you are looping on and THEN
//removes things from the copy 

//slice (mutates) we need to separate

//1 server.js
// useselect
// empty array
//2, 3, 4 request query frmo server, go back to

