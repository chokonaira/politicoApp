import partyDb from '../db/parties';

const partyController = {
  createParty(req, res) {
    // use object destructuring to get values contained in body
    const { name, hqAddress, logoUrl } = req.body;
    // Validation: check if any of the required fields is empty of not provided
    if (!name || !hqAddress || !logoUrl) {
      return res.send({ status: 400, error: 'Kindly enter all fields' });
    }
    // generate id
    const id = partyDb.length + 1;
    req.body.id = id;
    // insert record into db
    partyDb.push(req.body);
    // now format response to be sent
    const response = { status: 201, data: [partyDb[id - 1]] };
    return res.send(response);
  },

  getParties(req, res) {
    // send all the parties inside the partyDb object as response
    return res.send({ status: 200, data: partyDb });
  },

  getParty(req, res) {
    // get the partyId from the url sent via GET
    const { partyId } = req.params;
    // loop through all the parties inside the partyDb
    for (let i = 0; i < partyDb.length; i += 1) {
      // get the party with id that equals the partyId sent via url
      // use parseInt to convert string of number to a real number in base 10
      if (partyDb[i] === parseInt(partyId, 10)) {
        // return that party
        return res.send({ status: 200, data: [partyDb[i]] });
      }
    }
    // if partyId sent doesnt match party id, send a party not found error
    return res.send({ status: 404, error: `Party with id ${partyId} not found` });
  },

   
};

export default partyController;
