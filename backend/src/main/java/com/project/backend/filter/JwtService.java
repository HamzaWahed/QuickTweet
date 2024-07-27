package com.project.backend.filter;

import java.security.Key;
import java.util.Date;

import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpServletRequest;

@Component
public class JwtService ***REMOVED***
  static final long EXPIRATIONTIME = 86400000;
  public static final String PREFIX = "Bearer";
  static final Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);

  public String getToken(String username) ***REMOVED***
    String token = Jwts.builder().setSubject(username)
        .setExpiration(new Date(System.currentTimeMillis() + EXPIRATIONTIME)).signWith(key)
        .compact();

    return token;
  ***REMOVED***

  public String getAuthUser(HttpServletRequest request) ***REMOVED***
    String token = request.getHeader(HttpHeaders.AUTHORIZATION);

    if (token == null) ***REMOVED***
      return null;
***REMOVED***

    String user = Jwts.parserBuilder().setSigningKey(key).build()
        .parseClaimsJws(token.replace(PREFIX, "")).getBody().getSubject();

    if (user == null) ***REMOVED***
      return null;
***REMOVED***

    return user;
  ***REMOVED***
***REMOVED***
