package com.project.backend.service.implementation;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.ArrayList;
import org.hibernate.Hibernate;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.project.backend.config.SecurityConfigInterface;
import com.project.backend.model.AppAuthorization;
import com.project.backend.model.AppUser;
import com.project.backend.repository.AppAuthorizationRepository;
import com.project.backend.repository.UserRepository;
import com.project.backend.service.UserService;

import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityNotFoundException;
import jakarta.persistence.PersistenceContext;

@Service
public class UserServiceImpl implements UserService ***REMOVED***
  private final UserRepository repository;
  private final SecurityConfigInterface securityConfig;
  private final Long AppId = 1L;
  private final AppAuthorizationRepository appAuthorizationRepository;

  @PersistenceContext
  private EntityManager entityManager;

  public UserServiceImpl(UserRepository repository, SecurityConfigInterface securityConfig,
      AppAuthorizationRepository appAuthorizationRepository) ***REMOVED***
    this.repository = repository;
    this.securityConfig = securityConfig;
    this.appAuthorizationRepository = appAuthorizationRepository;
  ***REMOVED***

  @Override
  public AppUser createUser(AppUser user) throws EntityExistsException ***REMOVED***
    boolean isEmailEmpty = user.getEmail().isEmpty();
    boolean isPasswordEmpty = user.getPassword().isEmpty();
    boolean isUsernameEmpty = user.getUsername().isEmpty();
    boolean isSecurityQuestionEmpty = user.getSecurityQuestion().isEmpty();
    boolean isSecurityQuestionAnswerEmpty = user.getSecurityQuestionAnswer().isEmpty();

    boolean hasEmptyFields = isEmailEmpty || isPasswordEmpty || isUsernameEmpty
        || isSecurityQuestionEmpty || isSecurityQuestionAnswerEmpty;

    if (hasEmptyFields) ***REMOVED***
      return null;
***REMOVED***

    if (repository.findByUsername(user.getUsername()).isPresent()) ***REMOVED***
      throw new EntityExistsException("Username is not unique.");
***REMOVED***

    user.setPassword(securityConfig.passwordEncoder().encode(user.getPassword()));
    user.setPendingRequest(true);
    user.setRole("USER");
    repository.save(user);

    AppAuthorization app = appAuthorizationRepository.findById(AppId)
        .orElseThrow(() -> new IllegalArgumentException("App instance has not been created."));
    app.addPendingRequest(user);
    appAuthorizationRepository.save(app);
    return user;
  ***REMOVED***

  @Override
  public String getSecurityQuestion(String username) throws UsernameNotFoundException ***REMOVED***
    Optional<AppUser> optUser = repository.findByUsername(username);
    if (!optUser.isPresent()) ***REMOVED***
      throw new UsernameNotFoundException("User does not exist.");
***REMOVED***

    return optUser.get().getSecurityQuestion();
  ***REMOVED***

  @Override
  public String updatePassword(String username, String password, String securityQuestionAnswer)
      throws Exception ***REMOVED***
    Optional<AppUser> optUser = repository.findByUsername(username);
    if (!optUser.isPresent()) ***REMOVED***
      throw new Exception("User does not exist.");
***REMOVED***

    AppUser user = optUser.get();
    if (!user.getSecurityQuestionAnswer().equals(securityQuestionAnswer)) ***REMOVED***
      throw new Exception("Incorrect answer.");
***REMOVED***

    user.setPassword(securityConfig.passwordEncoder().encode(password));
    repository.save(user);
    return "Password Updated";
  ***REMOVED***

  @Override
  @Transactional
  public ResponseEntity<String> deleteUser(Long id) ***REMOVED***
    Optional<AppUser> optUser = repository.findById(id);
    if (!optUser.isPresent()) ***REMOVED***
      return ResponseEntity.badRequest().body("User not found with id: " + id);
***REMOVED***

    AppUser user = optUser.get();
    user = entityManager.merge(user);
    Hibernate.initialize(user.getFriends());
    Hibernate.initialize(user.getFriendRequests());

    for (AppUser friend : user.getFriends()) ***REMOVED***
      friend.getFriends().remove(user);
      repository.save(friend);
***REMOVED***

    for (AppUser friendRequest : user.getFriendRequests()) ***REMOVED***
      friendRequest.getFriendRequests().remove(user);
      repository.save(friendRequest);
