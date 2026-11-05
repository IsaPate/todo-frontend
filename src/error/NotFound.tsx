import type { Status } from "./types";
export default function NotFound({ word }: { word: string }) {
  if (word === "Server-Error") {
    return <h1>Server error</h1>;
  }
  return <h1>{`${word} not Found`}</h1>;
}
