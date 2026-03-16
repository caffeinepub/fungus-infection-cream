import List "mo:core/List";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import Order "mo:core/Order";
import Array "mo:core/Array";

actor {
  type Inquiry = {
    name : Text;
    phone : Text;
    message : Text;
  };

  module Inquiry {
    public func compare(inquiry1 : Inquiry, inquiry2 : Inquiry) : Order.Order {
      Text.compare(inquiry1.name, inquiry2.name);
    };
  };

  let inquiries = List.empty<Inquiry>();
  let adminWhitelist = List.singleton(Principal.fromText("2vxsx-fae"));

  func isAdmin(caller : Principal) : Bool {
    adminWhitelist.values().contains(caller);
  };

  public shared ({ caller }) func submitInquiry(name : Text, phone : Text, message : Text) : async () {
    let inquiry : Inquiry = {
      name;
      phone;
      message;
    };
    inquiries.add(inquiry);
  };

  public query ({ caller }) func getAllInquiries() : async [Inquiry] {
    if (not isAdmin(caller)) {
      Runtime.trap("Access denied. Only admin users can access all inquiries.");
    };
    inquiries.values().toArray().sort();
  };
};
