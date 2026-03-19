import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useActor } from "./useActor";

export function usePlaceOrder() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      name,
      phone,
      address,
      pincode,
      quantity,
      totalPrice,
    }: {
      name: string;
      phone: string;
      address: string;
      pincode: string;
      quantity: bigint;
      totalPrice: bigint;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.placeOrder(
        name,
        phone,
        address,
        pincode,
        quantity,
        totalPrice,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["orderCount"] });
    },
  });
}

export function useGetAllOrders() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllOrders();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetOrderCount() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["orderCount"],
    queryFn: async () => {
      if (!actor) return BigInt(0);
      return actor.getOrderCount();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useIsAdmin() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["isAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useIsPhoneBlocked(phone: string) {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["isPhoneBlocked", phone],
    queryFn: async () => {
      if (!actor) return false;
      return (actor as any).isPhoneBlocked(phone);
    },
    enabled: !!actor && !isFetching && phone.length === 10,
  });
}

export function useAllowPhone() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (phone: string) => {
      if (!actor) throw new Error("Not connected");
      return (actor as any).allowPhone(phone);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["isPhoneBlocked"] });
    },
  });
}

export function useGetWhatsAppApiKeySet() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["whatsappApiKeySet"],
    queryFn: async () => {
      if (!actor) return false;
      return (actor as any).getWhatsAppApiKeySet();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSetWhatsAppApiKey() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (key: string) => {
      if (!actor) throw new Error("Not connected");
      return (actor as any).setWhatsAppApiKey(key);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["whatsappApiKeySet"] });
    },
  });
}
