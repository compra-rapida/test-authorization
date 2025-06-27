## Task list

### Middleware

- [ ] Validate properly the token received

### SignIn Endpoint

- [ ] Create a refresh token for a valid signin

### Refresh Token Endpoint

- [ ] Should create a new access and refresh token if a valid refresh token was provided
- [ ] Should remove the used refresh token (a refresh token must be accepted once)
- [ ] Should return "expired token error" if an expired token was informed (must remove the token)
- [ ] Return "Invalid refresh token" if the refresh token is not in database (nice to have)
