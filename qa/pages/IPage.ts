export interface IPage {
    isLoaded(): void
    open(url: string): void
}