import db from '../models/db'
const candidateController = {
    async register(req, res){
        const { officeId, userId } = req.body;
        const dbClient = await db.connect()
        try {
            const text = `INSERT INTO candidates(office, candidate)
                          VALUES($1,$2) RETURNING *`;
            const values = [officeId, userId];
            let candidate = await dbClient.query({ text, values });
            if (candidate.rowCount) {
              candidate = candidate.rows[0];
              return res.status(201).json({
                status: 201, data: [candidate],
              });
            }
            return res.status(400).json({ status: 400, error: 'Check inputs and try again' });
          } catch (err) {
            return res.status(500).json({ status: 400, error: 'Internal server errorr' });
          } finally {
            await dbClient.release();
          }
    }
}

export default candidateController