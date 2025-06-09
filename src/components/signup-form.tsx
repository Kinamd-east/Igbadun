import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { setDoc, doc } from "firebase/firestore";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [countries, setCountries] = useState([]);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    username: "",
    country: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(
          "https://restcountries.com/v3.1/all?fields=name"
        );
        if (!response.ok) throw new Error(`HTTP error: ${response.status}`);

        const data = await response.json();
        const sortedCountries = data
          .map((country) => country.name.common)
          .sort((a, b) => a.localeCompare(b));
        setCountries(sortedCountries);
      } catch (error) {
        console.error("Failed to fetch countries:", error);
      }
    };

    fetchCountries();
  }, []);
  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const { user } = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        fullName: form.fullName,
        email: form.email,
        username: form.username,
        country: form.country,
        taps: 2000,
        petals: 0,
        energy: 2000,
        maxEnergy: 2000,
        createdAt: new Date(),
      });
      toast.success("Successfully created account");
      setIsLoading(true);
      navigate("/");
    } catch (err) {
      setIsLoading(false);
      toast.error(err.message);
      console.error(err.message);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form onSubmit={onSubmit} className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold edu-sa-hand-medium600">
                  Create your Account
                </h1>
                <p className="text-sm/6 text-gray-600 mt-1 text-balance edu-sa-hand-medium500">
                  Enter your email and password to access your account.
                </p>
              </div>
              <div className="grid gap-3">
                <Label
                  htmlFor="fullName"
                  className="block text-sm/6 font-medium text-gray-900 edu-sa-hand-medium500"
                >
                  Full Name
                </Label>
                <Input
                  id="fullName"
                  type="text"
                  name="fullName"
                  onChange={handleChange}
                  autoComplete="fullName"
                  className="edu-sa-hand-medium500"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div className="grid gap-3">
                <Label
                  htmlFor="email"
                  className="block text-sm/6 font-medium text-gray-900 edu-sa-hand-medium500"
                >
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  onChange={handleChange}
                  autoComplete="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-3">
                <Label
                  htmlFor="username"
                  className="block text-sm/6 font-medium text-gray-900 edu-sa-hand-medium500"
                >
                  Username
                </Label>
                <Input
                  id="username"
                  type="text"
                  name="username"
                  onChange={handleChange}
                  autoComplete="username"
                  className="edu-sa-hand-medium500"
                  placeholder="JohnDoe12"
                  required
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label
                    htmlFor="password"
                    className="block text-sm/6 font-medium text-gray-900 edu-sa-hand-medium500"
                  >
                    Password
                  </Label>
                  {/* <a
                    href="#"
                    className="ml-auto text-sm underline-offset-2 hover:underline"
                  >
                    Forgot your password?
                  </a> */}
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  onChange={handleChange}
                  autoComplete="current-password"
                  required
                />
              </div>
              <div className="grid gap-3">
                <Label
                  htmlFor="country"
                  className="block text-sm/6 font-medium text-gray-900 edu-sa-hand-medium500"
                >
                  Country
                </Label>
                <Select>
                  <SelectTrigger className="w-[280px]">
                    <SelectValue placeholder="Select your country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Countries</SelectLabel>
                      {countries.map((country) => (
                        <SelectItem key={country} value={country}>
                          {country}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <Button
                type="submit"
                className={`w-full cursor-pointer ${
                  isLoading ? "disabled:bg-gray-500" : ""
                }`}
              >
                {isLoading ? (
                  <div className="flex flex-col">
                    <img src="/loader.svg" alt="loading" className="w-8 h-8" />
                  </div>
                ) : (
                  "Sign up"
                )}
              </Button>
              <div className="text-center text-sm">
                Already have an account?{" "}
                <a href="/sign-in" className="underline underline-offset-4">
                  Sign in
                </a>
              </div>
            </div>
          </form>
          <div className="bg-muted relative hidden md:block">
            <img
              src="/images/1.png"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      {/* <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div> */}
    </div>
  );
}
