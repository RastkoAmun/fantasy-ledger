"use client";
import { loginQuery } from "@/state/remote/mutations/login";
import { FormEventType } from "@/utils/types";
import { useMutation } from "@apollo/client";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function LoginForm() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [login] = useMutation(loginQuery);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogin = async (event: FormEventType) => {
    event.preventDefault();
    const { data } = await login({ variables: { input: form } });
    console.log("LOGIN DATA:", data);
    localStorage.setItem("token", data.login.token);
    alert("Logged in!");
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    alert("Logged out!");
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      sx={{
        backgroundImage: `url('/backgrounds/grass-castle-bg.png')`,
        backgroundSize: "1920px 850px",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Paper
        elevation={5}
        sx={{
          padding: 4,
          width: 400,
          borderRadius: 3,
          backgroundImage: `url('/backgrounds/two-dragons.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundColor: `rgba(255,255,255,0.8)`,
          backgroundBlendMode: 'lighten'
        }}
      >
        <Typography variant="h5" textAlign="center" mb={3}>
          Login
        </Typography>

        <form onSubmit={handleLogin}>
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

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Login
          </Button>
        </form>

        {isLoggedIn && (
          <Button
            onClick={handleLogout}
            variant="outlined"
            color="secondary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Sign Out
          </Button>
        )}
      </Paper>
    </Box>
  );
}
