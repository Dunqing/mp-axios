export function read(name: string): string | undefined {
  return document.cookie.match(new RegExp(`(^|;\\s*)(${name})=(.+);?`))?.[3]
}
