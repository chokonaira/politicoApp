import officeDb from '../db/offices';

const officeController = {
  createOffice(req, res) {
    const { type, name } = req.body;
    if (!name || !type) {
      return res.send({ status: 400, error: 'Kindly enter all fields' });
    }
    const id = officeDb.length + 1;
    req.body.id = id;
    officeDb.push(req.body);
    const response = { status: 201, data: [officeDb[id - 1]] };
    return res.send(response);
  },
  
  getOffices(req, res) {
    return res.send({ status: 200, data: officeDb });
  },

 
};

export default officeController;