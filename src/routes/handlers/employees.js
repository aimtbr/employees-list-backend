const { Employees } = require('../../db/models');


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

    res.status(200).json(result);
  },
  addOneEmployee: async (req, res) => {
    const doc = await Employees.create({})
      .catch((error) => res.status(400).json({ error }));

    res.status(200).send(doc._id);
  },
  editOneEmployee: async (req, res) => {
    const { body, params } = req;
    const { id } = params;
    const query = { _id: id };
    const options = { new: true };

    const schemaProps = Object.keys(Employees.schema.paths);
    const bodyKeys = Object.keys(body);
    const everyPropExist = bodyKeys.every((key) => schemaProps.includes(key));

    if (!everyPropExist) {
      res.status(400).json({ error: 'Invalid key' });
    }

    const modifiedDoc = await Employees.updateOne(query, body, options)
      .catch((error) => res.status(400).json({ error }));

    res.status(200).json(modifiedDoc);
  },
  deleteOneEmployee: async (req, res) => {
    const { id } = req.params;
    const query = { _id: id };
    const options = { new: true };

    await Employees.updateOne(query, { deleted: true }, options)
      .catch((error) => res.status(400).json({ error }));

    res.status(200);
  }
};