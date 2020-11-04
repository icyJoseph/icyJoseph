import axios from "axios";
import Cookies from "cookies";

const submit2AirTable = async (form) => {
  const { empty: _omit, secret: __omit, ...rest } = form;

  const fields = {
    ...rest,
    Email: rest.Email.toLowerCase()
  };

  // get submissions done with the same email
  const records = await axios
    .get(
      `https://api.airtable.com/v0/appXoTkMgNAIp7f2O/Contact?filterByFormula=${encodeURI(
        `({Email}='${fields.Email}')`
      )}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.AIRTABLE_KEY}`
        }
      }
    )
    .then(({ data: { records } }) => records);

  if (records.length !== 0) {
    const [{ fields }] = records;
    return fields.Submitted;
  }

  const submitted = new Date().getTime();

  await axios.post(
    "https://api.airtable.com/v0/appXoTkMgNAIp7f2O/Contact",
    {
      records: [{ fields: { ...fields, Submitted: submitted, Status: "Todo" } }]
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.AIRTABLE_KEY}`,
        "Content-Type": "application/json"
      }
    }
  );

  return submitted;
};

export default async (req, res) => {
  if (req.method !== "POST") {
    res.writeHead(401);
    return res.end("No");
  }

  const cookies = new Cookies(req, res, {
    keys: [process.env.CRYPTO_KEY],
    secure: true
  });

  const session = cookies.get("session", { signed: true });

  if (!session) {
    res.writeHead(401);
    return res.end();
  }

  const form = req.body;
  const { empty, secret } = form;

  // empty field was filled
  if (empty) {
    res.writeHead(401);
    return res.end();
  }

  const parsed = JSON.parse(session);
  const visible = parsed.sequence;

  // secret was copy pasted
  if (secret !== visible) {
    return res.send({ error: "secret" });
  }

  try {
    const submitted = await submit2AirTable(form);

    cookies.set("session", JSON.stringify({ ...parsed, submitted }), {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      signed: true
    });

    res.writeHead(200);
    return res.end();
  } catch (e) {
    res.writeHead(502);
    return res.end();
  }
};
