const { Employees } = require('../../db/models');


const schemaProps = Object.keys(Employees.schema.paths);

module.exports = {
  getManyEmployees: async (req, res) => {
    const { limit, skip } = req.query;
    const filter = { deleted: false };
    const limitCasted = parseInt(limit, 10) || 0;
    const skipCasted = parseInt(skip, 10) || 0;

    const result = await Employees.find(filter)
      .limit(limitCasted)
      .skip(skipCasted)
      .catch((error) => res.status(400).json({ error }));

    return res.status(200).json(result);
  },
  addOneEmployee: async (req, res) => {
    const doc = await Employees.create({})
      .catch((error) => res.status(400).json({ error }));

    return res.status(200).send(doc._id);
  },
  editOneEmployee: async (req, res) => {
    const { body, params } = req;
    const { id } = params;
    const query = { _id: id };

    const bodyKeys = Object.keys(body);
    const everyPropExist = bodyKeys.every((key) => schemaProps.includes(key));

    if (!everyPropExist) {
      return res.status(400).json({ error: 'Invalid key' });
    }

    await Employees.updateOne(query, body)
      .catch((error) => res.status(400).json({ error }));

    return res.sendStatus(200);
  },
  deleteOneEmployee: async (req, res) => {
    const { id } = req.params;
    const query = { _id: id };
    const options = { new: true };

    await Employees.updateOne(query, { deleted: true }, options)
      .catch((error) => res.status(400).json({ error }));

    return res.sendStatus(200);
  }
};