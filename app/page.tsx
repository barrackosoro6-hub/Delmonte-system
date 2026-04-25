'use client';

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const packages = [
  { name: "Starter Package", price: 1500, perView: 20 },
  { name: "Basic Package", price: 2500, perView: 30 },
  { name: "Standard Package", price: 3500, perView: 100 },
  { name: "Premium Package", price: 4500, perView: 200 },
  { name: "VIP Package", price: 5000, perView: 500 },
];

const dailyImages = [
  "https://images.unsplash.com/photo-1617638924702-92d37537a345?w=800",
  "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800",
  "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=800",
  "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800",
];

const dbKey = "delmonte_users";
const analyticsKey = "delmonte_analytics";

interface User {
  username: string;
  password: string;
  nickname: string;
  active: boolean;
  package?: string;
}

interface Analytics {
  payments: number;
  revenue: number;
}

export default function DelmonteApp() {
  const [user, setUser] = useState<User | null>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedPackage, setSelectedPackage] = useState<typeof packages[0] | null>(null);
  const [amount, setAmount] = useState("");
  const [phone, setPhone] = useState("0745153417");
  const [analytics, setAnalytics] = useState<Analytics>({ payments: 0, revenue: 0 });

  useEffect(() => {
    const savedUsers = localStorage.getItem(dbKey);
    if (savedUsers) setUsers(JSON.parse(savedUsers));

    const savedAnalytics = localStorage.getItem(analyticsKey);
    if (savedAnalytics) setAnalytics(JSON.parse(savedAnalytics));
  }, []);

  const saveUsers = (data: User[]) => {
    localStorage.setItem(dbKey, JSON.stringify(data));
  };

  const saveAnalytics = (data: Analytics) => {
    localStorage.setItem(analyticsKey, JSON.stringify(data));
  };

  const signup = () => {
    if (!username || !password || !nickname) return;

    const newUser: User = {
      username,
      password,
      nickname,
      active: false,
    };

    const updated = [...users, newUser];
    setUsers(updated);
    saveUsers(updated);
    setUser(newUser);
    setUsername("");
    setPassword("");
    setNickname("");
  };

  const login = () => {
    const found = users.find(
      (u) => u.username === username && u.password === password
    );

    if (found) {
      setUser(found);
      setUsername("");
      setPassword("");
    } else {
      alert("Invalid login");
    }
  };

  const selectPackage = (pkg: typeof packages[0]) => {
    setSelectedPackage(pkg);
    setAmount(String(pkg.price));
  };

  const stkPush = async () => {
    return new Promise((res) => setTimeout(res, 1500));
  };

  const pay = async () => {
    if (!selectedPackage) return alert("Select package first");

    await stkPush();

    const updatedAnalytics = {
      payments: analytics.payments + 1,
      revenue: analytics.revenue + Number(amount),
    };

    setAnalytics(updatedAnalytics);
    saveAnalytics(updatedAnalytics);

    const updatedUsers = users.map((u) =>
      u.username === user?.username
        ? { ...u, active: true, package: selectedPackage.name }
        : u
    );

    setUsers(updatedUsers);
    saveUsers(updatedUsers);

    setUser({ ...user!, active: true, package: selectedPackage.name });
    alert("M-Pesa STK Push Sent (Demo)");
  };

  const todayIndex = new Date().getDate() % dailyImages.length;
  const todayImage = dailyImages[todayIndex];

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <Card className="w-full max-w-sm">
          <CardContent className="space-y-3 p-6">
            <h1 className="text-xl font-bold">
              {isSignup ? "Sign Up" : "Login"}
            </h1>

            <Input
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {isSignup && (
              <Input
                placeholder="Nickname"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
            )}

            {isSignup ? (
              <Button onClick={signup}>Create Account</Button>
            ) : (
              <Button onClick={login}>Login</Button>
            )}

            <p
              className="text-sm text-blue-600 cursor-pointer"
              onClick={() => setIsSignup(!isSignup)}
            >
              {isSignup ? "Already have account? Login" : "Create account"}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const isAdmin = user.username === "admin";

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Delmonte Live System</h1>
        <Button onClick={() => setUser(null)}>Logout</Button>
      </div>

      <Card className="mb-6">
        <CardContent className="p-6">
          <h2 className="font-semibold mb-3">Today's Delmonte Content</h2>
          <img src={todayImage} alt="Daily content" className="w-full rounded" />
        </CardContent>
      </Card>

      {isAdmin && (
        <Card className="mb-6 border-2 border-blue-500">
          <CardContent className="p-6">
            <h2 className="font-bold text-lg mb-3">Admin Panel</h2>
            <p className="mb-2">Users: <span className="font-bold">{users.length}</span></p>
            <p className="mb-2">Payments: <span className="font-bold">{analytics.payments}</span></p>
            <p>Revenue: <span className="font-bold">KES {analytics.revenue.toLocaleString()}</span></p>
          </CardContent>
        </Card>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardContent className="p-6">
            <h2 className="font-bold text-lg mb-4">Choose Package</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {packages.map((p, i) => (
                <div
                  key={i}
                  onClick={() => selectPackage(p)}
                  className={`p-4 border-2 rounded cursor-pointer transition ${
                    selectedPackage?.name === p.name
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  <h3 className="font-semibold">{p.name}</h3>
                  <p className="text-lg font-bold">KES {p.price}</p>
                  <p className="text-sm text-gray-600">{p.perView} views/day</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 space-y-3">
            <h2 className="font-bold text-lg">M-Pesa Payment</h2>
            <Input
              placeholder="Phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <Input value={`KES ${amount}`} disabled />
            <Button onClick={pay} className="w-full bg-green-600 hover:bg-green-700">
              Pay via STK Push
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardContent className="p-6">
          <h2 className="font-bold text-lg mb-3">Your Account</h2>
          <p className="mb-2">Nickname: <span className="font-semibold">{user.nickname}</span></p>
          <p className="mb-2">Status: <span className={`font-semibold ${
            user.active ? "text-green-600" : "text-red-600"
          }`}>{user.active ? "✓ Active" : "Inactive"}</span></p>
          <p>Package: <span className="font-semibold">{user.package || "None"}</span></p>
        </CardContent>
      </Card>
    </div>
  );
}