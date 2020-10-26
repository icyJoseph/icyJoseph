import axios from "axios";
import Cookies from "cookies";

import { buildMissionName } from "utils/missionName";

export default async (req, res) => {
  if (req.method !== "POST") {
    res.writeHead(401);
    return res.end("No");
  }

  const cookies = new Cookies(req, res, { keys: [process.env.CRYPTO_KEY] });

  const session = cookies.get("session", { signed: true });

  if (!session) {
    res.writeHead(401);
    return res.end();
  }

  const form = req.body;
  const { empty, secret, ...rest } = form;
  // empty field was filled
  if (empty) {
    res.writeHead(401);
    return res.end();
  }

  const parsed = JSON.parse(session);
  const visible = buildMissionName(parsed);

  // secret was copy pasted
  if (secret !== visible) {
    return res.send({ error: "secret" });
  }

  // save to airtable
  let submitted = new Date().getTime();

  try {
    const fields = {
      ...rest,
      Email: rest.Email.toLowerCase()
    };

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
      submitted = fields.Submitted ?? submitted;
    } else {
      await axios.post(
        "https://api.airtable.com/v0/appXoTkMgNAIp7f2O/Contact",
        {
          records: [
            { fields: { ...fields, Submitted: submitted, Status: "Todo" } }
          ]
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.AIRTABLE_KEY}`,
            "Content-Type": "application/json"
          }
        }
      );
    }
  } catch (e) {
    res.writeHead(502);
    return res.end();
  }

  cookies.set("session", JSON.stringify({ ...parsed, submitted }), {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    signed: true
  });

  res.writeHead(200);
  return res.end();
};
