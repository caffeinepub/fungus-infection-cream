import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Order {
    name: string;
    address: string;
    timestamp: bigint;
    quantity: bigint;
    phone: string;
    pincode: string;
    totalPrice: bigint;
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
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getAllOrders(): Promise<Array<Order>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getOrderCount(): Promise<bigint>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    isPhoneBlocked(phone: string): Promise<boolean>;
    allowPhone(phone: string): Promise<void>;
    placeOrder(name: string, phone: string, address: string, pincode: string, quantity: bigint, totalPrice: bigint): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
}
