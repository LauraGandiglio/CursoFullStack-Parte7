describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user1 = {
      name: "Laura Gandiglio",
      username: "Lardilla",
      password: "lardilla",
    };
    cy.request("POST", "http://localhost:3003/api/users/", user1);
    const user2 = {
      name: "Facundo Acosta",
      username: "Facu",
      password: "facu",
    };
    cy.request("POST", "http://localhost:3003/api/users/", user2);
    cy.visit("http://localhost:5173");
  });

  it("Login form is shown", function () {
    cy.contains("Login");
  });
  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("input:first").type("Lardilla");
      cy.get("input:last").type("lardilla");
      cy.contains("login").click();
      cy.contains("¡Hi Laura Gandiglio! you are logged in");
    });

    it("fails with wrong credentials", function () {
      cy.get("input:first").type("Lardilla");
      cy.get("input:last").type("wrong");
      cy.contains("login").click();
      cy.contains("Wrong username or password");
    });
  });
  describe("When logged in", function () {
    beforeEach(function () {
      cy.get("input:first").type("Lardilla");
      cy.get("input:last").type("lardilla");
      cy.contains("login").click();
    });

    it("A blog can be created", function () {
      cy.contains("Create blog").click();
      cy.get("input:first").type("Adding a blog with cypress");
      cy.get('input[placeholder*="write the author here"]').type("Laurita");
      cy.get("input:last").type("www.google.com");
      cy.get(".createBlog").click();
      cy.contains("Adding a blog with cypress");
    });

    it("A blog can be liked", function () {
      cy.contains("Create blog").click();
      cy.get("input:first").type("Adding a blog with cypress");
      cy.get('input[placeholder*="write the author here"]').type("Laurita");
      cy.get("input:last").type("www.google.com");
      cy.get(".createBlog").click();
      cy.contains("Adding a blog with cypress");
      cy.contains("View").click();
      cy.contains("Likes: 0");
      cy.get(".likeButton").click();
      cy.contains("Likes: 1");
    });

    it("A blog can be deleted only by it creator", function () {
      cy.contains("Create blog").click();
      cy.get("input:first").type("Adding a blog with cypress");
      cy.get('input[placeholder*="write the author here"]').type("Laurita");
      cy.get("input:last").type("www.google.com");
      cy.get(".createBlog").click();
      cy.contains("Adding a blog with cypress");
      cy.contains("View").click();
      cy.contains("Delete").click();
      cy.contains("Adding a blog with cypress").should("not.exist");

      cy.contains("Create blog").click();
      cy.get("input:first").type("Adding a second blog with cypress");
      cy.get('input[placeholder*="write the author here"]').type("Laurita");
      cy.get("input:last").type("www.google.com");
      cy.get(".createBlog").click();
      cy.contains("Adding a second blog with cypress");
      cy.contains("View").click();
      cy.contains("Delete");

      cy.contains("Logout").click();
      cy.get("input:first").type("Facu");
      cy.get("input:last").type("facu");
      cy.contains("login").click();
      cy.contains("¡Hi Facundo Acosta! you are logged in");
      cy.contains("View").click();
      cy.contains("Delete").should("not.exist");
    });

    it("blogs are in descending order by like", function () {
      cy.contains("Create blog").click();
      cy.get("input:first").type("Blog with most likes");
      cy.get('input[placeholder*="write the author here"]').type("Laurita");
      cy.get("input:last").type("www.google.com");
      cy.get(".createBlog").click();
      cy.contains("Blog with most likes");
      cy.contains("View").click();
      cy.get(".likeButton").click();

      cy.contains("Create blog").click();
      cy.get("input:first").type("Second blog with most likes");
      cy.get('input[placeholder*="write the author here"]').type("Laurita");
      cy.get("input:last").type("www.google.com");
      cy.get(".createBlog").click();
      cy.contains("Second blog with most likes");

      cy.get(".blogs>div").eq(0).should("contain", "Blog with most likes");
      cy.get(".blogs>div").eq(1).should("contain", "Second blog with most likes");
    });
  });
});
