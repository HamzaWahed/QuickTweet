package com.project.backend.controller;

import org.springframework.web.bind.annotation.*;

import com.project.backend.service.implementation.UserServiceImpl;
import com.project.backend.utils.UpdatePassword;
import jakarta.persistence.EntityExistsException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.backend.model.AppUser;

import java.util.List;
import java.util.Set;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

@RestController
public class UserController ***REMOVED***
  private final UserServiceImpl userService;
  private final ObjectMapper mapper;

  /**
   * Constructs a UserController with the specified user service and object mapper.
   * 
   * @param userService The user service implementation to be used.
   */
  public UserController(UserServiceImpl userService) ***REMOVED***
    this.userService = userService;
    this.mapper = new ObjectMapper();
  ***REMOVED***

  /**
   * Retrieves all users.
   * 
   * @return A list of all users.
   */
  @GetMapping("/users")
  public List<AppUser> getAllUsers() ***REMOVED***
    return userService.getAllUsers();
  ***REMOVED***

  /**
   * Retrieves a user by their ID.
   * 
   * @param id The ID of the user to retrieve.
   * @return The user with the specified ID.
   */
  @GetMapping("/users/***REMOVED***id***REMOVED***")
  public AppUser getUserById(@PathVariable("id") Long id) ***REMOVED***
    return userService.getUserById(id);
  ***REMOVED***

  /**
   * Creates a new user.
   * 
   * @param user The user to create.
   * @return A ResponseEntity containing the created user.
   */
  @PostMapping("/users")
  public ResponseEntity<String> createUser(@RequestBody AppUser user) ***REMOVED***
    try ***REMOVED***
      AppUser savedUser = userService.createUser(user);
      return ResponseEntity.status(HttpStatus.CREATED).body(mapper.writeValueAsString(savedUser));
***REMOVED*** catch (EntityExistsException err) ***REMOVED***
      return ResponseEntity.status(HttpStatus.FORBIDDEN).body(err.getMessage());
***REMOVED*** catch (JsonProcessingException err) ***REMOVED***
      return ResponseEntity.status(HttpStatus.FORBIDDEN).body(err.getMessage());
***REMOVED***
  ***REMOVED***

  /**
   * Retrieves a user by their username. Fetches a single user based on the provided username. If
   * the user does not exist, an exception is thrown.
   * 
   * @param username The username of the user to retrieve.
   * @return The user with the specified username.
   */
  @GetMapping("/users/username/***REMOVED***username***REMOVED***")
  public AppUser getUserByUsername(@PathVariable("username") String username) ***REMOVED***
    return userService.getUserByUsername(username);
  ***REMOVED***

  /**
   * Retrieves the security question associated with a user's account based on their username. This
   * endpoint is typically used in the process of resetting a forgotten password, where the security
   * question must be answered to proceed. If the username does not exist, an exception is thrown.
   * 
   * @param username The username of the user whose security question is being requested.
   * @return A ResponseEntity containing the security question or an error message.
   */
  @GetMapping("/users/forgotPassword/***REMOVED***username***REMOVED***")
  public ResponseEntity<String> getSecurityQuestion(@PathVariable("username") String username) ***REMOVED***
    try ***REMOVED***
      return ResponseEntity.status(HttpStatus.ACCEPTED)
          .body(userService.getSecurityQuestion(username));
***REMOVED*** catch (UsernameNotFoundException err) ***REMOVED***
      return ResponseEntity.status(HttpStatus.FORBIDDEN).body(err.getMessage());
***REMOVED***
  ***REMOVED***

  /**
   * Updates the password for a user identified by username. This endpoint is used in the password
   * reset flow, where the user provides a new password along with the answer to their security
   * question. If the update is successful, an ACCEPTED status is returned. If there's an error
   * (e.g., incorrect security answer), a FORBIDDEN status is returned with an error message.
   * 
   * @param username The username of the user whose password is being updated.
   * @param passwordObj An object containing the new password and the answer to the security
   *        question.
   * @return A ResponseEntity indicating the result of the password update operation.
   */
  @PostMapping("/users/forgotPassword/***REMOVED***username***REMOVED***")
  public ResponseEntity<String> updatePassword(@PathVariable("username") String username,
      @RequestBody UpdatePassword passwordObj) ***REMOVED***
    try ***REMOVED***
      userService.updatePassword(username, passwordObj.password, passwordObj.answer);
      return ResponseEntity.status(HttpStatus.ACCEPTED).body("Password updated");
***REMOVED*** catch (Exception err) ***REMOVED***
      return ResponseEntity.status(HttpStatus.FORBIDDEN).body(err.getMessage());
