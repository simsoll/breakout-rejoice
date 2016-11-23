export interface Factory<T> {
    create(x: number, y: number): T;
}