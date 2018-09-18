/**
 * The lang saved to the localStorage.
 */
export default {
  sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }
}
