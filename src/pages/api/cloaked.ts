import { NextApiRequest, NextApiResponse } from "next";

import Stegcloak from "stegcloak";
import Cookies from "cookies";

import { randomSequence } from "utils/randomSequence";

const noSession = Object.freeze({ submitted: null, email: null });

export const cloaked = async (req: NextApiRequest, res: NextApiResponse) => {
  const cookies = new Cookies(req, res, {
    keys: [process.env.CRYPTO_KEY],
    secure: true
  });

  const sessionCookie = cookies.get("session", { signed: true });

  let session;

  try {
    session = sessionCookie ? JSON.parse(sessionCookie) : noSession;
  } catch (e) {
    session = noSession;
  }

  const sequence = await randomSequence();

  const cookie = JSON.stringify({ ...session, sequence });

  cookies.set("session", cookie, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    signed: true
  });

  const stegcloak = new Stegcloak(true, true);

  const cloaked = stegcloak.hide(cookie, process.env.CLOAK_PASSWORD, sequence);

  return res.json({ cloaked });
};

export default cloaked;
