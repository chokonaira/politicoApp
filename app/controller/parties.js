import partyDb from '../db/parties'

const partyController = {
  createParty(req, res){
    //use object destructuring to get values contained in body
    const { name, hqAddress, logoUrl } = req.body
    //Validation: check if any of the required fields is empty of not provided
    if(!name || !hqAddress || !logoUrl){
      return res.send({"status": 400, "error": "Kindly enter all fields"})
    }else{
      //generate id
      const id = partyDb.length + 1
      req.body.id = id
      //insert record into db
      partyDb.push(req.body)
      //now format response to be sent
      const response = {"status": 201, "data": [partyDb[id - 1]]}
      return res.send(partyDb)
      console.log('server is running');
    }
    

  }

}

export default partyController