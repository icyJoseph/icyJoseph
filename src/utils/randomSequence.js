import crypto from "crypto";
import { promisify } from "util";

const randomBytesPromise = promisify(crypto.randomBytes);

export const randomSequence = async () => {
  const sequence = await Promise.all([
    randomBytesPromise(2),
    randomBytesPromise(2)
  ]);

  return sequence.map((buffer) => buffer.toString("hex")).join(" ");
};
