package com.project.backend.controller;

import java.util.Set;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;
import com.project.backend.model.AppUser;
import com.project.backend.service.implementation.AppAuthorizationServiceImpl;

@RestController
public class AppAuthorizationController ***REMOVED***
  private final AppAuthorizationServiceImpl appAuthorizationService;

  public AppAuthorizationController(AppAuthorizationServiceImpl appAuthorizationService) ***REMOVED***
    this.appAuthorizationService = appAuthorizationService;
  ***REMOVED***

  @GetMapping("/admin/requests/***REMOVED***username***REMOVED***")
  public Set<AppUser> getPendingRequests(@PathVariable("username") String username) ***REMOVED***
    return appAuthorizationService.getPendingRequests(username);
  ***REMOVED***

  @PutMapping("/admin/requests/***REMOVED***username***REMOVED***")
  public ResponseEntity<String> approvePendingRequest(@PathVariable("username") String username) ***REMOVED***
    return appAuthorizationService.approvePendingRequest(username);
  ***REMOVED***

  @DeleteMapping("/admin/requests/***REMOVED***username***REMOVED***")
  public ResponseEntity<String> rejectPendingRequest(@PathVariable("username") String username) ***REMOVED***
    return appAuthorizationService.rejectPendingRequest(username);
  ***REMOVED***

***REMOVED***

