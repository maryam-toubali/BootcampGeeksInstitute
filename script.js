try {
  console.log("Start");
  throw new Error("Problem!");
} catch (e) {
  console.log("Caught error:", e.message);
} finally {
  console.log("I always run");
}
