"use client";
import { gql, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createUser } from "@/state/remote/mutations/createUser";
import { FormEventType } from "@/utils/types";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";

export default function CreateAccountForm() {
  const [form, setForm] = useState({ email: "", username: "", password: "" });
  const [registerUser, { error }] = useMutation(createUser);

  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("token")) {
      router.push("/characters");
    }
  }, [router]);

  const handleSubmit = async (event: FormEventType) => {
    event.preventDefault();
    await registerUser({ variables: { input: form } });
    console.log("Account Created!");
    router.push("/login");
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
    >
      <Paper
        elevation={5}
        sx={{
          padding: 4,
          width: 400,
          borderRadius: 3,
          backgroundImage: `url('/backgrounds/sorcerer.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundColor: `rgba(255,255,255,0.7)`,
          backgroundBlendMode: "lighten",
        }}
      >
        <Typography variant="h5" textAlign="center" mb={3}>
          Sign Up
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          {error && (
            <Typography color="error" my={1} sx={{ my: 1, textAlign: 'center' }}>
              {error.graphQLErrors[0]?.message || "Something went wrong"}
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Sign Up
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
