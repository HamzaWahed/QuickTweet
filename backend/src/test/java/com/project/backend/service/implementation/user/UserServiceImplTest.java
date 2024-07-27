package com.project.backend.service.implementation.user;

import java.util.Set;
import java.util.HashSet;
import java.util.Arrays;
import java.util.Optional;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

import com.project.backend.config.SecurityConfig;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.transaction.annotation.Transactional;

import com.project.backend.model.AppUser;
import com.project.backend.repository.UserRepository;
import com.project.backend.service.implementation.UserServiceImpl;

@SpringBootTest
@AutoConfigureTestDatabase
@Transactional
public class UserServiceImplTest ***REMOVED***
  @Autowired
  private UserServiceImpl userService;

  @Autowired
  private SecurityConfig securityConfig;

  @Autowired
  private UserRepository repository;

  @Test
  void testCreateUser() ***REMOVED***
    AppUser user = new AppUser("root", "root@dal.ca",
        "password", "admin",
        "What is the name of your first pet?", "Leo");

    assertThat(userService.createUser(user)).isEqualTo(user);
  ***REMOVED***

  @Test
  void testCreateUserWithEmptyEmail() ***REMOVED***
    AppUser user = new AppUser("root", "", "password",
        "admin", "What is the name of your first pet?", "Leo");

    assertThat(userService.createUser(user)).isNull();
  ***REMOVED***

  @Test
  void testCreateUserWithEmptyUsername() ***REMOVED***
    AppUser user = new AppUser("", "root@dal.ca",
        "password", "admin",
        "What is the name of your first pet?", "Leo");

    assertThat(userService.createUser(user)).isNull();
  ***REMOVED***

  @Test
  void testCreateUserWithEmptyPassword() ***REMOVED***
    AppUser user = new AppUser("root", "root@dal.ca", "", "admin",
        "What is the name of your first pet?", "Leo");

    assertThat(userService.createUser(user)).isNull();
  ***REMOVED***

  @Test
  void testGetSecurityQuestion() ***REMOVED***
    AppUser user = new AppUser("root", "root@dal.ca",
        "password", "admin",
        "What is the name of your first pet?", "Leo");
    userService.createUser(user);
    assertThat(userService.getSecurityQuestion(user.getUsername()))
        .isEqualTo(user.getSecurityQuestion());
  ***REMOVED***

  @Test
  void testGetSecurityQuestionMultipleUsers() ***REMOVED***
    AppUser user1 = new AppUser("user1", "user1@dal.ca",
        "password", "admin",
        "What is the name of your first pet?", "Leo");
    AppUser user2 = new AppUser("user2", "user2@dal.ca",
        "password", "user",
        "What is the name of your first pet?", "Not Leo");
    userService.createUser(user1);
    userService.createUser(user2);

    assertThat(userService.getSecurityQuestion(user1.getUsername()))
        .isEqualTo(user1.getSecurityQuestion());
    assertThat(userService.getSecurityQuestion(user1.getUsername()))
        .isEqualTo(user1.getSecurityQuestion());
  ***REMOVED***

  @Test
  void testUpdatePassword() ***REMOVED***
    AppUser user = new AppUser("root", "root@dal.ca",
        "password", "admin",
        "What is the name of your first pet?", "Leo");
    userService.createUser(user);

    String newPassword = "newPassword";
    try ***REMOVED***
      userService.updatePassword(user.getUsername(), newPassword, "Leo");
***REMOVED*** catch (Exception e) ***REMOVED***
      fail("An exception should not have been thrown");
***REMOVED***
    AppUser updatedUser = userService.getUserByUsername(user.getUsername());
    assertTrue(securityConfig.passwordEncoder().matches(newPassword, updatedUser.getPassword()));
  ***REMOVED***

  @Test
  void testUpdatePasswordMissingUser() ***REMOVED***
    AppUser user = new AppUser("root", "root@dal.ca",
        "password", "admin",
        "What is the name of your first pet?", "Leo");

    String newPassword = "newPassword";
    try ***REMOVED***
      userService.updatePassword(user.getUsername(), newPassword, "Leo");
