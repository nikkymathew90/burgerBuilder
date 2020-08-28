import Reducer from "./auth";

import * as actionTypes from "./../actions/actionsTypes";

describe("auth reducer", () => {
  it("should return the initial state", () => {
    expect(Reducer(undefined, {})).toEqual({
      token: null,
      userId: null,
      loading: false,
      error: null,
      authRedirectPath: "/"
    });
  });

  it("should have token set on login", () => {
    expect(
      Reducer(
        {
          token: null,
          userId: null,
          loading: false,
          error: null,
          authRedirectPath: "/"
        },
        {
          type: actionTypes.AUTH_SUCCESS,
          token: "some-token",
          userId: "some-userId"
        }
      )
    ).toEqual({
      token: "some-token",
      userId: "some-userId",
      loading: false,
      error: null,
      authRedirectPath: "/"
    });
  });

  it("should have token reset on logout", () => {
    expect(
      Reducer(
        {
          token: "token",
          userId: "userid",
          loading: false,
          error: null,
          authRedirectPath: "/"
        },
        { type: actionTypes.AUTH_LOGOUT }
      )
    ).toEqual({
      token: null,
      userId: null,
      loading: false,
      error: null,
      authRedirectPath: "/"
    });
  });

  it("should display error on authentication fail", () => {
    expect(
      Reducer(
        {
          token: null,
          userId: null,
          loading: false,
          error: "some-error",
          authRedirectPath: "/"
        },
        { type: actionTypes.AUTH_FAIL, error: "some-error" }
      )
    ).toEqual({
      token: null,
      userId: null,
      loading: false,
      error: "some-error",
      authRedirectPath: "/"
    });
  });
});
