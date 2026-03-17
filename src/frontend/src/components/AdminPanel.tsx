import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetAllOrders, useGetOrderCount } from "@/hooks/useQueries";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  Lock,
  LogOut,
  Package,
  ShieldCheck,
  ShoppingCart,
} from "lucide-react";
import { useState } from "react";

const ADMIN_PASSWORD = "741571";

interface AdminPanelProps {
  onBack: () => void;
}

function formatTimestamp(ts: bigint): string {
  const ms = Number(ts / BigInt(1_000_000));
  const date = new Date(ms);
  return date.toLocaleString("hi-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function AdminPanel({ onBack }: AdminPanelProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const { data: orders, isLoading: ordersLoading } = useGetAllOrders();
  const { data: orderCount } = useGetOrderCount();

  function handleLogin() {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("गलत password है, दोबारा डालें।");
    }
  }

  function handleLogout() {
    setIsAuthenticated(false);
    setPassword("");
    setError("");
  }

  if (!isAuthenticated) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center p-6"
        style={{ background: "var(--brand-green-dark)" }}
        data-ocid="admin.panel"
      >
        <div className="w-full max-w-sm">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-2 text-white/70 hover:text-white text-sm mb-8 transition-colors"
            data-ocid="admin.secondary_button"
          >
            <ArrowLeft className="w-4 h-4" />
            वापस जाएं
          </button>
          <Card className="border-0 shadow-2xl">
            <CardHeader className="text-center pb-4">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ background: "oklch(35 0.12 148 / 0.1)" }}
              >
                <ShieldCheck
                  className="w-8 h-8"
                  style={{ color: "var(--brand-green)" }}
                />
              </div>
              <CardTitle
                className="font-display text-2xl"
                style={{ color: "var(--brand-green-dark)" }}
              >
                Admin Login
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                ऑर्डर देखने के लिए password डालें
              </p>
            </CardHeader>
            <CardContent className="pt-0 space-y-4">
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password डालें"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                  className="pl-10 pr-10 h-12 text-base"
                  data-ocid="admin.input"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {error && (
                <p
                  className="text-sm text-red-500 text-center"
                  data-ocid="admin.error_state"
                >
                  {error}
                </p>
              )}
              <Button
                className="w-full h-12 font-bold text-base"
                style={{
                  background: "var(--brand-green-dark)",
                  color: "white",
                }}
                onClick={handleLogin}
                data-ocid="admin.primary_button"
              >
                Login करें
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50" data-ocid="admin.panel">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={onBack}
              className="flex items-center gap-2 text-gray-500 hover:text-gray-800 text-sm transition-colors"
              data-ocid="admin.secondary_button"
            >
              <ArrowLeft className="w-4 h-4" />
              वेबसाइट पर जाएं
            </button>
            <div className="h-5 w-px bg-gray-300" />
            <div className="flex items-center gap-2">
              <ShieldCheck
                className="w-5 h-5"
                style={{ color: "var(--brand-green)" }}
              />
              <h1 className="font-display font-bold text-lg text-gray-800">
                Admin Panel
              </h1>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            data-ocid="admin.delete_button"
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <LogOut className="w-4 h-4 mr-1" /> लॉगआउट
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <Card data-ocid="admin.card">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ background: "oklch(35 0.12 148 / 0.12)" }}
                >
                  <ShoppingCart
                    className="w-6 h-6"
                    style={{ color: "var(--brand-green)" }}
                  />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">कुल ऑर्डर</p>
                  <p className="text-3xl font-bold text-gray-800">
                    {orderCount !== undefined ? orderCount.toString() : "—"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card data-ocid="admin.card">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ background: "oklch(60 0.18 45 / 0.12)" }}
                >
                  <Package
                    className="w-6 h-6"
                    style={{ color: "var(--brand-gold-dark)" }}
                  />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">कुल आमदनी</p>
                  <p className="text-3xl font-bold text-gray-800">
                    {orders
                      ? `₹${orders.reduce((s, o) => s + Number(o.totalPrice), 0).toLocaleString("en-IN")}`
                      : "—"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Orders Table */}
        <Card data-ocid="admin.table">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="font-display text-xl text-gray-800">
                सभी ऑर्डर
              </CardTitle>
              {orders && (
                <Badge
                  className="px-3 py-1"
                  style={{
                    background: "oklch(35 0.12 148 / 0.1)",
                    color: "var(--brand-green)",
                  }}
                >
                  {orders.length} ऑर्डर
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {ordersLoading ? (
              <div className="p-6 space-y-3" data-ocid="admin.loading_state">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-12 w-full rounded-lg" />
                ))}
              </div>
            ) : !orders || orders.length === 0 ? (
              <div className="p-12 text-center" data-ocid="admin.empty_state">
                <ShoppingCart className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p className="text-sm text-muted-foreground">
                  अभी तक कोई ऑर्डर नहीं आया।
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead className="font-semibold text-gray-700">
                        #
                      </TableHead>
                      <TableHead className="font-semibold text-gray-700">
                        नाम
                      </TableHead>
                      <TableHead className="font-semibold text-gray-700">
                        फोन
                      </TableHead>
                      <TableHead className="font-semibold text-gray-700">
                        पता
                      </TableHead>
                      <TableHead className="font-semibold text-gray-700">
                        PIN
                      </TableHead>
                      <TableHead className="font-semibold text-gray-700">
                        मात्रा
                      </TableHead>
                      <TableHead className="font-semibold text-gray-700">
                        कीमत
                      </TableHead>
                      <TableHead className="font-semibold text-gray-700">
                        समय
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[...orders]
                      .sort((a, b) => (b.timestamp > a.timestamp ? 1 : -1))
                      .map((order, idx) => (
                        <TableRow
                          key={`${order.phone}-${order.timestamp}`}
                          data-ocid={`admin.row.${idx + 1}`}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <TableCell className="text-sm text-gray-500 font-mono">
                            {orders.length - idx}
                          </TableCell>
                          <TableCell className="font-medium text-gray-800">
                            {order.name}
                          </TableCell>
                          <TableCell className="text-sm text-gray-600">
                            {order.phone}
                          </TableCell>
                          <TableCell className="text-sm text-gray-600 max-w-[180px] truncate">
                            {order.address}
                          </TableCell>
                          <TableCell className="text-sm font-mono text-gray-600">
                            {order.pincode}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="secondary"
                              className="font-semibold"
                            >
                              {order.quantity.toString()} ट्यूब
                            </Badge>
                          </TableCell>
                          <TableCell
                            className="font-bold"
                            style={{ color: "var(--brand-green-dark)" }}
                          >
                            ₹{Number(order.totalPrice).toLocaleString("en-IN")}
                          </TableCell>
                          <TableCell className="text-xs text-gray-400 whitespace-nowrap">
                            {formatTimestamp(order.timestamp)}
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