***REMOVED***

    List<AppUser> allUsers = repository.findAll();
    for (AppUser otherUser : allUsers) ***REMOVED***
      if (otherUser.getFriendRequests().contains(user)) ***REMOVED***
        otherUser.getFriendRequests().remove(user);
        repository.save(otherUser);
  ***REMOVED***
***REMOVED***

    repository.delete(user);
    return ResponseEntity.ok().body("User deleted");
  ***REMOVED***

  @Override
  public AppUser deleteUser(String username) throws EntityNotFoundException ***REMOVED***
    Optional<AppUser> optUser = repository.findByUsername(username);
    if (!optUser.isPresent()) ***REMOVED***
      throw new EntityNotFoundException("User not found with username: " + username);
***REMOVED***

    repository.delete(optUser.get());
    return optUser.get();
  ***REMOVED***

  @Override
  public ResponseEntity<String> updateUserRole(Long id, String adminUsername)
      throws SecurityException ***REMOVED***

    repository.findByUsername(adminUsername).filter(user -> user.getRole().equals("ADMIN"))
        .orElseThrow(() -> new SecurityException("User is not authorized to access this."));

    Optional<AppUser> optUser = repository.findById(id);
    if (!optUser.isPresent()) ***REMOVED***
      return ResponseEntity.badRequest().body("User not found with id: " + id);
***REMOVED***

    AppUser user = optUser.get();
    String newRole = user.getRole().equals("ADMIN") ? "USER" : "ADMIN";
    user.setRole(newRole);
    repository.save(user);
    return ResponseEntity.ok().body("User role updated to " + newRole);
  ***REMOVED***

  @Override
  public List<AppUser> getAllUsers() ***REMOVED***
    return repository.findAll().stream().filter(user -> !user.isPendingRequest())
        .collect(Collectors.toList());
  ***REMOVED***

  @Override
  public AppUser getUserById(Long id) ***REMOVED***
    return repository.findById(id).map(user -> user).orElse(null);
  ***REMOVED***

  @Override
  public AppUser updateUser(String username, AppUser user) ***REMOVED***
    if (user == null) ***REMOVED***
      return null;
***REMOVED***

    Optional<AppUser> oldUserOpt = repository.findByUsername(username);
    if (!oldUserOpt.isPresent()) ***REMOVED***
      return null;
***REMOVED***

    AppUser oldUser = oldUserOpt.get();
    oldUser.setBio(user.getBio());
    oldUser.setPhoto(user.getPhoto());
    oldUser.setStatus(user.getStatus());
    oldUser.setInterests(user.getInterests());
    repository.save(oldUser);
    return oldUser;
  ***REMOVED***

  @Override
  public AppUser getUserByUsername(String username) ***REMOVED***
    return repository.findByUsername(username).map(user -> user).orElse(null);
  ***REMOVED***

  @Override
  public String getUserStatus(String username) throws UsernameNotFoundException ***REMOVED***
    Optional<AppUser> optUser = repository.findByUsername(username);
    if (!optUser.isPresent()) ***REMOVED***
      throw new UsernameNotFoundException("User does not exist.");
***REMOVED***
    return optUser.get().getStatus();
  ***REMOVED***

  @Override
  public String updateUserStatus(String username, String status) throws Exception ***REMOVED***
    if (status.isEmpty() || username.isEmpty()) ***REMOVED***
      throw new Exception("Username and Status fields cannot be empty");
***REMOVED***

    Optional<AppUser> userOpt = repository.findByUsername(username);
    if (!userOpt.isPresent()) ***REMOVED***
      throw new Error("No user with specified username exists");
***REMOVED***

    AppUser user = userOpt.get();
    user.setStatus(status.replace("\"", ""));
    repository.save(user);
    return status;
  ***REMOVED***

  @Override
  public String addFriend(String username, String friendUsername)
      throws EntityExistsException, UsernameNotFoundException ***REMOVED***
    if (username.isEmpty() || friendUsername.isEmpty()) ***REMOVED***
      throw new UsernameNotFoundException("Username and friend's username cannot be empty");
***REMOVED***

    Optional<AppUser> optUser = repository.findByUsername(username);
    if (!optUser.isPresent()) ***REMOVED***
      throw new UsernameNotFoundException("User does not exist");
