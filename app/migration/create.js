import db from '../models/db'

const createUser = `Create TABLE IF NOT EXISTS Users(
  id SERIAL PRIMARY KEY,
  firstName VARCHAR(225) not null,
  lastName VARCHAR(225) not null,
  otherName VARCHAR(255) not null,
  email VARCHAR(255) UNIQUE not null,
  password VARCHAR(255) UNIQUE not null,
  phoneNumber VARCHAR(255) not null,
  passportUrl VARCHAR(255) not null,
  registered TIMESTAMP DEFAULT NOW(),
  isAdmin BOOLEAN DEFAULT false)`

  try{
    db.query(createUser).then((user)=>{
      console.log('Users table created')
    }).catch((err) =>{
      console.log('Users table creation failed: ', err)
    })
  }catch(e){
    console.log(e)
    throw e
  }
  

const createParty = `CREATE TABLE IF NOT EXISTS parties(
  id SERIAL PRIMARY KEY,
  name VARCHAR(225) not null,
  hqAddress VARCHAR(225) not null,
  logourl VARCHAR(225) not null
)`

db.query(createParty).then((party)=>{
  console.log('Party table created')
}).catch((err) =>{
  console.log('Party table creation failed: ', err)
})

const createOffice = `CREATE TABLE IF NOT EXISTS offices(
  id SERIAL PRIMARY KEY,
  name VARCHAR(225) not null,
  type VARCHAR(225) not null
)`

db.query(createOffice).then((office)=>{
  console.log('Offices table created')
}).catch((err) =>{
  console.log('Offices table creation failed: ', err)
})

const createCandidate = `CREATE TABLE IF NOT EXISTS candidates(
  id SERIAL PRIMARY KEY,
  candidate INT UNIQUE NOT NULL REFERENCES Users(id) ON DELETE CASCADE,
  office INT NOT null REFERENCES Offices(id) ON DELETE CASCADE
)`

db.query(createCandidate).then((candidate)=>{
  console.log('Candidates table created')
}).catch((err) =>{
  console.log('Candidates table creation failed: ', err)
})