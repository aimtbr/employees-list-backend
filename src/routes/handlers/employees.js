const { Employees } = require('../../db/models');


const schemaProps = Object.keys(Employees.schema.paths);

module.exports = {
  getManyEmployees: async (req, res) => {
    try {
      const { limit, skip, sort } = req.query;
      const filter = { deleted: false };
      const limitCasted = parseInt(limit, 10) || 0;
      const skipCasted = parseInt(skip, 10) || 0;
      const sortCasted = (sort && JSON.parse(sort)) || { dateAdded: -1 };

      const result = await Employees.find(filter)
        .limit(limitCasted)
        .skip(skipCasted)
        .sort(sortCasted);

      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ error });
    }
  },
  addOneEmployee: async (req, res) => {
    try {
      const doc = await Employees.create({});

      return res.status(200).send(doc);
    } catch (error) {
      return res.status(500).json({ error });
    }
  },
  editOneEmployee: async (req, res) => {
    try {
      const { body, params } = req;
      const { id } = params;
      const query = { _id: id };

      const bodyKeys = Object.keys(body);
      const everyPropExist = bodyKeys.every((key) => schemaProps.includes(key));

      if (!everyPropExist) {
        return res.status(400).json({ error: 'Invalid key' });
      }

      await Employees.updateOne(query, body);

      return res.sendStatus(200);
    } catch (error) {
      return res.status(500).json({ error });
    }
  },
  deleteOneEmployee: async (req, res) => {
    try {
      const { id } = req.params;
      const query = { _id: id };
      const options = { new: true };

      await Employees.updateOne(query, { deleted: true }, options);

      return res.sendStatus(200);
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
};