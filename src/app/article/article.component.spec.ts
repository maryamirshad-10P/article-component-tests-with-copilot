// add imports for article.component.spec.ts file
import { ActivatedRoute, Router } from "@angular/router"
// import testBed from angular core testing
import { ComponentFixture, TestBed } from "@angular/core/testing";
import {
  Article,
  ArticlesService,
  Comment,
  CommentsService,
  User,
  UserService,
} from "../core";
// add imports for article.component.spec.ts file
import { ArticleComponent } from "./article.component";
import { ArticleCommentComponent } from "./article-comment.component";
import { async, of, throwError } from "rxjs";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ArticleMetaComponent } from "src/app/shared/article-helpers/article-meta.component";
import { ArticlePreviewComponent } from "src/app/shared/article-helpers/article-preview.component";
// import app-follow-button component
import { FollowButtonComponent } from "../shared/buttons/follow-button.component";
// import http client testing module
import { HttpClientTestingModule } from "@angular/common/http/testing";
// import app-favorite-button component
import { FavoriteButtonComponent } from "../shared/buttons/favorite-button.component";
// import markdown pipe
import { MarkdownPipe } from "../article/markdown.pipe";
// import RouterLink from angular router
import { RouterLink } from "@angular/router";
import { RouterTestingModule } from '@angular/router/testing';
// import appShowAuthedDirective from appShowAuthed.directive.ts
import { ShowAuthedDirective } from "../shared/show-authed.directive";


//make a list of 5 comments of type Comment
const comments: Comment[] = [
  {
    id: 1,
    createdAt: "",
    body: "string",
    author: {
      username: 'test-author',
      bio: '',
      image: '',
      following: false
    },
  }
]

//write describe block for ArticleComponent

describe("ArticleComponent", () => {
  let component: ArticleComponent;
  let fixture: ComponentFixture<ArticleComponent>;
  let userServiceStub: Partial<UserService>;
  let commentsServiceStub: Partial<CommentsService>;
  let articlesServiceStub: Partial<ArticlesService>;
  let routerStub: Partial<Router>;
  let activatedRouteStub: Partial<ActivatedRoute>;

  // declare a variable for article meta component and article preview component
  let articleMetaComponent: ArticleMetaComponent;
  let articlePreviewComponent: ArticlePreviewComponent;

  beforeEach(() => {
    // stub UserService for test purposes
    userServiceStub = {
      currentUser: of({
        // add properties of type User and assign values
        // to them to create a fake currentUser
        email: " ",
        token: " ",
        username: " ",
        bio: " ",
        image: " ",
      }),
      // add a new method to spy on the `set` method
      // of the `currentUser` Subject
      // set: jasmine.createSpy('set')
    };
    // stub CommentsService for test purposes
    commentsServiceStub = {
      add: jasmine.createSpy("add").and.returnValue(of({})),
      getAll: jasmine.createSpy("getAll").and.returnValue(of([])),
      destroy: jasmine.createSpy("destroy").and.returnValue(of({}))
    };

    // stub ArticlesService for test purposes
    articlesServiceStub = {
      destroy: jasmine.createSpy("destroy").and.returnValue(of({})),
      favorite: jasmine.createSpy("favorite").and.returnValue(of({})),
      get: jasmine.createSpy("get").and.returnValue(of({})),
      unfavorite: jasmine.createSpy("unfavorite").and.returnValue(of({})),
    };


    // stub ActivatedRoute for test purposes
    activatedRouteStub = {
      data: of({
        article: {
          slug: 'test-article',
          title: "string",
          description: "string",
          body: '',
          tagList: [],
          createdAt: '',
          updatedAt: '',
          favorited: false,
          favoritesCount: 0,
          author: {
            username: 'test-author',
            bio: '',
            image: '',
            following: false
          },
        },
        }),
    };

    // stub Router for test purposes

    routerStub = {
      navigate: jasmine.createSpy("navigate"),
    };

    TestBed.configureTestingModule({
      declarations: [
        ArticleComponent,
        ArticleCommentComponent,
        // declare ArticleMetaComponent and ArticlePreviewComponent
        // in the declarations array
        ArticleMetaComponent,
        ArticlePreviewComponent,
        FollowButtonComponent,
        FavoriteButtonComponent,
        MarkdownPipe,
      ],

      providers: [
        { provide: UserService, useValue: userServiceStub },
        { provide: CommentsService, useValue: commentsServiceStub },
        { provide: ArticlesService, useValue: articlesServiceStub },
        { provide: ActivatedRoute, useValue: activatedRouteStub }
      ],
      schemas: [ NO_ERRORS_SCHEMA ],

      imports: [HttpClientTestingModule, RouterLink, RouterTestingModule.withRoutes([])
],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleComponent);
    component = fixture.componentInstance;
    TestBed.inject(ActivatedRoute);
    TestBed.inject(UserService);
    fixture.detectChanges();
  });

  //write test case for ArticleComponent
  it("should create", () => {
    expect(component.article).toBeDefined();
    expect(component).toBeTruthy();
  });

  // write test case for ArticleComponent
  it("should initialize with comments", () => {
    // add a new test case to check if the component
    // is initialized with comments
    expect(component.comments).toEqual([]);
  });

  //write test case for onToggleFollowing method
  it("should toggle following", () => {
    // add a new test case to check if the `onToggleFollowing`
    // method calls the `toggleFollowing` method of the `userService`
    component.onToggleFollowing(true);
    expect(component.article.author.following).toBe(true);
  });
  //write a test case for  onToggleFavorite method
  it("should toggle favorite", () => {
    // add a new test case to check if the `onToggleFavorite`
    // method calls the `toggleFavorite` method of the `articlesService`
    component.onToggleFavorite(true);
    expect(component.article.favorited).toBe(true);
  });

  //write a test case for onToggleFavorite method when toggle is false
  it("should toggle favorite", () => {
    // add a new test case to check if the `onToggleFavorite`
    // method calls the `toggleFavorite` method of the `articlesService`
    component.onToggleFavorite(false);
    expect(component.article.favorited).toBe(false);
  });

  //write test case for deleteArticle method
  it("should delete article", () => {
    // add a new test case to check if the `deleteArticle`
    // method calls the `destroy` method of the `articlesService`
    component.deleteArticle();
    expect(articlesServiceStub.destroy).toHaveBeenCalled();
  });

  //write test case for addComment method
  it("should add comment", () => {
    // add a new test case to check if the `addComment`
    // method calls the `add` method of the `commentsService`
    component.addComment();
    expect(commentsServiceStub.add).toHaveBeenCalled();
  });

  //write test case for addComment method and subscribe to an error
  it("should add comment", () => {
    // add a new test case to check if the `addComment`
    // method calls the `add` method of the `commentsService`
    // and subscribe to an error
    (commentsServiceStub.add as jasmine.Spy).and.returnValue(throwError('error'));
    component.addComment();
    expect(commentsServiceStub.add).toHaveBeenCalled();
  });

  //write test case for onDeleteComment method and filter out the comment
  it("should delete comment", () => {
    // add a new test case to check if the `onDeleteComment`
    // method calls the `delete` method of the `commentsService`
    // and filter out the comment
    component.comments = comments;
    (commentsServiceStub.destroy as jasmine.Spy).and.returnValue(of({}));
    component.onDeleteComment('test-comment');
    expect(commentsServiceStub.destroy).toHaveBeenCalled();
  });

});