***REMOVED***
  ***REMOVED***

  /**
   * Updates the details of an existing user identified by username. This endpoint allows for
   * updating user information such as name, email, etc. The updated user object is returned upon
   * success. If the specified user does not exist, an exception is thrown.
   * 
   * @param username The username of the user to update.
   * @param user The updated user information.
   * @return The updated user object.
   */
  @PutMapping("/users/***REMOVED***username***REMOVED***")
  public AppUser updateUser(@PathVariable("username") String username, @RequestBody AppUser user) ***REMOVED***
    return userService.updateUser(username, user);
  ***REMOVED***

  /**
   * Deletes a user identified by their unique ID. This endpoint removes the user from the system.
   * If the deletion is successful, a confirmation message is returned. If the specified user does
   * not exist or cannot be deleted, an appropriate error message is returned.
   * 
   * @param id The unique ID of the user to delete.
   * @return A ResponseEntity indicating the result of the deletion operation.
   */
  @DeleteMapping("/users/***REMOVED***id***REMOVED***")
  public ResponseEntity<String> deleteUser(@PathVariable("id") Long id) ***REMOVED***
    return userService.deleteUser(id);
  ***REMOVED***

  /**
   * Updates the role of a user identified by their unique ID. This endpoint allows an admin user to
   * update the role of another user, for example, from a regular user to an admin. The operation is
   * performed by providing the ID of the user to update and the username of the admin performing
   * the update. If the update is successful, a confirmation message is returned. If the specified
   * user does not exist or the operation fails, an appropriate error message is returned.
   * 
   * @param id The unique ID of the user whose role is being updated.
   * @param adminUsername The username of the admin user performing the update.
   * @return A ResponseEntity indicating the result of the role update operation.
   */
  @PutMapping("/admin/users/***REMOVED***id***REMOVED***")
  public ResponseEntity<String> updateUserRole(@PathVariable("id") Long id,
      @RequestBody String adminUsername) ***REMOVED***
    return userService.updateUserRole(id, adminUsername.replace("\"", ""));
  ***REMOVED***

  /**
   * Retrieves the current status of a user identified by their username. This endpoint is used to
   * fetch the user's status, such as active, inactive, or suspended. If the user is found, their
   * status is returned in the response. If the specified user does not exist, an error message is
   * returned.
   * 
   * @param username The username of the user whose status is being queried.
   * @return A ResponseEntity containing the user's status or an error message.
   */
  @GetMapping("/users/status/***REMOVED***username***REMOVED***")
  public ResponseEntity<String> getUserStatus(@PathVariable("username") String username) ***REMOVED***
    try ***REMOVED***
      String status = userService.getUserStatus(username);
      return ResponseEntity.status(HttpStatus.ACCEPTED).body(status);
***REMOVED*** catch (UsernameNotFoundException err) ***REMOVED***
      return ResponseEntity.status(HttpStatus.FORBIDDEN).body(err.getMessage());
***REMOVED***
  ***REMOVED***

  /**
   * Updates the status of a user identified by their username. This endpoint allows for changing
   * the status of a user, such as activating, deactivating, or suspending their account. The
   * operation is performed by providing the username of the user and the new status value. If the
   * update is successful, an ACCEPTED status is returned. If there's an error during the update, a
   * FORBIDDEN status is returned with an error message.
   * 
   * @param username The username of the user whose status is being updated.
   * @param status The new status to be applied to the user.
   * @return A ResponseEntity indicating the result of the status update operation.
   */
  @PutMapping("/users/status/***REMOVED***username***REMOVED***")
  public ResponseEntity<String> updateUserStatus(@PathVariable("username") String username,
      @RequestBody String status) ***REMOVED***
    try ***REMOVED***
      String updatedStatus = userService.updateUserStatus(username, status);
      return ResponseEntity.status(HttpStatus.ACCEPTED).body(updatedStatus);
***REMOVED*** catch (Exception err) ***REMOVED***
      return ResponseEntity.status(HttpStatus.FORBIDDEN).body(err.getMessage());
***REMOVED***
  ***REMOVED***

  /**
   * Adds a friend for the specified user. This method allows a user to add another user as a friend
   * directly, bypassing the friend request process. If the addition is successful, an ACCEPTED
   * status is returned. If there's an error during the addition, a FORBIDDEN status is returned
   * with an error message.
   * 
   * @param username The username of the user who is adding the friend.
   * @param friendUsername The username of the user being added as a friend.
   * @return A ResponseEntity indicating the result of the add friend operation.
   */
  @PutMapping("/users/friends/***REMOVED***username***REMOVED***")
  public ResponseEntity<String> addFriend(@PathVariable("username") String username,
      @RequestBody String friendUsername) ***REMOVED***
    try ***REMOVED***
      String friendStatus = userService.addFriend(username, friendUsername);
      return ResponseEntity.status(HttpStatus.ACCEPTED).body(friendStatus);
