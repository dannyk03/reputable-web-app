import makeString from "./randomString";

export default function makeAvatar(seed: string = makeString(8)) {
  return `https://avatars.dicebear.com/api/adventurer-neutral/${encodeURIComponent(
    seed
  )}.svg`;
}
