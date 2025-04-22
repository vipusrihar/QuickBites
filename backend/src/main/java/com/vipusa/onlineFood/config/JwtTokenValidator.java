
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
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.crypto.SecretKey;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;

public class JwtTokenValidator extends OncePerRequestFilter {

    private static final SecretKey SECRET_KEY = Keys.hmacShaKeyFor(JwtConstant.SECRET_KEY.getBytes(StandardCharsets.UTF_8));

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        System.out.println("Request Method: " +request.getMethod());
        System.out.println("Request URI: " + request.getRequestURI());

        String path = request.getRequestURI();
        if (path.startsWith("/auth/signup") || path.startsWith("/auth/signin")) {
            filterChain.doFilter(request, response);
            return;
        }

        String token = request.getHeader(JwtConstant.JWT_HEADER);
        if (token == null || !token.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        try {
            String jwt = token.substring(7);
            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(SECRET_KEY)
                    .build()
                    .parseClaimsJws(jwt)
                    .getBody();

            SecurityContextHolder.getContext().setAuthentication(
                    new UsernamePasswordAuthenticationToken(claims.getSubject(), null, new ArrayList<>()));
        } catch (io.jsonwebtoken.ExpiredJwtException | io.jsonwebtoken.SignatureException |
                 io.jsonwebtoken.MalformedJwtException e) {
            System.out.println("JWT error: " + e.getMessage());
        } catch (Exception e) {
            throw new BadCredentialsException("Invalid Token", e);
        }

        filterChain.doFilter(request, response);
    }
}

