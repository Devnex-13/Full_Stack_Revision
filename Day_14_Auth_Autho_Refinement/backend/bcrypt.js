const bcrypt = require("bcrypt")

a = "Niku@123"

const pass = async () => { 
  const hashed = await bcrypt.hash(a,10)  
  console.log(hashed)
 }

pass()