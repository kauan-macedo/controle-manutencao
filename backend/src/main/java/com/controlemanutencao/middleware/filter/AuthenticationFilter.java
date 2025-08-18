package com.controlemanutencao.middleware.filter;

import jakarta.servlet.*;
import jakarta.servlet.annotation.WebFilter;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

@WebFilter(filterName = "AuthenticationFilter", urlPatterns = "/api/*")
public class AuthenticationFilter implements Filter {

    private final String SECRET_KEY = "your-secret-key";

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        // Initialization logic, if any
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)  throws IOException, ServletException {
        HttpServletRequest httpRequest = (HttpServletRequest) request;
        String token = httpRequest.getHeader("Authorization");

        if (token != null && token.startsWith("Bearer ")) {
            token = token.substring(7);
            if (isValidToken(token)) {
                HttpServletResponse httpResponse = (HttpServletResponse) response;
                // Continue with the request
                chain.doFilter(request, response);
            } else {
                ((HttpServletResponse) response).sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid Token");
                return;
            }
        } else {
            ((HttpServletResponse) response).sendError(HttpServletResponse.SC_UNAUTHORIZED, "Authorization header is missing");
            return;
        }
    }

    private boolean isValidToken(String token) {
        // Token validation logic (e.g., check if it's expired, signature match, etc.)
        return token.equals("valid-token"); // Simplified for this example
    }

    @Override
    public void destroy() {
        // Cleanup logic, if any
    }

}
