package com.project.backend.model;

import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.HashSet;
import java.util.List;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;

@Entity
public class AppUser ***REMOVED***
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(nullable = false, updatable = false)
  private Long id;

  @Column(nullable = false, unique = true)
  private String username;

  @Column(nullable = false, unique = true)
  private String email;

  @Column(nullable = false)
  private String password;

  @Column(nullable = false)
  private String role;

  @Column(nullable = false)
  private String securityQuestion;

  @Column(nullable = false)
  private String securityQuestionAnswer;

  @OneToMany(mappedBy = "user", fetch = FetchType.LAZY,
      cascade = ***REMOVED***CascadeType.PERSIST, CascadeType.REMOVE***REMOVED***)
  @JsonIgnore
  private List<Post> posts;

  @ManyToMany(cascade = CascadeType.PERSIST)
  @JsonIgnore
  @JoinTable(name = "FRIENDS",
      joinColumns = @JoinColumn(name = "USER_ID", referencedColumnName = "id", nullable = false),
      inverseJoinColumns = @JoinColumn(name = "FRIEND_ID", referencedColumnName = "id",
          nullable = false))
  private Set<AppUser> friends = new HashSet<>();

  @ManyToMany(cascade = CascadeType.PERSIST, fetch = FetchType.LAZY)
  @JoinTable(name = "FRIEND_REQUESTS",
      joinColumns = @JoinColumn(name = "USER_ID", referencedColumnName = "id", nullable = false),
      inverseJoinColumns = @JoinColumn(name = "FRIEND_ID", referencedColumnName = "id",
          nullable = false))
  private Set<AppUser> friendRequests = new HashSet<>();

  private String bio;

  private String photo;

  private String status;

  @ElementCollection
  private Set<String> interests;

  private boolean pendingRequest;

  public AppUser(String username, String email, String password, String role,
      String securityQuestion, String securityQuestionAnswer) ***REMOVED***
    this.username = username;
    this.email = email;
    this.password = password;
    this.role = role;
    this.securityQuestion = securityQuestion;
    this.securityQuestionAnswer = securityQuestionAnswer;
  ***REMOVED***

  public AppUser() ***REMOVED******REMOVED***

  public Long getId() ***REMOVED***
    return id;
  ***REMOVED***

  public void setId(Long id) ***REMOVED***
    this.id = id;
  ***REMOVED***

  public String getUsername() ***REMOVED***
    return username;
  ***REMOVED***

  public void setUsername(String username) ***REMOVED***
    this.username = username;
  ***REMOVED***

  public String getEmail() ***REMOVED***
    return email;
  ***REMOVED***

  public void setEmail(String email) ***REMOVED***
    this.email = email;
  ***REMOVED***

  public String getPassword() ***REMOVED***
    return password;
  ***REMOVED***

  public void setPassword(String password) ***REMOVED***
    this.password = password;
  ***REMOVED***

  public String getBio() ***REMOVED***
    return bio;
  ***REMOVED***

  public void setBio(String bio) ***REMOVED***
    this.bio = bio;
  ***REMOVED***

  public String getRole() ***REMOVED***
    return role;
  ***REMOVED***

  public void setRole(String role) ***REMOVED***
    this.role = role;
  ***REMOVED***

  public String getPhoto() ***REMOVED***
    return photo;
  ***REMOVED***

  public void setPhoto(String photo) ***REMOVED***
    this.photo = photo;
  ***REMOVED***

  public String getStatus() ***REMOVED***
    return status;
  ***REMOVED***

  public void setStatus(String status) ***REMOVED***
    this.status = status;
  ***REMOVED***

  public String getSecurityQuestion() ***REMOVED***
    return securityQuestion;
  ***REMOVED***

  public void setSecurityQuestion(String securityQuestion) ***REMOVED***
    this.securityQuestion = securityQuestion;
  ***REMOVED***

  public String getSecurityQuestionAnswer() ***REMOVED***
    return securityQuestionAnswer;
  ***REMOVED***

  public void setSecurityQuestionAnswer(String securityQuestionAnswer) ***REMOVED***
    this.securityQuestionAnswer = securityQuestionAnswer;
  ***REMOVED***

  public Set<AppUser> getFriends() ***REMOVED***
    return friends;
  ***REMOVED***

  public void setFriends(Set<AppUser> friends) ***REMOVED***
    this.friends = friends;
  ***REMOVED***

  public void addFriend(AppUser friend) ***REMOVED***
    this.friends.add(friend);
  ***REMOVED***

  public void deleteFriend(AppUser friend) ***REMOVED***
    this.friends.remove(friend);
  ***REMOVED***

  public Set<AppUser> getFriendRequests() ***REMOVED***
    return friendRequests;
  ***REMOVED***

  public void setFriendRequests(Set<AppUser> friendRequests) ***REMOVED***
    this.friendRequests = friendRequests;
  ***REMOVED***

  public void addFriendRequest(AppUser friend) ***REMOVED***
    this.friendRequests.add(friend);
  ***REMOVED***

  public void deleteFriendRequest(AppUser friend) ***REMOVED***
    this.friendRequests.remove(friend);
  ***REMOVED***

  public Set<String> getInterests() ***REMOVED***
    return interests;
  ***REMOVED***

  public void setInterests(Set<String> interests) ***REMOVED***
    this.interests = interests;
  ***REMOVED***

  public boolean isPendingRequest() ***REMOVED***
    return pendingRequest;
  ***REMOVED***

  public void setPendingRequest(boolean pendingRequest) ***REMOVED***
    this.pendingRequest = pendingRequest;
  ***REMOVED***

***REMOVED***
