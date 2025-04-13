export type Period = "daily" | "weekly" | "monthly"

export interface Range {
    start: Date,
    end: Date
}

export interface Stat {
    title: string,
    icon: string,
    variation: number,
    value: string | number,
    formatter?: (value: number) => string,
}