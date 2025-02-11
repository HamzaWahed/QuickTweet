package com.project.backend.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.backend.model.AppUser;
import com.project.backend.model.Post;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> ***REMOVED***
  List<Post> findByUser(AppUser user);

  List<Post> findByUserUsernameInOrderByCreateDateDesc(List<String> usernames);
***REMOVED***
