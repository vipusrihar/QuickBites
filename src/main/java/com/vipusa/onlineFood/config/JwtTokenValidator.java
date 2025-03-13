package com.vipusa.onlineFood.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.crypto.SecretKey;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class JwtTokenValidator extends OncePerRequestFilter {
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        // Skip JWT validation for signup & signin
        String path = request.getRequestURI();
        if (path.startsWith("/auth/signup") || path.startsWith("/auth/signin")) {
            filterChain.doFilter(request, response);
            return;
        }

        String token = request.getHeader("Authorization");

        if (token == null || !token.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);  // Skip if no token provided
            return;
        }

        try {
            // Validate the JWT token (modify this part based on your logic)
            String jwt = token.substring(7); // Remove "Bearer " prefix
            Claims claims = Jwts.parser()
                    .setSigningKey("your_secret_key") // Ensure this matches what you used to generate tokens
                    .parseClaimsJws(jwt)
                    .getBody();

            SecurityContextHolder.getContext().setAuthentication(new UsernamePasswordAuthenticationToken(
                    claims.getSubject(), null, new ArrayList<>()));

        } catch (Exception e) {
            throw new BadCredentialsException("Invalid Token");
        }

        filterChain.doFilter(request, response);
    }

}
