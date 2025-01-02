export class LRUCache<T> {
  private readonly cache: Map<string, T>

  private capacity: number

  constructor(capacity: number) {
    this.cache = new Map()
    this.capacity = Math.max(capacity, 1)
  }

  public get(key: string): T | undefined {
    const value = this.cache.get(key)

    if (value === undefined) {
      return undefined
    }

    // Reset the position
    this.cache.set(key, value)

    return value
  }

  public set(key: string, value: T): void {
    /** Delete in case it already exists so that setting corrects the position */
    this.cache.delete(key)
    this.cache.set(key, value)

    // Prune if necessary
    if (this.cache.size > this.capacity) {
      this.prune()
    }
  }

  public setCapacity(capacity: number | undefined): void {
    if (capacity !== undefined && capacity !== this.capacity) {
      this.capacity = Math.max(capacity, 1)
      while (this.capacity < this.cache.size) {
        this.prune()
      }
    }
  }

  private prune(): void {
    // Oldest keys are first in the list
    for (const [key] of this.cache) {
      this.cache.delete(key)
      return
    }
  }
}
