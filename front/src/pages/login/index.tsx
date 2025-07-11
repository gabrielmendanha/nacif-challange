import {Box, Button, Paper, TextField } from "@mui/material";
import { useLogin } from "./useLogin.ts";

const LoginPage = () => {
    const { setUsername, setPassword, handleLogin, loading } = useLogin();


    return (
        <Box display={'flex'} justifyContent={'center'} height={'100vh'} alignItems={'center'}>
            <Paper elevation={24} square={false}>
                <form onSubmit={handleLogin} autoComplete="off">
                    <Box display={'flex'} gap={'16px'} padding={'24px'} flexDirection={'column'}>
                        <TextField label="Username"
                                   variant="outlined"
                                   required
                                   onChange={(event) => setUsername(event.target.value)}/>
                        <TextField label="Password"
                                   variant="outlined"
                                   type="password"
                                   required
                                   onChange={(event) => setPassword(event.target.value)}/>
                        <Button variant="contained" type={'submit'} loading={loading}>Log in</Button>
                    </Box>
                </form>
            </Paper>
        </Box>
    )
}


export default LoginPage;