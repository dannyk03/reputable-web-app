export default function makeAvatar(seed: string) {
  return `https://avatars.dicebear.com/api/adventurer-neutral/${encodeURIComponent(
    seed
  )}.svg`;
}
