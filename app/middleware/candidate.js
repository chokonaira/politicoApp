import db from '../models/db'
const candidateMiddleware = {
    async officeExists(req, res, next) {
        const { officeId } = req.body;
        const dbClient = await db.connect();
        try {
            const text = 'SELECT * FROM offices WHERE id = $1'
            const values = [officeId];
            const office = await dbClient.query({ text, values });
            if (!office.rowCount) {
                return res.status(404).json({
                    status: 404,
                    error: `No office with id: ${officeId} exits`,
                });
            }
        } catch (err) {
            return;
        } finally {
            await dbClient.release();
        }
        next();
    },

    async partyExists(req, res, next) {
        const { partyId } = req.body;
        const dbClient = await db.connect();
        try {
            const text = 'SELECT * FROM parties WHERE id = $1'
            const values = [partyId];
            const party = await dbClient.query({ text, values });
            if (!party.rowCount) {
                return res.status(404).json({
                    status: 404,
                    error: `No party with id: ${partyId} exits`,
                });
            }
        } catch (err) {
            return;
        } finally {
            await dbClient.release();
        }
        next();
    },

    async userExists(req, res, next) {
        const { userId } = req.body;
        const dbClient = await db.connect();
        try {
            const text = 'SELECT * FROM users WHERE id = $1'
            const values = [userId];
            const user = await dbClient.query({ text, values });
            if (!user.rowCount) {
                return res.status(404).json({
                    status: 404,
                    error: `No user with id: ${userId} exits`,
                });
            }
        } catch (err) {
            return;
        } finally {
            await dbClient.release();
        }
        next();
    },

    async isCandidateRegistered(req, res, next) {
        const { userId } = req.body;
        const dbClient = await db.connect();
        try {
            const text = 'SELECT * FROM candidates WHERE candidate = $1'
            const values = [userId];
            const candidate = await dbClient.query({ text, values });
            if (candidate.rowCount) {
                return res.status(404).json({
                    status: 404,
                    error: `Candidate already registered for an office`,
                });
            }
        } catch (err) {
            return;
        } finally {
            await dbClient.release();
        }
        next();
    },

    async isFieldEmpty(req, res, next) {
        const { officeId, userId } = req.body;

        if (officeId === null) {
            return res.status(400).json({
                status: 400,
                errors: "Office id is a required field",
            })
        } else if(userId === null) {
            return res.status(400).json({
                status: 400,
                errors: "User id is a required field",
            });
        }
        next();
    }

}

export default candidateMiddleware