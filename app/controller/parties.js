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
      if (partyDb[i].id === parseInt(partyId, 10)) {
        // return that party
        return res.send({ status: 200, data: [partyDb[i]] });
      }
    }
    // if partyId sent doesnt match party id, send a party not found error
    return res.send({ status: 404, error: `Party with id ${partyId} not found` });
  },
  updateParty(req, res) {
    // get partyId from url sent via GET e.g politico.com/api/v1/parties/10
    const { partyId } = req.params;
    // get values of all the input field sent via POST
    const { name, hqAddress, logoUrl } = req.body;
    // return validation error if any of the expected fields are missing
    if (!name || !hqAddress || !logoUrl) {
      return res.send({ status: 400, error: 'All fields are required' });
    }
    // loop through the party db and get the record
    // that has the same id as the one supplied in the url
    for (let i = 0; i < partyDb.length; i += 1) {
      if (partyDb[i].id === parseInt(partyId, 10)) {
        // if found, update its properties with the new ones entered on the form
        partyDb[i].name = name;
        partyDb[i].hqAddress = hqAddress;
        partyDb[i].logoUrl = logoUrl;
        // return Success response
        return res.send({ status: 200, data: [partyDb[i]] });
      }
    }
    // if not found, return not found error
    return res.send({ status: 404, error: `Party with id of ${partyId} not found` });
  },
  deleteParty(req, res) {
    // get partyId from url sent via GET e.g politico.com/api/v1/parties/10
    const { partyId } = req.params;
    // loop through the party db and get the record
    // that has the same id as the one supplied in the url
    for (let i = 0; i < partyDb.length; i += 1) {
      if (partyDb[i].id === parseInt(partyId, 10)) {
        // if found, remove the record from the db and return Success response
        partyDb.splice(partyDb[i].id - 1, 1);
        return res.send({ status: 204, data: [{ message: 'Party deleted succesfully' }] });
      }
    }
    // if not found, return a not found error
    return res.send({ status: 404, error: `Party with id of ${partyId} not found` });
  },
};

export default partyController;
