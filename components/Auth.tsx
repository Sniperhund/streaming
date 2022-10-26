import { Box, FormLabel, FormControl, Heading, Input, FormHelperText, Button, Text } from "@chakra-ui/react"
import { useState } from "react"

function Auth(props: any) {
    const [signUp, setSignUp] = useState(false)

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [emailError, setEmailError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)

    return (
            <Box maxW="md" minW="md" h="lg" borderWidth="2px" borderRadius="lg">
                <Heading mt="5" className="text-center">{signUp ? "Sign up" : "Sign in"}</Heading>

                <FormControl isRequired mt="7" ml="5" maxW="91%">
                    <FormLabel>Email address</FormLabel>
                    <Input type="email" placeholder="example@example.com" onChange={(e) => {
                        setEmailError(false)
                        setPasswordError(false)
                        setEmail(e.target.value)
                    }} />
                    {emailError ? (
                            <FormHelperText>You cannot use that email address</FormHelperText>
                            ) : (<></>)}
                    <FormLabel mt="2">Password</FormLabel>
                    <Input type="password" placeholder="password" onChange={(e) => {
                        setEmailError(false)
                        setPasswordError(false)
                        setPassword(e.target.value)
                    }} />
                    {passwordError ? (
                            <FormHelperText>You cannot use that password, it's too short</FormHelperText>
                            ) : (
                                    <FormHelperText>Your password needs to be atleast 8 characters long</FormHelperText>
                                    )}

                    {signUp ? (
                            <Button mt="5" className="w-full" onClick={async () => {
                                if (email === "" || /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/.test(email))
                                    setEmailError(true)
                                if (password === "" || password.length <= 8)
                                    setPasswordError(true)

                                if (!passwordError && !emailError) {
                                    const {data, error} = await props.supabase.auth.signInWithPassword({
                                        email: email,
                                        password: password,
                                    })

                                    console.log("Signing up")
                                    console.log(data)
                                    console.log(error)
                                }
                            }}>SIGN UP</Button>) : (
                                    <Button mt="5" className="w-full" onClick={async () => {
                                        if (email.length == 0)
                                            setEmailError(true)
                                        if (password.length == 0)
                                            setPasswordError(true)

                                        if (!passwordError && !emailError) {
                                            const {data, error} = await props.supabase.auth.signUp({
                                                email: email,
                                                password: password,
                                            })

                                            console.log("Signing in")
                                            console.log(data)
                                            console.log(error)
                                        }
                                    }}>SIGN IN</Button>
                                    )}

                    <Text as="button" className="w-full" mt="28" onClick={() => {
                        setSignUp(!signUp)
                    }}>{signUp ? "Sign in instead" : "Sign up instead"}</Text>

                    {/* Add other login methods */}
                </FormControl>
            </Box>
    )
}

export default Auth