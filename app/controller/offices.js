import officeDb from '../db/offices';

const officeController = {
  async createOffice(req, res) {
    const { name, hqAddress, logoUrl } = req.body;
    const dbClient = await db.connect()
    try {
      const text = 'INSERT INTO offices (name, hqAddress, logoUrl) VALUES ($1, $2, $3) RETURNING * '
      const values = [name, hqAddress, logoUrl]
      let office = await dbClient.query({ text, values })
      if (office.rowCount) {
        const { rows } = party
        return res.status(201).json({
          status: 201, data: [rows[0]],
        });
      }
      return res.status(500).json({ status: 500, message: 'Internal server error' });
    } catch (e) {
      return res.status(500).json({ status: 500, message: 'Internal server error' });
    } finally {
      dbClient.release()
    }
  },
  
  async getOffices(req, res) {
    const dbClient = await db.connect()
    try {
      const text = 'SELECT * FROM offices'
      let office = await dbClient.query({ text })
      if (office.rowCount) {
        const { rows } = party
        return res.status(200).json({
          status: 200, data: [rows],
        });
      }
      return res.status(400).json({ status: 400, data: [] });
    } catch (e) {
      return res.status(500).json({ status: 500, message: 'Internal server error' });
    } finally {
      dbClient.release()
    }
  },
  async getOffice(req, res) {
    const { officeId } = req.params;
    const dbClient = await db.connect()
    try {
      const text = 'SELECT * FROM offices WHERE id = $1 LIMIT 1'
      const values = [officeId]
      let office = await dbClient.query({ text, values })
      if (office.rowCount) {
        const { rows } = office
        return res.status(200).json({
          status: 200, data: [rows[0]],
        });
      }
      return res.status(400).json({ status: 400, message: `No office with id: ${officeId} was found` });
    } catch (e) {
      return res.status(500).json({ status: 500, message: 'Internal server error' });
    } finally {
      dbClient.release()
    }
  }
 
};

export default officeController;