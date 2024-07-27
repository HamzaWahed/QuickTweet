package com.project.backend.startup;

import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;
import com.project.backend.model.AppAuthorization;
import com.project.backend.repository.AppAuthorizationRepository;

@Component
public class AppStartupRunner implements ApplicationRunner ***REMOVED***
  private final AppAuthorizationRepository appAuthorizationRepository;

  public AppStartupRunner(AppAuthorizationRepository appAuthorizationRepository) ***REMOVED***
    this.appAuthorizationRepository = appAuthorizationRepository;
  ***REMOVED***

  /**
   * Creates a new App instance if it does not exist.
   */
  @Override
  public void run(ApplicationArguments args) throws Exception ***REMOVED***
    if (!appAuthorizationRepository.findById(1L).isPresent()) ***REMOVED***
      AppAuthorization app = new AppAuthorization();
      app.setId(1L);
      appAuthorizationRepository.save(app);
***REMOVED***
  ***REMOVED***

***REMOVED***
