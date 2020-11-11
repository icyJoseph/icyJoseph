import axios from "axios";
import Cookies from "cookies";

const submit2AirTable = async (form, timestamp) => {
  const { empty: _omit, secret: __omit, ...rest } = form;

  const submitFields = {
    ...rest,
    Email: rest.Email.toLowerCase()
  };

  // get submissions done with the same email
  const data = await axios.get(
    `https://api.airtable.com/v0/appXoTkMgNAIp7f2O/Contact?filterByFormula=${encodeURI(
      `({Email}='${submitFields.Email}')`
    )}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.AIRTABLE_KEY}`
      }
    }
  );

  const unanswered = data.records.find(
    ({ fields }) => fields.Status === "Todo"
  );

  if (unanswered) {
    return {
      submitted: unanswered.fields.Submitted,
      email: unanswered.fields.Email
    };
  }

  await axios.post(
    "https://api.airtable.com/v0/appXoTkMgNAIp7f2O/Contact",
    {
      records: [
        { fields: { ...submitFields, Submitted: timestamp, Status: "Todo" } }
      ]
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.AIRTABLE_KEY}`,
        "Content-Type": "application/json"
      }
    }
  );

  return { submitted: timestamp, email: submitFields.email };
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
    const timestamp = new Date().getTime();
    const { submitted, email } = await submit2AirTable(form.timestamp);

    if (timestamp !== submitted) {
      return res.send({ error: "Give me some time to respond to your previous message." });
    }

    cookies.set("session", JSON.stringify({ ...parsed, email, submitted }), {
      httpOnly: true,
      secure: true,
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
