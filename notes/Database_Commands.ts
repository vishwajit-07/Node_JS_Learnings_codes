

edit

{
  "name": "John Doe",
  "age": 30,
  "city": "New York",
  "isStudent": false
}


db.user.insertMany([

{
  "name": "John Doe",
  "age": 30,
  "city": "New York",
  "isStudent": false
},

{
  "name": "ANdrew",
  "age": 20,
  "city": "New York",
  "isStudent": false
},

{
  "name": "Jeff",
  "age": 40,
  "city": "New York",
  "isStudent": false
},

{
  "name": "Breden",
  "age": 30,
  "city": "New York",
  "isStudent": false
}




])

// $push $pull- used in array to add orremvoe elements
  {
    _id: ObjectId('699e855f7ace763ac48563b3'),
    name: 'ANdrew',
    age: 20,
    city: 'New York',
    isStudent: false,
    skills: [ 'React', 'JS', 'Next JS', 'AI' ]
  },
  {
    _id: ObjectId('699e855f7ace763ac48563b4'),
    name: 'Jeff',
    age: 40,
    isStudent: false,
    skills: [ 'React', 'JS', 'Next JS', 'AI' ]
  },


//
updateOne()

$set method- used to add new field or to change existing field data
$unset- used tp remove field

updateMany()


db.user.updateOne({"name":"John Doe"},{$set:{"city":"California"}})
db.user.updateOne({"name":"John Doe"},{$set:{"role":"MERN Stack Engineer"}})

db.user.updateMany({"city":"New York"},{$set:{"role":"Developers"}})




db.user.updateOne({},{$set:{"isOnRole":true}})

db.user.updateMany({},{$set:{"isOnRole":true}})

// $unset
db.user.updateMany({},{$unset:{"role":""}})

//
db.user.updateOne({"name":"Jeff"},{$unset:{"city":""}})



db.user.updateMany({},{$set:{"skills":["React","JS","Next JS","AI"]}})

// $push $pull- used in array to add orremvoe elements

db.user.updateOne({"name":"Jeff"},{$set:{"skills":"Node JS"}})




db.user.updateOne({"name":"ANdrew"},{$push:{"skills":"Express JS"}})

db.user.updateOne({"name":"ANdrew"},{$pull:{"skills":"Next JS"}})



db.user.updateOne({},{$push:{"skills":{$each:["tailwindcss","Redux"]}}})

db.user.updateMany({},{$pull:{"skills":{$in:["AI","JS"]}}})

db.Users.updateMany(
  {},
  { $pull: { skills: { $in: ["ReactJS", "AWS"] } } }
);





db.user.updateMany({},{$push:{"skills":{$each:["HTML","CSS"]}}})