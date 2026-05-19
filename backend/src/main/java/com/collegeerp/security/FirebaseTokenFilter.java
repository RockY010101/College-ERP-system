package com.collegeerp.security;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseToken;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

/**
 * FirebaseTokenFilter — Validates Firebase ID tokens on every request.
 *
 * Extracts Bearer token from Authorization header,
 * verifies it with Firebase Admin SDK,
 * and sets the Spring Security context with the user's UID.
 *
 * TODO (Phase 2): Fetch role from database and add as GrantedAuthority.
 */
@Component
public class FirebaseTokenFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        String authHeader = request.getHeader("Authorization");

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String idToken = authHeader.substring(7);
            try {
                FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdToken(idToken);
                String uid = decodedToken.getUid();

                // TODO (Phase 2): Fetch role from DB using uid, add as authority
                UsernamePasswordAuthenticationToken authentication =
                        new UsernamePasswordAuthenticationToken(uid, null, List.of());
                SecurityContextHolder.getContext().setAuthentication(authentication);

            } catch (Exception e) {
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid Firebase token");
                return;
            }
        }

        filterChain.doFilter(request, response);
    }
}
