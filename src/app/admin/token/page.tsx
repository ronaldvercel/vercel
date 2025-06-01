"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy, Key, Loader2, CheckCircle } from "lucide-react";
import { useToast } from "@/components/hooks/use-toast";
import { createToken } from "@/app/actions"; // Adjust the import path as needed

const Token: React.FC = () => {
  const [token, setToken] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const generateTokenHandler = async () => {
    setIsGenerating(true);
    try {
      // Call the server action directly
      const newToken = (await createToken()) as unknown as { token: string };

      setToken(newToken.token);
      toast({
        title: "Token Generated",
        description: "Your new token has been created successfully.",
      });
    } catch (error: unknown) {
      console.error("Token generation error:", error);
      toast({
        title: "Error",
        description: "Failed to generate token. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToken = async () => {
    if (!token) return;

    try {
      await navigator.clipboard.writeText(token);
      setCopied(true);
      toast({
        title: "Copied!",
        description: "Token copied to clipboard.",
      });

      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({
        title: "Error",
        description: "Failed to copy token to clipboard.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent">
            Token Generator
          </h1>
          <p className="text-slate-600 mt-2">
            Create and manage your API tokens securely
          </p>
        </div>

        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl font-semibold text-slate-900">
              <Key className="h-5 w-5 text-blue-600" />
              Create New Token
            </CardTitle>
            <p className="text-slate-600">
              Generate a secure API token for your application
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="flex justify-center">
              <Button
                onClick={generateTokenHandler}
                disabled={isGenerating}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 px-8 py-3 text-lg"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Key className="h-5 w-5 mr-2" />
                    Create Token
                  </>
                )}
              </Button>
            </div>

            {token && (
              <div className="space-y-4 p-6 bg-slate-50/50 rounded-lg border border-slate-200">
                <Label
                  htmlFor="token"
                  className="text-sm font-medium text-slate-700"
                >
                  Generated Token
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="token"
                    value={token}
                    readOnly
                    className="font-mono text-sm bg-white border-slate-300"
                  />
                  <Button
                    onClick={copyToken}
                    variant="outline"
                    size="icon"
                    className="shrink-0"
                  >
                    {copied ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>

                <div className="p-4 bg-amber-50 border border-amber-200 rounded-md">
                  <p className="text-sm text-amber-800">
                    <strong>Security Notice:</strong> Store this token securely.
                    It will not be shown again and provides access to your
                    account.
                  </p>
                </div>
              </div>
            )}

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
              <h3 className="font-medium text-blue-900 mb-2">
                How to use your token:
              </h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>
                  • Include it in your API requests as an Authorization header
                </li>
                <li>• Keep it secure and do not share it publicly</li>
                <li>• Regenerate it if you suspect it has been compromised</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Token;