***REMOVED*** catch (Exception e) ***REMOVED***
      assertThat(e.getMessage()).isEqualTo("User does not exist.");
***REMOVED***
  ***REMOVED***

  @Test
  void testDeleteUser() ***REMOVED***
    AppUser user = new AppUser("root", "root@dal.ca",
        "password", "admin",
        "What is the name of your first pet?", "Leo");

    userService.createUser(user);
    assertThat(userService.deleteUser(user.getUsername())).isEqualTo(user);
  ***REMOVED***

  @Test
  void testDeleteUserById() ***REMOVED***
    AppUser user = new AppUser("root", "root@dal.ca",
        "password", "admin",
        "What is the name of your first pet?", "Leo");
    AppUser createdUser = userService.createUser(user);
    assertThat(userService.deleteUser(createdUser.getId()))
        .isEqualTo(ResponseEntity.ok().body("User deleted"));
  ***REMOVED***

  @Test
  void testUpdateUserRole() ***REMOVED***
    AppUser user = new AppUser("root", "root@dal.ca",
        "password", "ADMIN",
        "What is the name of your first pet?", "Leo");
    repository.save(user);
    String newRole = "USER";
    userService.updateUserRole(user.getId(), user.getUsername());
    AppUser updatedUser = repository.findById(user.getId()).get();
    assertThat(updatedUser.getRole()).isEqualTo(newRole);
  ***REMOVED***

  @Test
  void testUpdateUserRoleBadRole() ***REMOVED***
    AppUser user = new AppUser("root", "root@dal.ca",
        "password", "USER",
        "What is the name of your first pet?", "Leo");
    repository.save(user);
    assertThrows(SecurityException.class, () -> ***REMOVED***
      userService.updateUserRole(user.getId(), user.getUsername());
***REMOVED***);
  ***REMOVED***

  @Test
  void testGetAllUsers() ***REMOVED***
    AppUser user = new AppUser("root", "root@dal.ca",
        "password", "admin",
        "What is the name of your first pet?", "Leo");

    userService.createUser(user);
    user.setPendingRequest(false);
    repository.save(user);
    assertThat(userService.getAllUsers().size()).isEqualTo(1);
  ***REMOVED***

  @Test
  void testGetAllUsersMultipleUsers() ***REMOVED***
    AppUser user1 = new AppUser("user1", "user1@dal.ca",
        "password", "admin",
        "What is the name of your first pet?", "Leo");
    AppUser user2 = new AppUser("user2", "user2@dal.ca",
        "password", "user",
        "What is the name of your first pet?", "Not Leo");
    userService.createUser(user1);
    userService.createUser(user2);
    user1.setPendingRequest(false);
    user2.setPendingRequest(false);
    repository.save(user1);
    repository.save(user2);
    assertThat(userService.getAllUsers().size()).isEqualTo(2);
  ***REMOVED***

  @Test
  void testGetUserById() ***REMOVED***
    AppUser user = new AppUser("root", "root@dal.ca",
        "password", "admin",
        "What is the name of your first pet?", "Leo");
    AppUser createdUser = userService.createUser(user);
    assertThat(userService.getUserById(createdUser.getId())).isEqualTo(user);
  ***REMOVED***

  @Test
  void testGetUserByIdNotFound() ***REMOVED***
    Long invalidUserId = 999L;
    assertNull(userService.getUserById(invalidUserId));
  ***REMOVED***

  @Test
  void testUpdateUser() ***REMOVED***
    AppUser user = new AppUser("root", "root@dal.ca",
        "password", "admin",
        "What is the name of your first pet?", "Leo");
    userService.createUser(user);

    user.setEmail("root2@dal.ca");
    assertThat(userService.updateUser(user.getUsername(), user)).isEqualTo(user);
  ***REMOVED***

  @Test
  void testUpdateNonExistentUser() ***REMOVED***
    AppUser nonExistentUser = new AppUser("nonexistent", "nonexistent@dal.ca",
        "password", "user",
        "What is your favorite color?", "Blue");

    assertNull(userService.updateUser(nonExistentUser.getUsername(), nonExistentUser));
  ***REMOVED***

  @Test
  void testGetUserByUsername() ***REMOVED***
    AppUser user = new AppUser("root", "root@dal.ca",
        "password", "admin",
        "What is the name of your first pet?", "Leo");
    userService.createUser(user);
    assertThat(userService.getUserByUsername(user.getUsername())).isEqualTo(user);
  ***REMOVED***

  @Test
  void testGetUserByUsernameNotFound() ***REMOVED***
    String nonExistentUsername = "nonexistent";

    assertNull(userService.getUserByUsername(nonExistentUsername));
  ***REMOVED***

  @Test
  void testGetUserStatus() ***REMOVED***
    AppUser user = new AppUser("root", "root@dal.ca",
        "password", "admin",
        "What is the name of your first pet?", "Leo");
    userService.createUser(user);
    assertThat(userService.getUserStatus(user.getUsername())).isEqualTo(user.getStatus());
  ***REMOVED***

  @Test
  void testGetUserStatusNotFound() ***REMOVED***
    String nonExistentUsername = "nonexistent";

    assertThrows(UsernameNotFoundException.class, () -> ***REMOVED***
      userService.getUserStatus(nonExistentUsername);
***REMOVED***);
  ***REMOVED***

  @Test
  void testUpdateUserStatus() ***REMOVED***
    AppUser user = new AppUser("root", "root@dal.ca",
        "password", "admin",
        "What is the name of your first pet?", "Leo");

    userService.createUser(user);
    String newStatus = "available";
    try ***REMOVED***
      userService.updateUserStatus(user.getUsername(), newStatus);
