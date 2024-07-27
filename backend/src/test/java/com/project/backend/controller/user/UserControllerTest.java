package com.project.backend.controller.user;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.annotation.DirtiesContext.ClassMode;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.backend.model.AppUser;
import com.project.backend.service.implementation.UserServiceImpl;
import com.project.backend.utils.UpdatePassword;
import jakarta.transaction.Transactional;

@SpringBootTest
@AutoConfigureMockMvc
@AutoConfigureTestDatabase
@Transactional
@DirtiesContext(classMode = ClassMode.BEFORE_EACH_TEST_METHOD)
public class UserControllerTest ***REMOVED***
  @Autowired
  private MockMvc mockMvc;

  private static ObjectMapper objectMapper;

  @MockBean
  private UserServiceImpl userService;

  @BeforeAll
  public static void setUpClass() ***REMOVED***
    objectMapper = new ObjectMapper();
  ***REMOVED***

  @Test
  void testCreateUser() throws Exception ***REMOVED***
    AppUser user = new AppUser("root", "root@dal.ca", "password", "ADMIN",
        "What is the name of your first pet?", "Leo");
    String userJSON = objectMapper.writeValueAsString(user);
    this.mockMvc.perform(post("/users").content(userJSON).contentType(MediaType.APPLICATION_JSON)
        .accept(MediaType.APPLICATION_JSON)).andDo(print()).andExpect(status().isCreated());
  ***REMOVED***

  @Test
  void testCreateUserWithNullUser() throws Exception ***REMOVED***
    AppUser user = null;
    String userJSON = objectMapper.writeValueAsString(user);
    this.mockMvc.perform(post("/users").content(userJSON).contentType(MediaType.APPLICATION_JSON)
        .accept(MediaType.APPLICATION_JSON)).andDo(print()).andExpect(status().isBadRequest());
  ***REMOVED***

  @Test
  @WithMockUser
  void testDeleteUser() throws Exception ***REMOVED***
    when(userService.deleteUser(1L)).thenReturn(ResponseEntity.ok().body("User deleted"));

    this.mockMvc.perform(delete("/users/1")).andExpect(status().isOk())
        .andExpect(content().string("User deleted"));
  ***REMOVED***

  @Test
  @WithMockUser
  void testDeleteUserWithInvalidID() throws Exception ***REMOVED***
    when(userService.deleteUser(0L))
        .thenReturn(ResponseEntity.badRequest().body("User not found with id: " + 0L));

    this.mockMvc.perform(delete("/users/0")).andExpect(status().isBadRequest())
        .andExpect(content().string("User not found with id: " + 0L));
  ***REMOVED***

  @Test
  @WithMockUser
  void testGetAllUsers() throws Exception ***REMOVED***
    AppUser user1 = new AppUser("root", "root@dal.ca", "password", "ADMIN",
        "What is the name of your first pet?", "Leo");
    AppUser user2 = new AppUser("root2", "root2@dal.ca", "password", "ADMIN",
        "What is the name of your first pet?", "Leo");
    List<AppUser> users = Arrays.asList(user1, user2);

    when(userService.getAllUsers()).thenReturn(users);
    String expectedJSON = objectMapper.writeValueAsString(users);
    this.mockMvc.perform(get("/users")).andExpect(status().isOk())
        .andExpect(content().string(expectedJSON));
  ***REMOVED***

  @Test
  @WithMockUser
  void testGetAllUsersWhenThereAreNoUsers() throws Exception ***REMOVED***
    when(userService.getAllUsers()).thenReturn(null);
    this.mockMvc.perform(get("/users")).andExpect(content().string(""));
  ***REMOVED***

  @Test
  @WithMockUser
  void testGetUserById() throws Exception ***REMOVED***
    AppUser user = new AppUser("root", "root@dal.ca", "password", "ADMIN",
        "What is the name of your first pet?", "Leo");
    user.setId(1L);
    user.setPendingRequest(false);
    when(userService.getUserById(1L)).thenReturn(user);
    String expectedJSON = objectMapper.writeValueAsString(user);

    this.mockMvc.perform(get("/users/1")).andExpect(status().isOk())
        .andExpect(content().string(expectedJSON));
  ***REMOVED***

  @Test
  @WithMockUser
  void testGetUserByIdWithInvalidID() throws Exception ***REMOVED***
    when(userService.getUserById(0L)).thenReturn(null);
    this.mockMvc.perform(get("/users/0")).andExpect(content().string(""));
  ***REMOVED***

  @Test
  @WithMockUser
  void testGetUserByUsername() throws Exception ***REMOVED***
    AppUser user = new AppUser("root", "root@dal.ca", "password", "ADMIN",
        "What is the name of your first pet?", "Leo");
    user.setId(1L);
    user.setPendingRequest(false);
    when(userService.getUserByUsername("root")).thenReturn(user);
    String expectedJSON = objectMapper.writeValueAsString(user);

    this.mockMvc.perform(get("/users/username/root")).andExpect(status().isOk())
        .andExpect(content().string(expectedJSON));
  ***REMOVED***

  @Test
  @WithMockUser
  void testGetUserByUsernameWithInvalidUsername() throws Exception ***REMOVED***
    when(userService.getUserByUsername("invalid")).thenReturn(null);
    this.mockMvc.perform(get("/users/username/invalid")).andExpect(content().string(""));
  ***REMOVED***

  @Test
  @WithMockUser
  void testGetSecurityQuestion() throws Exception ***REMOVED***
    String username = "root";
    String securityQuestion = "What is the name of your first pet?";
    when(userService.getSecurityQuestion(username)).thenReturn(securityQuestion);

    this.mockMvc.perform(get("/users/forgotPassword/" + username)).andExpect(status().isAccepted())
        .andExpect(content().string(securityQuestion));
  ***REMOVED***

  @Test
  @WithMockUser
  void testGetSecurityQuestionWithInvalidUsername() throws Exception ***REMOVED***
    when(userService.getSecurityQuestion("invalid"))
        .thenThrow(new UsernameNotFoundException("User does not exist"));

    this.mockMvc.perform(get("/users/forgotPassword/invalid")).andExpect(status().isForbidden())
        .andExpect(content().string("User does not exist"));
  ***REMOVED***

  @Test
  @WithMockUser
  void testUpdatePassword() throws Exception ***REMOVED***
    String username = "root";
    UpdatePassword passwordObj = new UpdatePassword();
    passwordObj.password = "newPassword";
    passwordObj.answer = "Leo";

    String requestJson = objectMapper.writeValueAsString(passwordObj);

    this.mockMvc
        .perform(post("/users/forgotPassword/" + username).content(requestJson)
            .contentType(MediaType.APPLICATION_JSON))
        .andExpect(status().isAccepted()).andExpect(content().string("Password updated"));
  ***REMOVED***

  @Test
  @WithMockUser
  void testUpdateUser() throws Exception ***REMOVED***
    String username = "root";
    AppUser user = new AppUser("root", "root@dal.ca", "password", "ADMIN",
        "What is the name of your first pet?", "Leo");
    user.setId(1L);
    user.setPendingRequest(false);

    AppUser updatedUser = new AppUser("root", "root@dal.ca", "password", "ADMIN",
        "What is the name of your first pet?", "Leo");
    updatedUser.setId(1L);
    updatedUser.setBio("test run");
    updatedUser.setPendingRequest(false);

    String expectedJSON = objectMapper.writeValueAsString(updatedUser);
    when(userService.updateUser(eq(username), any(AppUser.class))).thenReturn(updatedUser);

    this.mockMvc
        .perform(
            put("/users/" + username).content(expectedJSON).contentType(MediaType.APPLICATION_JSON))
        .andExpect(status().isOk()).andExpect(content().json(expectedJSON));
  ***REMOVED***

  @Test
  @WithMockUser
  void testUpdateUserRole() throws Exception ***REMOVED***
    Long userId = 1L;
    String adminUsername = "admin";
    when(userService.updateUserRole(userId, adminUsername))
        .thenReturn(ResponseEntity.ok("User role updated"));

    this.mockMvc
        .perform(put("/admin/users/" + userId).content(adminUsername)
            .contentType(MediaType.APPLICATION_JSON))
        .andExpect(status().isOk()).andExpect(content().string("User role updated"));
  ***REMOVED***

  @Test
  @WithMockUser
  void testGetUserStatus() throws Exception ***REMOVED***
    String username = "root";
    String status = "Available";
    when(userService.getUserStatus(username)).thenReturn(status);

    this.mockMvc.perform(get("/users/status/" + username)).andExpect(status().isAccepted())
        .andExpect(content().string(status));
  ***REMOVED***

  @Test
  @WithMockUser
  void testUpdateUserStatus() throws Exception ***REMOVED***
    String username = "root";
    String status = "Available";
    when(userService.updateUserStatus(username, status)).thenReturn(status);

    this.mockMvc
        .perform(put("/users/status/" + username).content(status)
            .contentType(MediaType.APPLICATION_JSON))
        .andExpect(status().isAccepted()).andExpect(content().string(status));
  ***REMOVED***

  @Test
  @WithMockUser
  void testAddFriend() throws Exception ***REMOVED***
    String username = "root";
    String friendUsername = "friend";
    when(userService.addFriend(username, friendUsername)).thenReturn("Friend added");

    this.mockMvc
        .perform(put("/users/friends/" + username).content(friendUsername)
            .contentType(MediaType.APPLICATION_JSON))
        .andExpect(status().isAccepted()).andExpect(content().string("Friend added"));
  ***REMOVED***

  @Test
  @WithMockUser
  void testAddFriendRequest() throws Exception ***REMOVED***
    String username = "root";
    String friendUsername = "friend";
    when(userService.addFriendRequest(username, friendUsername)).thenReturn("Friend request sent");

    this.mockMvc.perform(put("/users/friends/requests/" + username).content(friendUsername)
        .contentType(MediaType.APPLICATION_JSON)).andExpect(status().isAccepted());
  ***REMOVED***

  @Test
  @WithMockUser
  void testGetFriendRequests() throws Exception ***REMOVED***
    String username = "root";
    AppUser user1 = new AppUser("user1", "user1@dal.ca", "password", "USER",
        "What is your mother's maiden name?", "Smith");
    AppUser user2 = new AppUser("user2", "user2@dal.ca", "password", "USER",
        "What was your first car?", "Toyota");

    List<AppUser> friendRequests = Arrays.asList(user1, user2);

    when(userService.getFriendRequests(username)).thenReturn(friendRequests);
    String expectedJson = objectMapper.writeValueAsString(friendRequests);

    this.mockMvc.perform(get("/users/friends/requests/" + username)).andExpect(status().isOk())
        .andExpect(content().json(expectedJson));
  ***REMOVED***

  @Test
  @WithMockUser
  void testGetFriends() throws Exception ***REMOVED***
    String username = "root";
    AppUser user1 = new AppUser("user1", "user1@dal.ca", "password", "USER",
        "What is your mother's maiden name?", "Smith");
    AppUser user2 = new AppUser("user2", "user2@dal.ca", "password", "USER",
        "What was your first car?", "Toyota");

    Set<AppUser> friends = new HashSet<>(Arrays.asList(user1, user2));

    when(userService.getFriends(username)).thenReturn(friends);
    String expectedJson = objectMapper.writeValueAsString(friends);

    this.mockMvc.perform(get("/users/friends/" + username)).andExpect(status().isOk())
        .andExpect(content().json(expectedJson));
  ***REMOVED***

  @Test
  @WithMockUser
  void testDeleteFriend() throws Exception ***REMOVED***
    String username = "root";
    String friendUsername = "friend";
    when(userService.deleteFriend(username, friendUsername)).thenReturn("Friend deleted");

    this.mockMvc
        .perform(post("/users/friends/" + username).content(friendUsername)
            .contentType(MediaType.APPLICATION_JSON))
        .andExpect(status().isAccepted()).andExpect(content().string("Friend deleted"));
  ***REMOVED***

  @Test
  @WithMockUser
  void testGetUsersByInterests() throws Exception ***REMOVED***
    Set<String> interests = new HashSet<>(Arrays.asList("coding", "gaming"));
    AppUser user1 = new AppUser("user1", "user1@dal.ca", "password", "USER",
        "What is your mother's maiden name?", "Smith");
    AppUser user2 = new AppUser("user2", "user2@dal.ca", "password", "USER",
        "What was your first car?", "Toyota");

    List<AppUser> usersByInterests = Arrays.asList(user1, user2);

    when(userService.getUserByInterests(interests)).thenReturn(usersByInterests);
    String requestJson = objectMapper.writeValueAsString(interests);
    String expectedJson = objectMapper.writeValueAsString(usersByInterests);

    this.mockMvc
        .perform(
            post("/users/interests").content(requestJson).contentType(MediaType.APPLICATION_JSON))
        .andExpect(status().isOk()).andExpect(content().json(expectedJson));
  ***REMOVED***
***REMOVED***