***REMOVED*** catch (Exception err) ***REMOVED***
      return ResponseEntity.status(HttpStatus.FORBIDDEN).body(err.getMessage());
***REMOVED***
  ***REMOVED***

  /**
   * Adds a friend request for the specified user. This method allows a user to send a friend
   * request to another user. If the request is successfully sent, an ACCEPTED status is returned.
   * If there's an error in sending the request, a FORBIDDEN status is returned with an error
   * message.
   * 
   * @param username The username of the user sending the friend request.
   * @param friendUsername The username of the user to whom the friend request is being sent.
   * @return A ResponseEntity indicating the result of the friend request operation.
   */
  @PutMapping("/users/friends/requests/***REMOVED***username***REMOVED***")
  public ResponseEntity<String> addFriendRequest(@PathVariable("username") String username,
      @RequestBody String friendUsername) ***REMOVED***
    try ***REMOVED***
      String requestStatus = userService.addFriendRequest(username, friendUsername);
      return ResponseEntity.status(HttpStatus.ACCEPTED).body(requestStatus);
***REMOVED*** catch (Exception err) ***REMOVED***
      return ResponseEntity.status(HttpStatus.FORBIDDEN).body(err.getMessage());
***REMOVED***
  ***REMOVED***

  /**
   * Retrieves friend requests for the specified user. This method fetches a list of users who have
   * sent a friend request to the specified user.
   * 
   * @param username The username of the user whose friend requests are being retrieved.
   * @return A list of AppUser objects representing the users who have sent a friend request.
   */
  @GetMapping("/users/friends/requests/***REMOVED***username***REMOVED***")
  public List<AppUser> getFriendRequests(@PathVariable("username") String username) ***REMOVED***
    return userService.getFriendRequests(username);
  ***REMOVED***

  /**
   * Retrieves friends for the specified user. This method fetches a set of users who are friends
   * with the specified user.
   * 
   * @param username The username of the user whose friends are being retrieved.
   * @return A set of AppUser objects representing the user's friends.
   */
  @GetMapping("/users/friends/***REMOVED***username***REMOVED***")
  public Set<AppUser> getFriends(@PathVariable("username") String username) ***REMOVED***
    return userService.getFriends(username);
  ***REMOVED***

  /**
   * Deletes a friend for the specified user. This method allows a user to delete a friend. If the
   * deletion is successful, an ACCEPTED status is returned. If there's an error in deleting the
   * friend, a FORBIDDEN status is returned with an error message.
   * 
   * @param username The username of the user deleting the friend.
   * @param friendUsername The username of the friend to be deleted.
   * @return A ResponseEntity indicating the result of the delete operation.
   */
  @PostMapping("/users/friends/***REMOVED***username***REMOVED***")
  public ResponseEntity<String> deleteFriend(@PathVariable("username") String username,
      @RequestBody String friendUsername) ***REMOVED***
    try ***REMOVED***
      String deleteStatus = userService.deleteFriend(username, friendUsername.replace("\"", ""));
      return ResponseEntity.status(HttpStatus.ACCEPTED).body(deleteStatus);
***REMOVED*** catch (Exception err) ***REMOVED***
      return ResponseEntity.status(HttpStatus.FORBIDDEN).body(err.getMessage());
***REMOVED***
  ***REMOVED***

  /**
   * Retrieves users by their interests. This method fetches a list of users who have specified
   * interests that match the given set of interests.
   * 
   * @param interests A set of strings representing the interests to match against.
   * @return A list of AppUser objects representing the users with matching interests.
   */
  @PostMapping("/users/interests")
  public List<AppUser> getUsersByInterests(@RequestBody Set<String> interests) ***REMOVED***
    return userService.getUserByInterests(interests);
  ***REMOVED***

  /**
   * Retrieves users by their username query.
   * 
   * @param query The query to search for
   * @return A list of users that match the query
   */
  @GetMapping("/users/search")
  public ResponseEntity<List<AppUser>> searchUsers(@RequestParam String query) ***REMOVED***
    List<AppUser> users = userService.searchUsers(query);
    return ResponseEntity.ok(users);
  ***REMOVED***

***REMOVED***
