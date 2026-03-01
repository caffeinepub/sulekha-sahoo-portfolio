import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface Portfolio {
    id: string;
    title: string;
    imageData: ExternalBlob;
    order: bigint;
    category: string;
}
export interface UserProfile {
    name: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addPortfolioItem(portfolio: Portfolio): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    deletePortfolioItem(id: string): Promise<void>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getPortfolioItems(): Promise<Array<Portfolio>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    replacePortfolioItem(portfolio: Portfolio): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
}
