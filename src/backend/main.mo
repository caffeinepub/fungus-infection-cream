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

  // Public order placement - no authorization needed (anyone can place orders)
  public shared ({ caller }) func placeOrder(
    name : Text,
    phone : Text,
    address : Text,
    pincode : Text,
    quantity : Nat,
    totalPrice : Nat,
  ) : async () {
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
  };

  // Admin-only: View all orders
  public query ({ caller }) func getAllOrders() : async [Order] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view all orders");
    };
    ordersList.values().toArray();
  };

  // Admin-only: Get order count
  public query ({ caller }) func getOrderCount() : async Nat {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can get order count");
    };
    ordersList.size();
  };
};