***REMOVED***

    Optional<AppUser> optFriend = repository.findByUsername(friendUsername.replace("\"", ""));
    if (!optFriend.isPresent()) ***REMOVED***
      throw new UsernameNotFoundException("No user with username " + friendUsername + "exist");
***REMOVED***

    AppUser user = optUser.get();
    AppUser friend = optFriend.get();
    if (user.getFriends().contains(friend)) ***REMOVED***
      throw new EntityExistsException("User is already friends with " + friendUsername);
***REMOVED***

    user.addFriend(friend);
    friend.addFriend(user);
    user.deleteFriendRequest(friend);
    repository.save(user);
    return new String("User " + friendUsername + " added to friends list");
  ***REMOVED***

  @Override
  public String addFriendRequest(String username, String friendUsername) throws Exception ***REMOVED***
    if (username.isEmpty() || friendUsername.isEmpty()) ***REMOVED***
      throw new Exception("Username and friend's username cannot be empty");
***REMOVED***

    Optional<AppUser> optUser = repository.findByUsername(username);
    if (!optUser.isPresent()) ***REMOVED***
      throw new Exception("User does not exist");
***REMOVED***

    Optional<AppUser> optFriend = repository.findByUsername(friendUsername.replace("\"", ""));
    if (!optFriend.isPresent()) ***REMOVED***
      throw new Exception("No user with username " + friendUsername + " exist");
***REMOVED***

    AppUser user = optUser.get();
    AppUser friend = optFriend.get();
    if (friend.getFriendRequests().contains(user)) ***REMOVED***
      throw new Exception("Friend request has already been sent to " + friendUsername);
***REMOVED***

    friend.addFriendRequest(user);
    repository.save(friend);
    return new String("Sent friend request to " + friendUsername);
  ***REMOVED***

  @Override
  public List<AppUser> getFriendRequests(String username) throws UsernameNotFoundException ***REMOVED***
    if (username.isEmpty()) ***REMOVED***
      throw new UsernameNotFoundException("username cannot be empty");
***REMOVED***

    return repository.findByUsername(username).map(user -> user.getFriendRequests())
        .map(ArrayList::new)
        .orElseThrow(() -> new UsernameNotFoundException("User does not exist"));
  ***REMOVED***

  @Override
  public Set<AppUser> getFriends(String username) throws UsernameNotFoundException ***REMOVED***
    if (username.isEmpty()) ***REMOVED***
      throw new UsernameNotFoundException("username cannot be empty");
***REMOVED***

    Optional<AppUser> optUser = repository.findByUsername(username);
    if (!optUser.isPresent()) ***REMOVED***
      throw new UsernameNotFoundException("user does not exist");
***REMOVED***

    return optUser.get().getFriends();
  ***REMOVED***

  @Override
  public String deleteFriend(String username, String friendUsername) throws Exception ***REMOVED***
    if (username.isEmpty() || friendUsername.isEmpty()) ***REMOVED***
      throw new Exception("Username and friend's username cannot be empty");
***REMOVED***

    Optional<AppUser> optUser = repository.findByUsername(username);
    if (!optUser.isPresent()) ***REMOVED***
      throw new Exception("User does not exist");
***REMOVED***

    Optional<AppUser> optFriend = repository.findByUsername(friendUsername.replace("\"", ""));
    if (!optFriend.isPresent()) ***REMOVED***
      throw new Exception("No user with username " + friendUsername + "exist");
***REMOVED***

    AppUser user = optUser.get();
    AppUser friend = optFriend.get();
    if (!user.getFriends().contains(friend)) ***REMOVED***
      throw new Exception("User is not friends with " + friendUsername);
***REMOVED***

    user.deleteFriend(friend);
    friend.deleteFriend(user);
    repository.save(user);
    return new String("Deleted user " + friendUsername + " from friends list");
  ***REMOVED***

  @Override
  public List<AppUser> getUserByInterests(Set<String> interests) ***REMOVED***
    System.out.println(interests.iterator().next());
    return repository.findByInterestsIn(interests);
  ***REMOVED***

  @Override
  public List<AppUser> searchUsers(String query) ***REMOVED***
    return repository.findByUsernameContainingIgnoreCase(query);
  ***REMOVED***

***REMOVED***
