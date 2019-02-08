import db from '../models/db'

const partyController = {
  async createParty(req, res) {
    const { name, hqAddress, logoUrl } = req.body;
    const dbClient = await db.connect()
    try {
      const text = 'INSERT INTO parties (name, hqAddress, logoUrl) VALUES ($1, $2, $3) RETURNING * '
      const values = [name, hqAddress, logoUrl]
      let party = await dbClient.query({ text, values })
      if (party.rowCount) {
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

  async getParties(req, res) {
    const dbClient = await db.connect()
    try {
      const text = 'SELECT * FROM parties'
      let party = await dbClient.query({ text })
      if (party.rowCount) {
        const { rows } = party
        return res.status(200).json({
          status: 200, data: [rows],
        });
      }
      return res.status(200).json({ status: 200, data: [] });
    } catch (e) {
      return res.status(500).json({ status: 500, message: 'Internal server error' });
    } finally {
      dbClient.release()
    }
  },

  async getParty(req, res) {
    const { partyId } = req.params;
    const dbClient = await db.connect()
    try {
      const text = 'SELECT * FROM parties WHERE id = $1 LIMIT 1'
      const values = [partyId]
      let party = await dbClient.query({ text, values })
      if (party.rowCount) {
        const { rows } = party
        return res.status(200).json({
          status: 200, data: [rows[0]],
        });
      }
      return res.status(400).json({ status: 400, message: `No party with id: ${partyId} was found` });
    } catch (e) {
      return res.status(500).json({ status: 500, message: 'Internal server error' });
    } finally {
      dbClient.release()
    }
  },
  async updateParty(req, res) {
    const { partyId } = req.params;
    const { name, logoUrl, hqAddress } = req.body
    const dbClient = await db.connect()
    try {
      const text = 'UPDATE parties SET name = $1, hqAddress = $2, logoUrl = $3 WHERE id = $4 RETURNING *'
      const values = [name, hqAddress, logoUrl, partyId]
      let party = await dbClient.query({ text, values })
      if (party.rowCount) {
        const { rows } = party
        return res.status(200).json({
          status: 200, data: [rows[0]],
        });
      }
      return res.status(500).json({ status: 500, message: "Unable to update party" });
    } catch (e) {
      return res.status(500).json({ status: 500, message: 'Internal server error' });
    } finally {
      dbClient.release()
    }
  },
  async deleteParty(req, res) {

    const { partyId } = req.params;
    const dbClient = await db.connect()
    try {
      const text = 'DELETE FROM parties WHERE id = $1 RETURNING id'
      const values = [partyId]
      let party = await dbClient.query({ text, values })
      if (party.rowCount) {
        const { rows } = party
        return res.status(204).json({
          status: 204, data: [{ message: 'Party deleted succesfully' }]
        });
      }
      return res.status(400).json({ status: 400, message: `No party with id: ${partyId} was found` });
    } catch (e) {
      return res.status(500).json({ status: 500, message: 'Internal server error' });
    } finally {
      dbClient.release()
    }
  },
};

export default partyController;
