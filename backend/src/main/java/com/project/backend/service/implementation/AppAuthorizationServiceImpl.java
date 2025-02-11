package com.project.backend.service.implementation;

import java.util.Optional;
import java.util.Set;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.project.backend.model.AppAuthorization;
import com.project.backend.model.AppUser;
import com.project.backend.repository.AppAuthorizationRepository;
import com.project.backend.repository.UserRepository;
import com.project.backend.service.AppAuthorizationService;
import jakarta.persistence.EntityNotFoundException;

@Service
public class AppAuthorizationServiceImpl implements AppAuthorizationService ***REMOVED***
  private final AppAuthorizationRepository appAuthorizationRepository;
  private final UserRepository userRepository;
  private final Long AppId = 1L;

  public AppAuthorizationServiceImpl(AppAuthorizationRepository appAuthorizationRepository,
      UserRepository userRepository) ***REMOVED***
    this.appAuthorizationRepository = appAuthorizationRepository;
    this.userRepository = userRepository;
  ***REMOVED***

  @Override
  public Set<AppUser> getPendingRequests(String username) throws EntityNotFoundException ***REMOVED***
    userRepository.findByUsername(username).filter(user -> user.getRole().equals("ADMIN"))
        .orElseThrow(() -> new SecurityException("User is not authorized to access this."));

    AppAuthorization app = appAuthorizationRepository.findById(AppId)
        .orElseThrow(() -> new EntityNotFoundException("App instance has not been created."));
    return app.getPendingRequests();
  ***REMOVED***

  @Override
  public ResponseEntity<String> approvePendingRequest(String username)
      throws EntityNotFoundException ***REMOVED***

    Optional<AppUser> optUser = userRepository.findByUsername(username);
    if (!optUser.isPresent()) ***REMOVED***
      return ResponseEntity.badRequest().body("User does not exist.");
***REMOVED***

    AppUser user = optUser.get();

    AppAuthorization app = appAuthorizationRepository.findById(AppId)
        .orElseThrow(() -> new EntityNotFoundException("App instance has not been created."));

    user.setPendingRequest(false);
    app.deletePendingRequest(user);
    userRepository.save(user);
    appAuthorizationRepository.save(app);
    return ResponseEntity.ok("User request has been approved.");
  ***REMOVED***

  @Override
  public ResponseEntity<String> rejectPendingRequest(String username)
      throws EntityNotFoundException ***REMOVED***
    Optional<AppUser> optUser = userRepository.findByUsername(username);
    if (!optUser.isPresent()) ***REMOVED***
      return ResponseEntity.badRequest().body("User does not exist.");
***REMOVED***

    AppUser user = optUser.get();

    AppAuthorization app = appAuthorizationRepository.findById(AppId)
        .orElseThrow(() -> new EntityNotFoundException("App instance has not been created."));


    app.deletePendingRequest(user);
    appAuthorizationRepository.save(app);
    userRepository.delete(user);
    return ResponseEntity.ok("User request has been rejected");
  ***REMOVED***
***REMOVED***
