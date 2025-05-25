package com.vipusa.onlineFood;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.vipusa.onlineFood.config.JwtProvider;
import com.vipusa.onlineFood.controller.AuthController;
import com.vipusa.onlineFood.defaults.USER_ROLE;
import com.vipusa.onlineFood.model.User;
import com.vipusa.onlineFood.repository.CartRepository;
import com.vipusa.onlineFood.repository.UserRepository;
import com.vipusa.onlineFood.service.CustomerUserDetailsService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(AuthController.class)
@Import(AuthControllerTest.SecurityConfig.class) // Import the security config
public class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private UserRepository userRepository;

    @MockitoBean
    private JwtProvider jwtProvider;

    @MockitoBean
    private PasswordEncoder passwordEncoder;

    @MockitoBean
    private CustomerUserDetailsService customerUserDetailsService;

    @MockitoBean
    private CartRepository cartRepository;

    @Test
    public void testSignupSuccess() throws Exception {
        User user = new User();
        user.setEmail("test@example.com");
        user.setPassword("password123");
        user.setFirstName("Vipusa");
        user.setLastName("Sriharan");
        user.setRole(USER_ROLE.valueOf("ROLE_USER"));

        when(userRepository.findByEmail(user.getEmail())).thenReturn(null); // email doesn't exist
        when(passwordEncoder.encode(user.getPassword())).thenReturn("encodedPassword");
        when(userRepository.save(any(User.class))).thenReturn(user);
        when(jwtProvider.generateToken(any())).thenReturn("fake-jwt-token");

        mockMvc.perform(post("/auth/signup")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(user)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.jwt").value("fake-jwt-token"))
                .andExpect(jsonPath("$.message").value("Registration Success"))
                .andExpect(jsonPath("$.role").value("ROLE_USER"));
    }

    // Minimal security configuration to allow access to /auth/signup
    static class SecurityConfig {
        @Bean
        public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
            http
                    .csrf(AbstractHttpConfigurer::disable) // Disable CSRF for testing signup
                    .authorizeHttpRequests(auth -> auth
                            .requestMatchers("/auth/signup").permitAll()
                            .anyRequest().authenticated());
            return http.build();
        }
    }
}