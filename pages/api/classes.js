export default async function handler(req, res) {
  const { method } = req;

  try {
    switch (method) {
      case "GET": {
        /* find all the data in our database */
        const classes = [
          "4eA",
          "4eB",
          "3eA",
          "3eB",
          "2NDE",
          "1ERE",
          "TERM",

          "BTS 1",
          "BTS 2",

          "CAP 1 CHARP BOIS + IS",
          "CAP 1 MACON +IMTB",
          "CAP 2 CHARP BOIS + is",
          "CAP 2 MACON + IMTB",
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
