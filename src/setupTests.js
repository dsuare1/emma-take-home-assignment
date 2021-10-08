import '@testing-library/jest-dom';

// was getting an error when trying to run the tests to assert that an element with a certain
// text content exists on the page; this was the solution proposed online, but ran into further
// errors

// rather than going down a rabbit hole with this, I chose to move on to more logic-based testing,
// focusing on the favoriting logic tests

// in my experience, a UI will change so ofter that writing tests to assert its contents gets
// cumbersome in maintanence; in my opinion, effort and time is better spent on testing UI app-critical
// logic (such as data mapping, state changes, etc.), rather than asserting elements of the UI

global.matchMedia = global.matchMedia || function() {
  return {
    addListener: jest.fn(),
    removeListener: jest.fn(),
  };
};
