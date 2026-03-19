import List "mo:core/List";
import Nat "mo:core/Nat";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Text "mo:core/Text";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  // Initialize the authorization system
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  let ordersList = List.empty<Order>();

  // Track phones that have placed an order and are blocked from ordering again
  let blockedPhones = Map.empty<Text, Bool>();

  // Kept for stable variable compatibility with previous version
  var whatsappApiKey : Text = "";

  // Telegram Bot credentials (hardcoded)
  let telegramBotToken : Text = "8507017044:AAEE6elpZNycv5DLf1xhgp9fs1DorHzadAA";
  let telegramChatId : Text = "8082050615";

  type Order = {
    name : Text;
    phone : Text;
    address : Text;
    pincode : Text;
    quantity : Nat;
    totalPrice : Nat;
    timestamp : Int;
  };

  // IC Management canister for HTTP outcalls
  type HttpHeader = { name : Text; value : Text };
  type HttpMethod = { #get; #post; #head };
  type HttpRequest = {
    url : Text;
    max_response_bytes : ?Nat64;
    headers : [HttpHeader];
    body : ?[Nat8];
    method : HttpMethod;
    transform : ?{ function : shared ({ response : HttpResponse; context : [Nat8] }) -> async HttpResponse; context : [Nat8] };
  };
  type HttpResponse = {
    status : Nat;
    headers : [HttpHeader];
    body : [Nat8];
  };

  let ic = actor "aaaaa-aa" : actor {
    http_request : HttpRequest -> async HttpResponse;
  };

  // Send Telegram notification when a new order is placed
  func sendTelegramNotification(order : Order) : async () {
    let msg = "Naya Order!%0A" #
      "Naam: " # order.name # "%0A" #
      "Phone: " # order.phone # "%0A" #
      "Pata: " # order.address # "%0A" #
      "PIN: " # order.pincode # "%0A" #
      "Maatra: " # order.quantity.toText() # "%0A" #
      "Kimat: Rs." # order.totalPrice.toText();
    let url = "https://api.telegram.org/bot" # telegramBotToken # "/sendMessage?chat_id=" # telegramChatId # "&text=" # msg;
    try {
      let _response = await ic.http_request({
        url = url;
        max_response_bytes = ?2000;
        headers = [];
        body = null;
        method = #get;
        transform = null;
      });
    } catch (_e) {
      // Silently fail if Telegram notification fails
    };
  };

  // Legacy no-op: kept for frontend compatibility
  public shared func setWhatsAppApiKey(_key : Text) : async () {
    // Telegram is hardcoded, no setup needed
  };

  // Telegram is always configured, so return true
  public query func getWhatsAppApiKeySet() : async Bool {
    true
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
  public shared func placeOrder(
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
    // Send Telegram notification
    ignore sendTelegramNotification(newOrder);
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
