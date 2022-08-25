export default async function handler(req, res) {
  const { method } = req;

  try {
    switch (method) {
      case "GET": {
        /* find all the data in our database */
        const classes = [
          "4eme A",
          "4eme B",
          "3eme A",
          "3eme B",
          "2nde",
          "1ere",
          "Termiale",

          "BTS 1",
          "BTS 2",

          "CAP 1 ISCH",
          "CAP 1 MacMBC",
          "CAP 2 ISCH",
          "CAP 2 Mac MBC",
        ];

        res.status(200).json(classes);
        break;
      }
      default:
        res.status(400).json({ success: false });
        break;
    }
  } catch (error) {
    res.status(400).json({ error });
  }
}
