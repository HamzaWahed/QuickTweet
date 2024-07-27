package com.project.backend.model;

import java.util.HashSet;
import java.util.Set;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;

@Entity
public class AppAuthorization ***REMOVED***
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(nullable = false, updatable = false)
  private Long id;

  @ElementCollection
  @JoinTable(name = "PENDING_REQUESTS", joinColumns = @JoinColumn(name = "APP_ID"), inverseJoinColumns = @JoinColumn(name = "USER_ID"))
  Set<AppUser> pendingRequests = new HashSet<>();

  public AppAuthorization() ***REMOVED******REMOVED***

  public Long getId() ***REMOVED***
    return id;
  ***REMOVED***

  public void setId(Long id) ***REMOVED***
    this.id = id;
  ***REMOVED***

  public Set<AppUser> getPendingRequests() ***REMOVED***
    return pendingRequests;
  ***REMOVED***

  public void setPendingRequests(Set<AppUser> pendingRequests) ***REMOVED***
    this.pendingRequests = pendingRequests;
  ***REMOVED***

  public void addPendingRequest(AppUser user) ***REMOVED***
    this.pendingRequests.add(user);
  ***REMOVED***

  public void deletePendingRequest(AppUser user) ***REMOVED***
    this.pendingRequests.remove(user);
  ***REMOVED***
***REMOVED***
