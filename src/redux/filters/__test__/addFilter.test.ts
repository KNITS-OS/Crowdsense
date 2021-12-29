import { addFilter } from "..";

describe("addFilter Function", () => {
  beforeEach(() => {
    // https://stackoverflow.com/questions/48033841/test-process-env-with-jest
    process.env.REACT_APP_BACKEND_ENV = "supabase";
  });

  test("adding no param and eq filter should return undefined", () => {
    expect(addFilter({ param: "", filter: "eq" })).toBeUndefined();
  });
  test("adding a param and like filter should return value", () => {
    expect(addFilter({ param: "Donny", filter: "like" })).toBe(
      "like.%Donny%",
    );
  });
  test("adding a param and ilike filter should return value", () => {
    expect(addFilter({ param: "Donny", filter: "ilike" })).toBe(
      "ilike.%Donny%",
    );
  });
  test("adding a param and in filter should return value", () => {
    expect(addFilter({ param: ["New"], filter: "in" })).toBe("in.(New)");
  });
  test("adding a param and cs filter should return value", () => {
    expect(addFilter({ param: ["New", "Closed"], filter: "cs" })).toBe(
      "cs.{New,Closed}",
    );
  });
  test("adding a param and cd filter should return value", () => {
    expect(addFilter({ param: ["New"], filter: "cd" })).toBe("cd.{New}");
  });
  test("adding a param and eq filter should return value", () => {
    expect(addFilter({ param: "Req001", filter: "eq" })).toBe("eq.Req001");
  });
});
