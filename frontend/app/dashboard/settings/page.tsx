"use client";

import { useState, useEffect } from "react";
import { DashboardShell } from "@/components/sections/dashboard/DashboardShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { authService } from "@/services/api/auth";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";

export default function SettingsPage() {
    const [user, setUser] = useState<any>(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

    useEffect(() => {
        authService.getCurrentUser()
            .then(data => {
                setUser(data);
                setName(data.name || "");
                setEmail(data.email || "");
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to load user profile:", err);
                setMessage({ type: "error", text: "Failed to load profile. Please log in again." });
                setLoading(false);
            });
    }, []);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setMessage(null);
        try {
            const updated = await authService.updateCurrentUser({ name, email });
            setUser(updated);
            setMessage({ type: "success", text: "Profile updated successfully!" });
        } catch (err: any) {
            console.error("Failed to save profile:", err);
            const errMsg = err.data?.detail || "Failed to update profile. Please try again.";
            setMessage({ type: "error", text: errMsg });
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <DashboardShell>
                <div className="flex items-center justify-center min-h-[400px]">
                    <Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
                </div>
            </DashboardShell>
        );
    }

    return (
        <DashboardShell>
            <div className="max-w-4xl mx-auto space-y-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
                    <p className="text-muted-foreground">Manage your account settings and preferences.</p>
                </div>

                {message && (
                    <div className={`p-4 rounded-xl flex items-center gap-3 border ${message.type === "success" ? "bg-green-500/10 border-green-500/20 text-green-400" : "bg-red-500/10 border-red-500/20 text-red-400"}`}>
                        {message.type === "success" ? <CheckCircle className="h-5 w-5 shrink-0" /> : <AlertCircle className="h-5 w-5 shrink-0" />}
                        <span className="text-sm font-medium">{message.text}</span>
                    </div>
                )}

                <div className="grid gap-6">
                    {/* Profile Section */}
                    <form onSubmit={handleSave}>
                        <Card>
                            <CardHeader>
                                <CardTitle>Profile Information</CardTitle>
                                <CardDescription>Update your personal details.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="username">Username</Label>
                                        <Input id="username" value={user?.username || ""} disabled className="bg-muted/50 cursor-not-allowed" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="role">Account Role</Label>
                                        <Input id="role" value={user?.role || "USER"} disabled className="bg-muted/50 cursor-not-allowed capitalize" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Full Name</Label>
                                        <Input 
                                            id="name" 
                                            value={name} 
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="Enter your name"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input 
                                            id="email" 
                                            type="email"
                                            value={email} 
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Enter your email"
                                        />
                                    </div>
                                </div>
                                <Button type="submit" disabled={saving}>
                                    {saving ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Saving...
                                        </>
                                    ) : "Save Changes"}
                                </Button>
                            </CardContent>
                        </Card>
                    </form>

                    {/* Preferences Section */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Preferences</CardTitle>
                            <CardDescription>Manage your app experience.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label>Email Notifications</Label>
                                    <p className="text-sm text-muted-foreground">Receive emails about new features and updates.</p>
                                </div>
                                <Switch defaultChecked />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label>Project Updates</Label>
                                    <p className="text-sm text-muted-foreground">Get notified when project status changes.</p>
                                </div>
                                <Switch defaultChecked />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </DashboardShell>
    );
}
