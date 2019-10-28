Feature:Conduit Local Test

  Scenario: Create a get request
    Given I build the url as "http://jsonplaceholder.typicode.com/posts/1"
    When set headers
    And perform the request "GET"
    Then assert the response

  Scenario: Create a post request
    Given I build the url as "https://jsonplaceholder.typicode.com/posts"
    When set headers
    And perform the request "POST"
    And set the body parameter
    Then assert the response


  Scenario: Create a put request
    Given I build the url as "https://jsonplaceholder.typicode.com/posts/1"
    When set headers
    And perform the request "PUT"
    And set the body parameter
    Then assert the response

  Scenario: Create a patch request
    Given I build the url as "https://jsonplaceholder.typicode.com/posts/1"
    When set headers
    And perform the request "PATCH"
    And set the body parameter for patch
    Then assert the response

  Scenario: Create a delete request
    Given I build the url as "http://jsonplaceholder.typicode.com/posts/1"
    When set headers
    And perform the request "DELETE"
    Then assert the response
