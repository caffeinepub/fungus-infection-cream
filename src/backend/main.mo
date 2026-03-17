import List "mo:core/List";
import Nat "mo:core/Nat";

import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Iter "mo:core/Iter";
import Array "mo:core/Array";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

 actor {
  // Initialize the authorization system
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  let ordersList = List.empty<Order>();

  // Track phones that have placed an order and are blocked from ordering again
  let blockedPhones = Map.empty<Text, Bool>();

  type Order = {
    name : Text;
    phone : Text;
    address : Text;
    pincode : Text;
    quantity : Nat;
    totalPrice : Nat;
    timestamp : Int;
  };

  // User profile type as required by instructions
  public type UserProfile = {
    name : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  // Required user profile functions
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Check if a phone number is blocked from placing a new order
  public query func isPhoneBlocked(phone : Text) : async Bool {
    switch (blockedPhones.get(phone)) {
      case (?true) { true };
      case _ { false };
    };
  };

  // Admin unblocks a phone number to allow a new order
  public shared func allowPhone(phone : Text) : async () {
    blockedPhones.add(phone, false);
  };

  // Public order placement - blocks phone after successful order
  public shared ({ caller }) func placeOrder(
    name : Text,
    phone : Text,
    address : Text,
    pincode : Text,
    quantity : Nat,
    totalPrice : Nat,
  ) : async () {
    // Check if phone is blocked
    switch (blockedPhones.get(phone)) {
      case (?true) {
        Runtime.trap("Phone number is blocked from placing orders until admin approves.");
      };
      case _ {};
    };
    let newOrder : Order = {
      name;
      phone;
      address;
      pincode;
      quantity;
      totalPrice;
      timestamp = Time.now();
    };
    ordersList.add(newOrder);
    // Block this phone from placing another order until admin allows
    blockedPhones.add(phone, true);
  };

  // View all orders - protected by frontend password check
  public query func getAllOrders() : async [Order] {
    ordersList.values().toArray();
  };

  // Get order count - protected by frontend password check
  public query func getOrderCount() : async Nat {
    ordersList.size();
  };
};
