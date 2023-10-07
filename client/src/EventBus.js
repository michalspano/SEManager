/**
 * src/EventBus.js
 * 
 * @description :: A simple event bus for Vue 3.x with mitt
 * @version     :: 1.0
 */

import mitt from 'mitt';

// Some components don't follow a child-parent hierarchy, so we need a global event bus
// Example: sending a login-success event from the Login component to the Header component
// to update the state of the button.
const eventBus = mitt();

export default eventBus;
