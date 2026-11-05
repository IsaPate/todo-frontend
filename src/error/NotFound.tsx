import type { Status } from "./types";
export default function NotFound({ word }: { word: string }) {
  return <h1>{`${word} not Found`}</h1>;
}
