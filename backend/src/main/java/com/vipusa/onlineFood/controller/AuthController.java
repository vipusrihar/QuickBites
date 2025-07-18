package com.vipusa.onlineFood.controller;

import com.vipusa.onlineFood.config.JwtProvider;
import com.vipusa.onlineFood.model.Cart;
import com.vipusa.onlineFood.model.User;
import com.vipusa.onlineFood.repository.CartRepository;
import com.vipusa.onlineFood.repository.UserRepository;
import com.vipusa.onlineFood.request.LoginRequest;
import com.vipusa.onlineFood.request.SignupRequest;
import com.vipusa.onlineFood.response.AuthResponse;
import com.vipusa.onlineFood.service.CustomerUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;


@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtProvider jwtProvider;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private CustomerUserDetailsService customerUserDetailsService;

    @Autowired
    private CartRepository cartRepository;

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> createUserHandler(@RequestBody SignupRequest request) throws Exception {
        // Check if user already exists
        User isUserExist = userRepository.findByEmail(request.getEmail());
        if (isUserExist != null) {
            throw new Exception("Email already exists");
        }

        // Create the new user
        User createdUser = new User();
        createdUser.setEmail(request.getEmail());
        createdUser.setFirstName(request.getFirstName());
        createdUser.setLastName(request.getLastName());
        createdUser.setAddresses(request.getAddresses());
        createdUser.setRole(request.getRole());

        // Encode the password before setting it
        createdUser.setPassword(passwordEncoder.encode(request.getPassword()));

        // Save the user to the database
        User savedUser = userRepository.save(createdUser);
        System.out.println("created");

        // Create and save the user's cart
        Cart createdCart = new Cart();
        createdCart.setUser(savedUser);
        cartRepository.save(createdCart);

        // Authenticate the user using the encoded password
        Authentication authentication = new UsernamePasswordAuthenticationToken(
                savedUser.getEmail(), request.getPassword() // Plain password passed here
        );

        // This won't work if you try to authenticate with the plain password
        SecurityContextHolder.getContext().setAuthentication(authentication);

        // Generate JWT token for the authenticated user
        String jwt = jwtProvider.generateToken(authentication);

        // Prepare the response with JWT and user details
        AuthResponse authResponse = new AuthResponse();
        authResponse.setJwt(jwt);
        authResponse.setMessage("Registration Success");
        authResponse.setRole(savedUser.getRole());

        // Return the response
        return new ResponseEntity<>(authResponse, HttpStatus.CREATED);
    }



    @PostMapping("/signin")
    public ResponseEntity<AuthResponse> signIn(@RequestBody LoginRequest request) throws Exception {
        User user = userRepository.findByEmail(request.getEmail());
        if (user == null || !passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new Exception("Invalid email or password");
        }

        Authentication authentication = new UsernamePasswordAuthenticationToken(
                user.getEmail(), user.getPassword()
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = jwtProvider.generateToken(authentication);

        AuthResponse authResponse = new AuthResponse();
        authResponse.setJwt(jwt);
        authResponse.setMessage("Login Success");
        authResponse.setRole(user.getRole());

        return new ResponseEntity<>(authResponse, HttpStatus.OK);
    }

}
