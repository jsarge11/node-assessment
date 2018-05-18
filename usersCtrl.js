const data = require('./userData.json');

module.exports = {
 read: (req, res) => {
  let { age, lastname, email, favorites} = req.query;

  if (age) {
   let newArr = data.filter(item => {
     return item.age < age;
   })
   res.status(200).send(newArr);
  }
  else if (lastname) {
   let newArr = data.filter(item => {
     return item.last_name === lastname;
   })
   res.status(200).send(newArr);
  }
  else if (email) {
   let newArr = data.filter(item => {
     return item.email === email;
   })
   res.status(200).send(newArr);
  }

  else if (favorites) {
   let newArr = data.filter(item => {
    if (item.favorites.includes(favorites)) {
     return item;
    }
  })

  res.status(200).send(newArr);
 }
  else {
   res.status(200).send(data);
  }
 },
 readID: (req, res) => {
  let { userId } = req.params;
  let newObj = {}
  let found = false;

  data.forEach(item => {
   if (item.id === +userId) {
    found = true;
    Object.assign(newObj, item);
   } 
  })

  console.log('User:', newObj);
  if (found) {
   res.status(200).send(newObj);
  }
  else {
   res.status(404).json(null);
  }
 },
 admins: (req, res) => {
  let newArr = data.filter(item => {
   if (item.type === "admin") {
    return item;
   }
  })

  res.status(200).send(newArr);
 },
 nonadmins: (req, res) => {
  let newArr = data.filter(item => {
   if (item.type !== "admin") {
    return item;
   }
  })

  res.status(200).send(newArr);
 },
 readtype: (req, res) => {
   let newArr = data.filter(item => {
    if (item.type === req.params.type) {
     return item;
    }
   })
   res.status(200).send(newArr);
  },
  update: (req, res) => {
   let { id } = req.body;
   data.find((item, i, arr) => {
    if (item.id === +id) {
     Object.assign(arr[i], req.body);
    }
   })
   
   res.status(200).send(data);
  },
  create: (req, res) => {
   let id = data.length;
   let {first_name, last_name, email, gender, language, age, city, state, type, favorites} = req.body;

   let newObj = {
    id: ++id,
    first_name: first_name,
    last_name: last_name,
    email: email,
    gender: gender,
    language: language,
    age: age,
    city: city,
    state: state,
    type: type,
    favorites: favorites
   }

   data.push(newObj);

   res.status(200).send(data);
  },
  delete: (req, res) => {
   let { userId } = req.params;
   data.forEach((item, i, arr) => {
    if (item.id === +userId) {
     arr.splice(i, 1);
    }
   })
   res.status(200).send(data);
  }
}