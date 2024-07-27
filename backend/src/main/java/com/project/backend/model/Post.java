package com.project.backend.model;

import java.sql.Timestamp;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Post ***REMOVED***
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  Long id;

  @Column(nullable = false)
  private String content;

  @Column(name = "CREATE_DATE", nullable = false)
  private Timestamp createDate;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "USER_ID", nullable = false)
  private AppUser user;

  public Post(String content) ***REMOVED***
    this.content = content;
  ***REMOVED***

  public Post() ***REMOVED******REMOVED***

  public Long getId() ***REMOVED***
    return id;
  ***REMOVED***

  public void setId(Long id) ***REMOVED***
    this.id = id;
  ***REMOVED***

  public String getContent() ***REMOVED***
    return content;
  ***REMOVED***

  public void setContent(String postContent) ***REMOVED***
    this.content = postContent;
  ***REMOVED***

  public Timestamp getCreateDate() ***REMOVED***
    return createDate;
  ***REMOVED***

  public void setCreateDate(Timestamp postCreateDate) ***REMOVED***
    this.createDate = postCreateDate;
  ***REMOVED***

  public AppUser getUser() ***REMOVED***
    return user;
  ***REMOVED***

  public void setUser(AppUser user) ***REMOVED***
    this.user = user;
  ***REMOVED***

***REMOVED***
