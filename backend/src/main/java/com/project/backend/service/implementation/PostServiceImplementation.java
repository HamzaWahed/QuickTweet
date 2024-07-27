package com.project.backend.service.implementation;

import com.project.backend.model.AppUser;
import com.project.backend.model.Post;
import com.project.backend.repository.PostRepository;
import com.project.backend.repository.UserRepository;
import com.project.backend.service.PostService;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class PostServiceImplementation implements PostService ***REMOVED***
  private final PostRepository postRepository;
  private final UserRepository userRepository;

  public PostServiceImplementation(PostRepository postRepository, UserRepository userRepository) ***REMOVED***
    this.postRepository = postRepository;
    this.userRepository = userRepository;
  ***REMOVED***

  @Override
  public Post createPost(String username, Post post) ***REMOVED***
    if (post == null || post.getContent().isEmpty()) ***REMOVED***
      return null;
***REMOVED***

    Optional<AppUser> optUser = userRepository.findByUsername(username);
    if (!optUser.isPresent()) ***REMOVED***
      return null;
***REMOVED***

    long currentTimeMillis = System.currentTimeMillis();
    post.setCreateDate(new Timestamp(currentTimeMillis));
    post.setUser(optUser.get());
    postRepository.save(post);
    return post;
  ***REMOVED***

  @Override
  public List<Post> getAllPosts() ***REMOVED***
    if (postRepository.findAll().isEmpty()) ***REMOVED***
      return null;
***REMOVED*** else ***REMOVED***
      return postRepository.findAll();
***REMOVED***
  ***REMOVED***

  @Override
  public List<Post> getPostByUsername(String username) ***REMOVED***
    if (username.isEmpty()) ***REMOVED***
      return null;
***REMOVED***

    Optional<AppUser> optUser = userRepository.findByUsername(username);
    if (!optUser.isPresent()) ***REMOVED***
      return null;
***REMOVED***

    List<String> friendUsernames =
        optUser.get().getFriends().stream().map(user -> user.getUsername()).toList();
    List<String> combinedUsernames = new ArrayList<>();
    combinedUsernames.add(username);
    combinedUsernames.addAll(friendUsernames);
    return postRepository.findByUserUsernameInOrderByCreateDateDesc(combinedUsernames);
  ***REMOVED***

  @Override
  public Post updatePost(String newContent, Long postID) ***REMOVED***
    Optional<Post> tempPost = postRepository.findById(postID);
    if (tempPost.isEmpty()) ***REMOVED***
      return null;
***REMOVED***
    Post post = tempPost.get();
    post.setContent(newContent);
    postRepository.save(post);
    return post;
  ***REMOVED***

  @Override
  public String deletePost(Long postID) ***REMOVED***
    if (postRepository.findById(postID).isEmpty()) ***REMOVED***
      return "No such post exists";
***REMOVED***
    postRepository.deleteById(postID);
    return "Post deleted successfully";
  ***REMOVED***
***REMOVED***