***REMOVED*** catch (Exception e) ***REMOVED***
      fail("An exception should not have been thrown");
***REMOVED***
    AppUser updatedUser = userService.getUserByUsername(user.getUsername());
    assertThat(updatedUser.getStatus()).isEqualTo(newStatus);
  ***REMOVED***

  @Test
  void testUpdateUserStatusNotFound() ***REMOVED***
    String nonExistentUsername = "nonexistent";
    String newStatus = "available";

    Error error = assertThrows(Error.class, () -> ***REMOVED***
      userService.updateUserStatus(nonExistentUsername, newStatus);
***REMOVED***);
    assertThat(error.getMessage()).isEqualTo("No user with specified username exists");
  ***REMOVED***

  @Test
  void testFriends() ***REMOVED***
    AppUser user1 = new AppUser("root", "root@dal.ca",
        "password", "admin",
        "What is the name of your first pet?", "Leo");

    AppUser user2 = new AppUser("reee", "reee2@dal.ca",
        "password", "admin",
        "What is the name of your first pet?", "Leo");

    Set<AppUser> user1_friends = new HashSet<>(Arrays.asList(user2));
    Set<AppUser> user2_friends = new HashSet<>(Arrays.asList(user1));
    repository.save(user1);
    repository.save(user2);
    user1.addFriend(user2);
    user2.addFriend(user1);
    repository.save(user1);
    assertAll(() -> assertThat(user1.getFriends()).isEqualTo(user1_friends),
        () -> assertThat(user2.getFriends()).isEqualTo(user2_friends));
  ***REMOVED***

  @Test
  void testAddFriendRequestWithEmptyUsername() ***REMOVED***
    Exception exception = assertThrows(Exception.class, () -> ***REMOVED***
      userService.addFriendRequest("", "friendUsername");
***REMOVED***);

    assertThat(exception.getMessage()).isEqualTo("Username and friend's username cannot be empty");
  ***REMOVED***

  @Test
  void testAddFriendRequestWithEmptyFriendUsername() ***REMOVED***
    Exception exception = assertThrows(Exception.class, () -> ***REMOVED***
      userService.addFriendRequest("username", "");
***REMOVED***);

    assertThat(exception.getMessage()).isEqualTo("Username and friend's username cannot be empty");
  ***REMOVED***

  @Test
  void testAddFriendRequestWithNonExistentUser() ***REMOVED***
    Exception exception = assertThrows(Exception.class, () -> ***REMOVED***
      userService.addFriendRequest("nonExistentUser", "friendUsername");
***REMOVED***);

    assertThat(exception.getMessage()).isEqualTo("User does not exist");
  ***REMOVED***

  @Test
  void testAddFriendRequestWithNonExistentFriend() ***REMOVED***
    AppUser user = new AppUser("user", "user@dal.ca",
        "password", "admin",
        "What is the name of your first pet?", "Leo");
    repository.save(user);

    Exception exception = assertThrows(Exception.class, () -> ***REMOVED***
      userService.addFriendRequest("user", "nonExistentFriend");
***REMOVED***);

    assertThat(exception.getMessage()).isEqualTo("No user with username nonExistentFriend exist");
  ***REMOVED***

  @Test
  void testAddFriendRequestAlreadySent() ***REMOVED***
    AppUser user = new AppUser("user", "user@dal.ca",
        "password", "admin",
        "What is the name of your first pet?", "Leo");
    AppUser friend = new AppUser("friend", "friend@dal.ca",
        "password", "admin",
        "What is the name of your first pet?", "Leo");
    repository.save(user);
    repository.save(friend);
    friend.addFriendRequest(user);
    repository.save(friend);

    Exception exception = assertThrows(Exception.class, () -> ***REMOVED***
      userService.addFriendRequest("user", "friend");
***REMOVED***);

    assertThat(exception.getMessage()).isEqualTo("Friend request has already been sent to friend");
  ***REMOVED***

  @Test
  void testAddFriendRequestSuccess() throws Exception ***REMOVED***
    AppUser user = new AppUser("user", "user@dal.ca",
        "password", "admin",
        "What is the name of your first pet?", "Leo");
    AppUser friend = new AppUser("friend", "friend@dal.ca",
        "password", "admin",
        "What is the name of your first pet?", "Leo");
    repository.save(user);
    repository.save(friend);

    String response = userService.addFriendRequest("user", "friend");

    assertThat(response).isEqualTo("Sent friend request to friend");
    Optional<AppUser> updatedFriend = repository.findByUsername("friend");
    assertThat(updatedFriend.get().getFriendRequests()).contains(user);
  ***REMOVED***

  @Test
  void testGetFriendRequestsWithEmptyUsername() ***REMOVED***
    Exception exception = assertThrows(UsernameNotFoundException.class, () -> ***REMOVED***
      userService.getFriendRequests("");
***REMOVED***);

    assertThat(exception.getMessage()).isEqualTo("username cannot be empty");
  ***REMOVED***

  @Test
  void testGetFriendRequestsWithNonExistentUser() ***REMOVED***
    Exception exception = assertThrows(UsernameNotFoundException.class, () -> ***REMOVED***
      userService.getFriendRequests("nonExistentUser");
***REMOVED***);

    assertThat(exception.getMessage()).isEqualTo("User does not exist");
  ***REMOVED***

  @Test
  void testGetFriendRequests() ***REMOVED***
    AppUser user = new AppUser("root", "root@gmail.com",
        "password", "admin",
        "What is the name of your first pet?", "Leo");
    AppUser user2 = new AppUser("reee", "reee2@gmail.com",
        "password", "admin",
        "What is the name of your first pet?", "Leo");

    Set<AppUser> user_pending = new HashSet<>(Arrays.asList(user2));
    Set<AppUser> user2_pending = new HashSet<>(Arrays.asList(user));
    repository.save(user);
    repository.save(user2);
    user.addFriendRequest(user2);
    user2.addFriendRequest(user);
    repository.save(user);
    assertAll(() -> assertThat(user.getFriendRequests()).isEqualTo(user_pending),
        () -> assertThat(user2.getFriendRequests()).isEqualTo(user2_pending));
  ***REMOVED***

  @Test
  void testGetFriendsWithEmptyUsername() ***REMOVED***
    Exception exception = assertThrows(UsernameNotFoundException.class, () -> ***REMOVED***
      userService.getFriends("");
***REMOVED***);

    assertThat(exception.getMessage()).isEqualTo("username cannot be empty");
  ***REMOVED***

  @Test
  void testGetFriendsWithNonExistentUser() ***REMOVED***
    Exception exception = assertThrows(UsernameNotFoundException.class, () -> ***REMOVED***
      userService.getFriends("nonExistentUser");
***REMOVED***);

    assertThat(exception.getMessage()).isEqualTo("user does not exist");
  ***REMOVED***

  @Test
  void testGetFriendsSuccess() ***REMOVED***
    AppUser user = new AppUser("user", "user@dal.ca",
        "password", "admin",
        "What is the name of your first pet?", "Leo");
    AppUser friend = new AppUser("friend", "friend@dal.ca",
        "password", "admin",
        "What is the name of your first pet?", "Leo");
    repository.save(user);
    repository.save(friend);
    user.addFriend(friend);
    friend.addFriend(user);
    repository.save(user);
    repository.save(friend);

    Set<AppUser> friends = userService.getFriends("user");

    assertThat(friends).containsExactly(friend);
  ***REMOVED***

  @Test
  void testDeleteFriendWithEmptyUsername() ***REMOVED***
    Exception exception = assertThrows(Exception.class, () -> ***REMOVED***
      userService.deleteFriend("", "friend");
***REMOVED***);

    assertThat(exception.getMessage()).isEqualTo("Username and friend's username cannot be empty");
  ***REMOVED***

  @Test
  void testDeleteFriendWithEmptyFriendUsername() ***REMOVED***
    Exception exception = assertThrows(Exception.class, () -> ***REMOVED***
      userService.deleteFriend("user", "");
***REMOVED***);

    assertThat(exception.getMessage()).isEqualTo("Username and friend's username cannot be empty");
  ***REMOVED***

  @Test
  void testDeleteFriendWithNonExistentUser() ***REMOVED***
    Exception exception = assertThrows(Exception.class, () -> ***REMOVED***
      userService.deleteFriend("nonExistentUser", "friend");
***REMOVED***);

    assertThat(exception.getMessage()).isEqualTo("User does not exist");
  ***REMOVED***

  @Test
  void testDeleteFriendWithNonExistentFriend() ***REMOVED***
    AppUser user = new AppUser("user", "user@dal.ca",
        "password", "admin",
        "What is the name of your first pet?", "Leo");
    repository.save(user);

    Exception exception = assertThrows(Exception.class, () -> ***REMOVED***
      userService.deleteFriend("user", "nonExistentFriend");
***REMOVED***);

    assertThat(exception.getMessage()).isEqualTo("No user with username nonExistentFriendexist");
  ***REMOVED***

  @Test
  void testDeleteFriendSuccess() throws Exception ***REMOVED***
    AppUser user = new AppUser("user", "user@dal.ca",
        "password", "admin",
        "What is the name of your first pet?", "Leo");
    AppUser friend = new AppUser("friend", "friend@dal.ca",
        "password", "admin",
        "What is the name of your first pet?", "Leo");
    repository.save(user);
    repository.save(friend);
    user.addFriend(friend);
    friend.addFriend(user);
    repository.save(user);
    repository.save(friend);

    String result = userService.deleteFriend("user", "friend");

    assertThat(result).isEqualTo("Deleted user friend from friends list");
    assertThat(user.getFriends()).isEmpty();
    assertThat(friend.getFriends()).isEmpty();
  ***REMOVED***

  @Test
  void testGetUserByInterests() ***REMOVED***
    AppUser user1 = new AppUser("user1", "user1@dal.ca",
        "password", "admin",
        "What is the name of your first pet?", "Leo");
    user1.setInterests(new HashSet<>(Arrays.asList("technology", "sports")));
    AppUser user2 = new AppUser("user2", "user2@dal.ca",
        "password", "admin",
        "What is the name of your first pet?", "Leo");
    user2.setInterests(new HashSet<>(Arrays.asList("music", "sports")));
    repository.save(user1);
    repository.save(user2);

    Set<String> interests = new HashSet<>(Arrays.asList("sports"));

    List<AppUser> users = userService.getUserByInterests(interests);

    assertThat(users).containsExactlyInAnyOrder(user1, user2);
  ***REMOVED***

  @Test
  void testGetUserByNonExistingInterest() ***REMOVED***
    AppUser user1 = new AppUser("user1", "user1@dal.ca",
        "password", "admin",
        "What is the name of your first pet?", "Leo");
    user1.setInterests(new HashSet<>(Arrays.asList("technology", "sports")));
    AppUser user2 = new AppUser("user2", "user2@dal.ca",
        "password", "admin",
        "What is the name of your first pet?", "Leo");
    user2.setInterests(new HashSet<>(Arrays.asList("music", "sports")));
    repository.save(user1);
    repository.save(user2);

    Set<String> interests = new HashSet<>(Arrays.asList("gaming"));

    List<AppUser> users = userService.getUserByInterests(interests);

    assertThat(users).isEmpty();
  ***REMOVED***

  @Test
  void testGetUserByMultipleInterests() ***REMOVED***
    AppUser user1 = new AppUser("user1", "user1@dal.ca",
        "password", "admin",
        "What is the name of your first pet?", "Leo");
    user1.setInterests(new HashSet<>(Arrays.asList("technology", "sports")));
    AppUser user2 = new AppUser("user2", "user2@dal.ca",
        "password", "admin",
        "What is the name of your first pet?", "Leo");
    user2.setInterests(new HashSet<>(Arrays.asList("music", "sports")));
    repository.save(user1);
    repository.save(user2);

    Set<String> interests = new HashSet<>(Arrays.asList("sports", "technology"));

    List<AppUser> users = userService.getUserByInterests(interests);

    assertThat(users).containsExactlyInAnyOrder(user1, user2);
  ***REMOVED***

  @Test
  void testSearchUsers() ***REMOVED***

    AppUser user1 = new AppUser("user1", "user1@dal.ca",
        "password", "admin",
        "What is the name of your first pet?", "Leo");
    AppUser user2 = new AppUser("user2", "user2@dal.ca",
        "password", "admin",
        "What is the name of your first pet?", "Leo");
    repository.save(user1);
    repository.save(user2);
    String query = "user1";

    List<AppUser> users = userService.searchUsers(query);

    assertThat(users).containsExactly(user1);
  ***REMOVED***

  @Test
  void testSearchUsersWithNoResults() ***REMOVED***
    AppUser user1 = new AppUser("user1", "user1@dal.ca",
        "password", "admin",
        "What is the name of your first pet?", "Leo");
    AppUser user2 = new AppUser("user2", "user2@dal.ca",
        "password", "admin",
        "What is the name of your first pet?", "Leo");
    repository.save(user1);
    repository.save(user2);

    String query = "does not exist";

    List<AppUser> users = userService.searchUsers(query);

    assertThat(users).isEmpty();
  ***REMOVED***

  @Test
  void testSearchUsersCaseInsensitive() ***REMOVED***
    AppUser user1 = new AppUser("user1", "user1@dal.ca",
        "password", "admin",
        "What is the name of your first pet?", "Leo");
    AppUser user2 = new AppUser("user2", "user2@dal.ca",
        "password", "admin",
        "What is the name of your first pet?", "Leo");

    repository.save(user1);
    repository.save(user2);

    String query = "USER2";

    List<AppUser> users = userService.searchUsers(query);

    assertThat(users).containsExactly(user2);
  ***REMOVED***
***REMOVED***
