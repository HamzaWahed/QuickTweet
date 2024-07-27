package com.project.backend.controller.login;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpHeaders;
import org.springframework.test.web.servlet.MockMvc;

@SpringBootTest
@AutoConfigureMockMvc
public class LoginControllerTest ***REMOVED***
  @Autowired
  private MockMvc mockMvc;

  @Test
  public void testAuthentication() throws Exception ***REMOVED***
    String loginRequestBody = "***REMOVED***\"username\":\"root\",\"password\":\"dsadsa@A1\"***REMOVED***";
    String contentType = HttpHeaders.CONTENT_TYPE;
    String jsonType = "application/json";

    this.mockMvc.perform(post("/login").content(loginRequestBody).header(contentType, jsonType))
        .andDo(print()).andExpect(status().isOk());

  ***REMOVED***

  @Test
  public void testAuthenticationFailure() throws Exception ***REMOVED***
      String loginRequestBody = "***REMOVED***\"username\":\"root\",\"password\":\"wrongPassword\"***REMOVED***";
      String contentType = HttpHeaders.CONTENT_TYPE;
      String jsonType = "application/json";

      this.mockMvc.perform(post("/login").content(loginRequestBody).header(contentType, jsonType))
          .andDo(print()).andExpect(status().isUnauthorized());
  ***REMOVED***
***REMOVED***
